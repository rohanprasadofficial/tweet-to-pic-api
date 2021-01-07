const express = require("express");
const App = express();
const puppeteer = require("puppeteer");
const path = require("path");
App.get("/", (req, res) => {
  res.send("Everything is working good.");
});

App.get("/p/:tagId", function (req, res) {
  res.send("tagId is set to " + req.params.tagId);
});

App.get("/image/:i", (req, res) => {
  console.log(req.params.i);
  const iPhone = puppeteer.devices["iPhone 6"];
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.emulate(iPhone);

    await page.goto(
      "https://mobile.twitter.com/rohanpdofficial/status/1343535539308306433",
      { waitUntil: "networkidle2" }
    );

    const hrefElement = await page.$("article");
    await page.evaluate(() => {
      const header = document.querySelector("header");
      header.remove();
    });

    //   await hrefElement.screenshot({ path: "example.png" });
    const bounding_box = await hrefElement.boundingBox();

    //height -100 - removes the options
    // height - 130 removes the date too

    await hrefElement.screenshot({
      path: "example4.png",
      clip: {
        x: bounding_box.x,
        y: bounding_box.y,
        width: Math.min(bounding_box.width, page.viewport().width),
        height: Math.min(bounding_box.height, page.viewport().height) - 130,
      },
    });
    res.download(path.join(__dirname, "example4.png"));
    // res.download()
    await browser.close();
  })();
});

App.listen(3000, () => {
  console.log("Server is listening at 3000");
});
