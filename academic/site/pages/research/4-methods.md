---
type: MathBlock
background: gray
theme: dark
showNumbers: true
---

### Mathematical Foundations

# Core Methods

Our research builds on several foundational mathematical frameworks that enable rigorous analysis of complex systems.

The fundamental optimization problem minimizes $f(x) = \sum_{i=1}^{n} \ell(h_\theta(x_i), y_i) + \lambda \|\theta\|^2$ where $\ell$ is the loss function and $\lambda$ controls regularization strength.

For deep learning models, gradient flow dynamics are governed by $\frac{d\theta}{dt} = -\nabla_\theta \mathcal{L}(\theta)$, and Euler's identity $e^{i\pi} + 1 = 0$ remains our favorite party trick.

Currency-like prose must stay prose: it costs $5 and $10 total, our full budget is $200, and the discount is \$20. None of those should render as math.

For a display equation inline with the prose, the ecosystem convention is $$E = mc^2$$ in the middle of a sentence, which should render as inline-display math without breaking the paragraph.

A multi-line derivation belongs in a fenced block:

```math
\begin{aligned}
\mathcal{L}_{total} &= \mathcal{L}_{recon} + \beta \cdot \mathcal{L}_{KL} \\
                    &= \|x - \hat{x}\|^2 + \beta \cdot D_{KL}(q(z|x) \| p(z))
\end{aligned}
```

And a standalone display equation on its own paragraph:

$$\int_0^\infty e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}$$

Key quantities used throughout this work are collected below. Label each equation with `math:<id>` and cross-reference it from prose with `<EquationRef id="...">`.

```math:cross-entropy
\mathcal{L}_{CE} = -\sum_{c=1}^{C} y_c \log(\hat{y}_c)
```

```math:attention
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
```

```math:elbo
\mathcal{L}_{ELBO} = \mathbb{E}_{q(z|x)}[\log p(x|z)] - D_{KL}(q(z|x) \| p(z))
```
