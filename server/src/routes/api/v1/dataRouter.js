import express from "express";
import * as cheerio from 'cheerio';
import got from "got";
const dataRouter = new express.Router();

const districtObj = {
  "Downtown" : 1,
  "North End" : "1N",
  "Charlestown" : "1C",
  "South End" : "1S",
  "Beacon Hill" : "1H",
  "Back Bay" : "1B",
  "West End" : "1W",
  "Chinatown" : "1T",
  "Jamaica Plain, Roslindale" : 2,
  "North Dorchester" : 3,
  "Allston, Brighton" : 4,
  "South Boston" : 5,
  "West Roxbury" : 6,
  "South Dorchester" : 7,
  "Hyde Park" : 8,
  "East Boston" : 9,
  "Roxbury" : 10,
  "Fenway, Kenmore" : "10F",
  "Mission Hill" : "10M",
  "Mass DCR" : 99
}

dataRouter.get("/", async (req, res) => {

    //Example URLs
    //https://www.cityofboston.gov/publicworks/sweeping/?streetname=BENNETT+ST&Neighborhood=4
    //https://www.cityofboston.gov/publicworks/sweeping/?streetname=GREEN+ST&Neighborhood=2

    let streetName = ""
    let userDistrict = ""
    if(req.user){
      //get the Street Name from the user
      streetName = req.user.address
      //get the district
      userDistrict = req.user.district
      console.log("Users street: ", streetName)
      console.log("Users district: ", userDistrict)
    }
    //convert the district to Neighborhood number
    // let neighborhoodNum;
    // for (const district in districtObj) {
    //   if(district === userDistrict) {
    //     neighborhoodNum = districtObj[district]
    //   }
    // }
    console.log("Neighborhood Num: ", userDistrict)
    //Uppercase and replace spaces with plus signs for street name
    const spaceReplacedSt = streetName.replace(" ","+")
    console.log("space replaced: ", spaceReplacedSt)
    const convertedStreet = spaceReplacedSt.toUpperCase()
    console.log("converted street: ", convertedStreet)
    //construct the url
    const testUrl = `https://www.cityofboston.gov/publicworks/sweeping/?streetname=${convertedStreet}&Neighborhood=${userDistrict}`
    console.log("Test1: ",testUrl)
    console.log("Test2: https://www.cityofboston.gov/publicworks/sweeping/?streetname=GREEN+ST&Neighborhood=2")
    console.log("User info from backend: ", req.user)

    // const url = "https://www.cityofboston.gov/publicworks/sweeping/?streetname=HILLSIDE+ST&Neighborhood=10M";
    const diffUrl = "https://www.cityofboston.gov/publicworks/sweeping/?streetname=HILLSIDE+ST&Neighborhood=10M";

    const apiResponse = await got(testUrl);

    // console.log("api response: ", apiResponse)
    const responseBody = apiResponse.body;//html for the entire page
    // console.log("api response body: ", responseBody)

    const $ = cheerio.load(responseBody);  
    const html = $("#tblsweeping").html().replace(/(?:\r\n|\r|\n|\t|&nbsp;)/g, '')
    //const html = $("td", "#tblsweeping")
    const htmlData = {html: html}// the entire <tbody>
    console.log("html data: ",htmlData)

  return res.status(200).json(htmlData)
})
export default dataRouter