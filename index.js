const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/screenshot", async (req, res) => {
  const targetUrl = req.query.url;
  const shouldSave = req.query.save === "true"; // e.g. /screenshot?url=https://nike.com&save=true

  if (!targetUrl) {
    return res.status(400).send("Missing 'url' query param");
  }

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: "networkidle2", timeout: 30000 });

    const screenshotBuffer = await page.screenshot({ fullPage: true });

    await browser.close();

    if (shouldSave) {
      const fileName = new URL(targetUrl).hostname.replace(/\./g, "_") + ".png";
      const savePath = path.join(__dirname, "assets");

      // Ensure directory exists
      if (!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath);
      }

      fs.writeFileSync(path.join(savePath, fileName), screenshotBuffer);
      console.log(`🖼️ Screenshot saved: /assets/${fileName}`);
    }

    res.set("Content-Type", "image/png");
    res.send(screenshotBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Screenshot failed.");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
});
