var express = require('express');
const puppeteer = require("puppeteer");
var app = express();

app.use(express.json());

app.post('/', async function (req, res) {
  const { url } = req.body;
  let browser;
  try {
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    const html = await page.content();
    res.send({
      data: html
    });
  } catch (error) {
    res.send({
      message: "Something went wrong"
    })
  } finally {
    if (browser) await browser.close();
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});