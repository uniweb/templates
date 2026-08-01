---
type: QuoteForm
theme: medium
id: quote
---

## Get in touch

Tell us what's going on and we'll come back with a price — usually the same day.

```yaml:form
title: Request a quote
description: Tell us what's wrong and we'll come back with a price.
fields:
  name:
    label: Your name
    required: true
    type: string
  contact:
    label: Email
    required: true
    type: string
    format: email
  urgency:
    label: How urgent?
    type: string
    enum:
      - value: emergency
        label: Emergency — no water
      - value: week
        label: This week
      - flexible
  problem:
    label: Describe the problem
    required: true
    type: text
  photos:
    label: Photos of the problem
    accept: image/*
    multiple: true
    type: file
  access:
    label: Someone will be home
    type: bool
  visit:
    label: Preferred visit date
    type: date
```
