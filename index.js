const express = require("express");
const App = express();
const puppeteer = require("puppeteer");
const path = require("path");
const uuidv4 = require("uuid").v4;
const fs = require("fs");
var cors = require("cors");

const grapTweet = async (link, res, options) => {
  try {
    const iPhone = puppeteer.devices["iPhone 6"];
    let cutY = 130;
    if (options.timeline === "true" || options.timeline === true)
      cutY = cutY - 30;
    if (options.stats === "true" || options.stats === true) cutY = cutY - 50;
    if (options.actions === "true" || options.actions === true)
      cutY = cutY - 50;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.emulate(iPhone);

    await page.goto(link, { waitUntil: "networkidle2" });

    const hrefElement = await page.$("article");
    await page.evaluate(() => {
      const header = document.querySelector("header");
      const appBanner = document.querySelector(
        ".css-1dbjc4n.r-urgr8i.r-97e31f"
      );
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
    res.sendFile(tempPath);
    await browser.close();

    fs.unlink(tempPath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File removed");
    });
  } catch (err) {
    res.status(500).send("Something went wrong , please check the link");
  }
};

App.use(cors());

// App.get("/", (req, res) => {
//   res.send("Everything is working good.");
// });

App.get("/image", (req, res) => {
  const options = {
    actions:
      req.query.timeline == "true" &&
      req.query.stats == "true" &&
      req.query.actions == "true",
    stats: req.query.timeline == "true" && req.query.stats == "true",
    timeline: req.query.timeline == "true",
  };
  console.log(options);
  if (req.query.link) grapTweet(req.query.link, res, options);
  else res.send("No link provided in query");
});

App.use(express.static(path.join(__dirname, "client", "build")));
App.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

App.get("/*", (req, res) => {
  res.send("404 - Not found");
});

const PORT = process.env.PORT || 5500;

App.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
