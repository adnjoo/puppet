# 🖼️ Puppet — Website Screenshot API

**Puppet** is a lightweight Node.js + Puppeteer microservice that captures full-page screenshots of any URL. Optionally, it can save the image locally for audits or debugging.

---

## ✨ Features

- ✅ Capture full-page screenshots of any website
- ✅ Fast HTTP GET-based API
- ✅ Save screenshots locally with a flag
- ✅ Works great with tools like OpenAI Vision or audit pipelines

---

## 🚀 Usage

### Start the Server

```bash
npm install
node index.js
````

Server runs at `http://localhost:3000` by default.

---

### API Endpoint

```
GET /screenshot?url=https://example.com&save=true
```

#### Query Parameters:

| Param  | Required | Description                                                   |
| ------ | -------- | ------------------------------------------------------------- |
| `url`  | ✅ Yes    | The URL of the website to capture (must include protocol)     |
| `save` | ❌ No     | If set to `true`, saves the screenshot to `/assets` directory |

#### Example

```bash
curl "http://localhost:3000/screenshot?url=https://nike.com&save=true" --output nike.png
```

---

## 📁 Saved Screenshots

If `save=true` is passed, screenshots are saved in the `/assets` directory as `{hostname}.png` (e.g. `nike_com.png`).

---

## 🛠 Tech Stack

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Puppeteer](https://pptr.dev/)

---

## 📦 Deployment Tips

Puppeteer requires a full Node.js runtime and Chromium support. Recommended hosts:

* [Render.com](https://render.com) ✅
* [Railway](https://railway.app) ✅
* [Fly.io](https://fly.io) ✅
* Vercel / Netlify ❌ (Not ideal due to Chromium/headless limitations)

---

## 🤖 Example Use Case

Pair with OpenAI GPT-4 Vision to auto-audit landing pages:

1. Capture screenshot with this API
2. Upload to GPT-4 Vision
3. Get UX/CRO feedback with a custom prompt

---

## 🧪 Dev Notes

* Tested on Node v18+ and Puppeteer 20+
* Disable sandboxing in Chromium for Docker-friendly environments

---

## 📄 License

MIT
