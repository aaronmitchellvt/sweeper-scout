// import React, { useState, useEffect } from "react";
// const puppeteer = require("puppeteer");
// const cheerio = require("cheerio");
// const fs = require("fs");

// const SweepInfo = (props) => {

//   async function getData() {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto("https://www.cityofboston.gov/publicworks/sweeping/");
//     const data = await page.content();
//     await browser.close();  
//     processData(data);
//   }

//   useEffect(() => {
//     getData();
//   }, []);
// };
// export default SweepInfo;

// // const [myHtml, setHtml] = useState("webpage html");
// // const url = "github.com/trending?since=weekly";


// // const fetchHtml = async () => {
// //   const apiResponse = await got(url);
// //   const responseBody = apiResponse.body;

// //   const $ = cheerio.load(responseBody);
// //   const $body = $("body");
// //   const $repos = $body.find(".Box-row");
// //   setHtml($repos)
// //   console.log(myHtml);
// // };

//   // const fetchHtml = () => {
//   //   const url = 'https://pbleagues.com/'
//   //   request(url, (error, response, html) => {
//   //     if(!error && response.statusCode == 200) {
//   //       const $ = cheerio.load(html)
//   //       setHtml($)
//   //       console.log(myHtml)
//   //     }
//   //   })
//   // }