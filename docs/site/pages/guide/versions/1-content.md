---
type: DocSection
---

#> Guide

# Older Versions

## Keep docs for an older release

Most docs need one version, the current one. Add another when readers still on an older release would be misled by these pages, and not before: each version you keep adds to every page's weight, and is one more thing to look after.

### Freeze a release

When a release is about to stop being the latest, freeze its docs:

```bash
uniweb add version v1 --in . --label "1.x"
```

That copies these pages to `pages/v1`, where they're served at `/v1/`. The links in the copy lead to the copy, and you keep writing where you've always written. Nothing about the current pages changes: not their files, their URLs or their links.

This site then shows a version switcher, and a notice above the pages of the older version. Both come with this foundation, and neither needs setting up.

### What readers get

- **The switcher** leads to the same page in the other version, or the nearest one to it when that version doesn't have it.
- **Search on this site** keeps to the version being read.
- **Search engines** are told to leave older versions out, so they send people to the current docs. To change that for a version, remove `noindex` from its `page.yml`.

### Which versions to keep

Keep the ones people still use, and version whole sections rather than single pages. To change what a version is called, edit the `title` in its `page.yml`. To say what the current docs are called, set `latestLabel` in the header's section file.
