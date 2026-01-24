---
title: Dynamic Data Fetching Guide
excerpt: Learn how to fetch external data and use it in your Uniweb components.
date: 2025-01-10
author:
  name: Elena Rodriguez
  avatar: https://randomuser.me/api/portraits/women/67.jpg
image: https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800
tags: [data, advanced]
---

## Introduction

Uniweb supports fetching data from local JSON files or remote APIs. This guide covers the basics.

## Fetch at Section Level

Add a `fetch` property to your section frontmatter:

```yaml
---
type: Team
fetch: /data/team.json
---
```

## Cascading Data

Data can cascade from site to page to section levels. Components opt into inherited data using `inheritData` in their meta.js.
