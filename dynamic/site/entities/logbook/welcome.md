---
title: Welcome to the logbook
date: 2026-01-05
summary: What this logbook is, and why its entries live in folders.
---

Every entry here is a **record** — one markdown file under `entities/logbook/`. The
folder each one sits in comes from `records.yml`, not from the file system, and that
placement is what shapes its URL: an entry placed under `field/` is served at
`/logbook/field/<slug>`, while this one, placed at the root, is `/logbook/welcome`.

One template page — `pages/logbook/[...path]/` — renders all of them.
