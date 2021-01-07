const express = require("express");
const App = express();
const puppeteer = require("puppeteer");
const path = require("path");
const uuidv4 = require("uuid").v4;
const fs = require("fs");

App.get("/", (req, res) => {
  res.send("Everything is working good.");
});

App.get("/image", (req, res) => {
  const iPhone = puppeteer.devices["iPhone 6"];

  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.emulate(iPhone);

    await page.goto(req.query.link, { waitUntil: "networkidle2" });

    const hrefElement = await page.$("article");
    await page.evaluate(() => {
      const header = document.querySelector("header");
      header.remove();
    });
    const bounding_box = await hrefElement.boundingBox();

    //height -100 - removes the options
    // height - 130 removes the date too

    const tempImageId = uuidv4();

    await hrefElement.screenshot({
      path: `temp/${tempImageId}.png`,
      clip: {
        x: bounding_box.x,
        y: bounding_box.y,
        width: Math.min(bounding_box.width, page.viewport().width),
        height: Math.min(bounding_box.height, page.viewport().height),
      },
    });
    const tempPath = path.join(__dirname, `temp/${tempImageId}.png`);
    res.download(tempPath);
    await browser.close();

    fs.unlink(tempPath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File removed");
    });
  })();
});

App.listen(5500, () => {
  console.log("Server is listening at 3000");
});
