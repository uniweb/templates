---
type: Hero
theme: light
fetch:
  url: https://api.open-meteo.com/v1/forecast?latitude=31.0&longitude=103.2&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&wind_speed_unit=ms
  schema: weather
  transform: current
  prerender: false
---

### Live Data Demo

# Conservation powered by real-time data.

This template demonstrates how to handle asynchronous data fetching. The weather card fetches live conditions from Wolong Reserve via **Open-Meteo**.

[Explore Data](/research)
[View Source](https://github.com/uniweb/templates)
