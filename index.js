const express = require("express");
const App = express();
const puppeteer = require("puppeteer");
const path = require("path");
const uuidv4 = require("uuid").v4;
const fs = require("fs");

const grapTweet = async (link, res, options) => {
  const iPhone = puppeteer.devices["iPhone 6"];
  let cutY = 130;
  if (options.timeline) cutY = cutY - 30;
  if (options.stats) cutY = cutY - 50;
  if (options.actions) cutY = cutY - 50;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.emulate(iPhone);

  await page.goto(link, { waitUntil: "networkidle2" });

  const hrefElement = await page.$("article");
  await page.evaluate(() => {
    const header = document.querySelector("header");
    const appBanner = document.querySelector(".css-1dbjc4n.r-urgr8i.r-97e31f");
    if (header) header.remove();
    if (appBanner) appBanner.remove();
  });
  const bounding_box = await hrefElement.boundingBox();

  const tempImageId = uuidv4();
  console.log(cutY);
  console.log(bounding_box.height, page.viewport().height);
  await hrefElement.screenshot({
    path: `temp/${tempImageId}.png`,
    clip: {
      x: bounding_box.x,
      y: bounding_box.y,
      width: Math.min(bounding_box.width, page.viewport().width),
      height: Math.min(bounding_box.height, page.viewport().height) - cutY,
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
};

App.get("/", (req, res) => {
  res.send("Everything is working good.");
});

App.get("/image", (req, res) => {
  const options = {
    actions: req.query.timeline && req.query.stats && req.query.actions,
    stats: req.query.timeline && req.query.stats,
    timeline: req.query.timeline,
  };
  console.log(options);
  if (req.query.link) grapTweet(req.query.link, res, options);
  else res.send("No link provided in query");
});

App.get("/*", (req, res) => {
  res.send("404 - Not found");
});

App.listen(5500, () => {
  console.log("Server is listening at 3000");
});
