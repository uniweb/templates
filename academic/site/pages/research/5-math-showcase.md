---
type: MathBlock
background: white
theme: light
showNumbers: false
---

### Pipeline Showcase

# Math Rendering Examples

This page is a demo of every form the math pipeline supports — inline math, display math, fenced multi-line math, matrices, and the error-handling behavior on malformed input. Foundations authoring academic content can treat it as a reference.

**Inline math in running prose.** The constants $\alpha$, $\beta$, $\gamma$, $\delta$, $\epsilon$, $\pi$, and $\omega$ flow naturally with the prose around them. Inline equations like $e^{i\pi} + 1 = 0$ or $\sum_{k=0}^{n} k = \tfrac{n(n+1)}{2}$ sit on the same line as the surrounding words.

**Dollar-sign disambiguation.** The pipeline follows Pandoc's rules: `$...$` is only math when the body has no whitespace adjacent to the delimiters and the closing `$` is not followed by a digit. So a currency sentence like "it cost $5 and $10 total, with a budget of $200" stays as prose without any escaping.

**Standalone display math** renders centered with automatic spacing:

$$\sum_{k=0}^{\infty} \frac{x^k}{k!} = e^x, \qquad \prod_{p \text{ prime}} \frac{1}{1 - p^{-s}} = \zeta(s)$$

**Multi-line derivations in fenced blocks** preserve alignment:

```math
\begin{aligned}
(a + b)^2 &= (a + b)(a + b) \\
          &= a^2 + ab + ba + b^2 \\
          &= a^2 + 2ab + b^2
\end{aligned}
```

**Matrices and determinants:**

$$A = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}, \quad \det(A) = 0$$

**Error handling — a deliberate probe.** The expression below is malformed on purpose: `\frac{1}` is missing its denominator. Rather than crashing the page, the pipeline emits a `<span class="temml-error">` around the bad source (the small red `\frac{1}` below), keeps rendering the rest of the paragraph, and attaches the parser message as a `data-temml-error` attribute so foundations can surface it conditionally: $\frac{1}$ — see, the prose continues normally after the failure. Foundations can style `.temml-error` in their theme CSS to hide it, shrink it, or surface the message as a tooltip.
