---
title: Welcome to the logbook
date: 2026-01-05
summary: What this logbook is, and why its entries live in folders.
---

Every entry here is a **record** — one markdown file under `records/logbook/`. The
folder each one sits in comes from `records/folder.yml`, not from the file system.
Folders organize the entries, and a query reads one with `scope:`. An entry's URL is
its name: this one is `/logbook/welcome`, and the river survey, placed under `field/`,
is `/logbook/river-survey`.

One parametric page — `pages/logbook/[...path]/` — renders all of them.
