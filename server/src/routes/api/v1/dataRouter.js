import express from "express";
import * as cheerio from 'cheerio';
import got from "got";
const dataRouter = new express.Router();

dataRouter.get("/", async (req, res) => {
    const url = "https://www.cityofboston.gov/publicworks/sweeping/?streetname=BENNETT+ST&Neighborhood=4";
    const apiResponse = await got(url);

    // console.log("api response: ", apiResponse)
    const responseBody = apiResponse.body;//html for the entire page
    // console.log("api response body: ", responseBody)

    const $ = cheerio.load(responseBody);  
    const html = $("#tblsweeping").html().replace(/(?:\r\n|\r|\n|\t|&nbsp;)/g, '')
    //const html = $("td", "#tblsweeping")
    const htmlData = {html: html}// the entire <tbody>
    // console.log("html data: ",htmlData)

  return res.status(200).json(htmlData)
})
export default dataRouter