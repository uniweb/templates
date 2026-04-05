---
type: Lesson
---

Every time you type a URL into your browser and press Enter, a series of steps happens behind the scenes. Understanding this process helps you reason about how your code reaches users.

**Step 1: DNS Lookup.** Your browser takes the domain name (like `example.com`) and asks a DNS server to translate it into an IP address (like `93.184.216.34`). This is like looking up a phone number in a directory.

**Step 2: TCP Connection.** Your browser establishes a connection with the server at that IP address. They perform a "handshake" — a brief exchange that confirms both sides are ready to communicate.

**Step 3: HTTP Request.** Your browser sends an HTTP request — a structured message asking for a specific resource. A simple request looks like:

```
GET /index.html HTTP/1.1
Host: example.com
```

**Step 4: Server Response.** The web server processes the request and sends back an HTTP response containing the requested file, along with a status code:

- `200 OK` — the file was found and returned
- `404 Not Found` — the requested resource doesn't exist
- `500 Internal Server Error` — something went wrong on the server

**Step 5: Rendering.** Your browser receives the HTML, parses it, fetches any additional resources (CSS, JavaScript, images), and renders the page on screen.

This request-response cycle is the foundation of everything on the web. Every click, every form submission, every API call follows this pattern.

```yaml:quiz
question: "When you visit a website, what is the correct order of operations?"
options:
  - id: a
    text: "HTTP request → DNS lookup → Rendering → TCP connection"
  - id: b
    text: "DNS lookup → TCP connection → HTTP request → Rendering"
    correct: true
  - id: c
    text: "TCP connection → DNS lookup → Rendering → HTTP request"
  - id: d
    text: "Rendering → HTTP request → DNS lookup → TCP connection"
```
