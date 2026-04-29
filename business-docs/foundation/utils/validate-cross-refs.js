/**
 * Cross-record validation for the business-docs foundation.
 *
 * Runs at content-prepare time (after collections are resolved, before
 * sections render). Surfaces issues at info / warn / error severity per
 * the matrix from kb/framework/plans/uniweb-business-docs.md. Severity
 * depends on the invoice's own status: a draft invoice that points at
 * an unsigned SOW is informational; an issued invoice with the same
 * problem is an error.
 *
 * The validator never throws — it returns a list of findings and lets
 * the caller decide what to log or surface. The build does not fail on
 * validation alone; a future `uniweb doctor` command may escalate
 * severities to non-zero exit codes.
 */

const ISSUED_STATUSES = new Set([
  'issued',
  'open',
  'to-verify',
  'paid',
  'overdue',
])

function isIssuedOrLater(invoice) {
  return ISSUED_STATUSES.has(String(invoice?.status))
}

function findSow(sows, ref) {
  if (!Array.isArray(sows) || !ref) return null
  return sows.find((s) => s?.slug === ref || String(s?.number) === String(ref)) || null
}

function periodOverlapsExpiry(period, expires) {
  if (!period?.to || !expires) return false
  return new Date(period.to) > new Date(expires)
}

/**
 * @param {Object} args
 * @param {Array}  args.invoices  Resolved invoice records (each carries its slug / number / status / sow_ref / items / etc.)
 * @param {Array}  args.sows      Resolved SOW records.
 * @returns {Array<{ severity, code, recordType, recordSlug, message }>}
 */
export function validateCrossRefs({ invoices = [], sows = [] } = {}) {
  const findings = []
  const push = (severity, code, recordSlug, message) =>
    findings.push({ severity, code, recordType: 'invoice', recordSlug, message })

  for (const inv of invoices) {
    const slug = inv?.slug || inv?.number || '(unknown)'
    const issued = isIssuedOrLater(inv)

    // Rule: invoice has no sow_ref at all.
    if (!inv?.sow_ref) {
      push(
        issued ? 'warn' : 'info',
        'invoice-missing-sow-ref',
        slug,
        `Invoice ${slug} has no sow_ref. Issued invoices should reference an SOW.`,
      )
      continue
    }

    const sow = findSow(sows, inv.sow_ref)

    // Rule: sow_ref does not resolve.
    if (!sow) {
      push(
        issued ? 'error' : 'warn',
        'invoice-sow-not-found',
        slug,
        `Invoice ${slug} references sow_ref "${inv.sow_ref}" but no matching SOW exists.`,
      )
      continue
    }

    const sowStatus = String(sow?.status || '')

    // Rule: SOW is draft / in-review.
    if (sowStatus === 'draft' || sowStatus === 'in-review') {
      push(
        issued ? 'error' : 'info',
        'invoice-sow-not-signed',
        slug,
        `Invoice ${slug} bills against SOW "${inv.sow_ref}" which is still ${sowStatus}.`,
      )
    }

    // Rule: SOW expired or superseded.
    if (sowStatus === 'expired' || sowStatus === 'superseded') {
      push(
        'warn',
        'invoice-sow-stale',
        slug,
        `Invoice ${slug} bills against SOW "${inv.sow_ref}" which is ${sowStatus}.`,
      )
    }

    // Rule: SOW status is signed but no signed: date.
    if (sowStatus === 'signed' && !sow?.signed) {
      push(
        'warn',
        'sow-signed-without-date',
        slug,
        `Invoice ${slug}: SOW "${inv.sow_ref}" has status: signed but no signed: date.`,
      )
    }

    // Rule: any invoice line period extends past SOW expires.
    if (Array.isArray(inv?.items) && sow?.expires) {
      const overlap = inv.items.some((it) => periodOverlapsExpiry(it?.period, sow.expires))
      if (overlap) {
        push(
          issued ? 'warn' : 'info',
          'invoice-period-past-expiry',
          slug,
          `Invoice ${slug} contains line(s) whose period extends past SOW ${inv.sow_ref} expires (${sow.expires}).`,
        )
      }
    }
  }

  return findings
}

export function logFindings(findings, logger = console) {
  for (const f of findings) {
    const prefix = `[business-docs] ${f.severity.toUpperCase()} ${f.code}`
    if (f.severity === 'error') logger.error(`${prefix}: ${f.message}`)
    else if (f.severity === 'warn') logger.warn(`${prefix}: ${f.message}`)
    else logger.info(`${prefix}: ${f.message}`)
  }
}
