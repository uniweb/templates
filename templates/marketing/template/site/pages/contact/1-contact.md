---
type: ContactForm
layout: split
---

# Get in Touch

Have a question or want to work together? Fill out the form and we'll get back to you within 24 hours.

```yaml:form
fields:
  - name: name
    label: Your Name
    type: text
    placeholder: John Doe
    required: true
  - name: email
    label: Email Address
    type: email
    placeholder: john@example.com
    required: true
  - name: company
    label: Company
    type: text
    placeholder: Acme Inc.
  - name: message
    label: Message
    type: textarea
    placeholder: Tell us about your project...
    required: true
submitLabel: Send Message
successMessage: Thanks for reaching out! We'll be in touch soon.
```
