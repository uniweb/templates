---
type: MathBlock
background: white
theme: light
showNumbers: false
---

### Edge Cases

# Math Pipeline Showcase

This section exercises edge cases we want to catch by eye before publishing to npm.

**Disambiguation** — all of these should be prose: $5 lunch, $10 tip, $100 budget, $200 benchmark, a \$20 discount, and $1000 quarterly spend. None should render as math.

**Greek letters in running text:** The constants $\alpha$, $\beta$, $\gamma$, $\delta$, $\epsilon$, $\pi$, and $\omega$ should flow naturally with the prose around them.

**Nested fractions and big operators** — the test of renderer quality:

$$\sum_{k=0}^{\infty} \frac{x^k}{k!} = e^x, \qquad \prod_{p \text{ prime}} \frac{1}{1 - p^{-s}} = \zeta(s)$$

**Aligned derivation in fenced form** — expect proper column alignment:

```math
\begin{aligned}
(a + b)^2 &= (a + b)(a + b) \\
          &= a^2 + ab + ba + b^2 \\
          &= a^2 + 2ab + b^2
\end{aligned}
```

**Matrix** — bracket rendering and row/column spacing:

$$A = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}, \quad \det(A) = 0$$

**Deliberate error** — malformed LaTeX should render an inline `temml-error` span with the source visible, not crash the page: $\frac{1}$ is broken, and so is $$\alpha +$$. Authors must still see the rest of this paragraph.

**Escapes survive bold and italic**: the amount is **\$42.50** or *\$99.99*, never math.
