const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/screenshot", async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send("Missing 'url' query param");
  }

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: "networkidle2", timeout: 30000 });

    const screenshot = await page.screenshot({ fullPage: true });

    await browser.close();

    res.set("Content-Type", "image/png");
    res.send(screenshot);
  } catch (err) {
    console.error(err);
    res.status(500).send("Screenshot failed.");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
});
