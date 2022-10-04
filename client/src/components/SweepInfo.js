import React, { useState, useEffect } from "react";

// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const SweepInfo = (props) => {
  const [myHtml, setHtml] = useState([]);

  const parseData = (htmlData) => {
    const doc = new DOMParser().parseFromString(htmlData, "text/html");
    console.log("doc", doc);
    const trDomElements = doc.getElementsByTagName("tr");
    const trElements = [...trDomElements];

    const infoObjArray = trElements
      .filter((trElt, cntTr) => cntTr > 0)
      .map((trElt, cntTr) => {
        const tdDomElements = trElt.getElementsByTagName("td");
        const tdElements = [...tdDomElements];

        let infoObj = {};

        tdElements.forEach((tdElt, cntTd) => {
          if (cntTd === 2) {
            const evenOrOdd = tdElt.textContent;
            infoObj.evenOrOdd = evenOrOdd;
          } else if (cntTd === 4) {
            const info = tdElt;
            const tdDomChildren = tdElt.childNodes;
            const tdChildren = [...tdDomChildren];

            const timeRangeNode = tdChildren[2];
            const timeRange = timeRangeNode.textContent; 
            infoObj.timeRange = timeRange;

            const aElt = tdChildren[5];
            const aDomAtts = aElt.attributes;
            const aAtts = { ...aDomAtts };
            const hrefAtt = aAtts[1];
            const hrefValue = hrefAtt.textContent;
            const hrefValueArray = hrefValue.split("=");
            const dateString = hrefValueArray[2]; 
            infoObj.date = dateString;
          }
        }); 
        return infoObj;
      }); // end of trElement loop
    return infoObjArray;
  };

  const getData = async () => {
    const response = await fetch(`/api/v1/data`);
    const responseBody = await response.json();
    console.log(responseBody);
    const preHtmlData = responseBody.html;
    const htmlData = `<table>${preHtmlData}</table>`;
    const parsedData = parseData(htmlData);

    console.log("Parsed data: ", parsedData);
    setHtml(parsedData);
  };

  useEffect(() => {
    getData()
  }, []);

  const printDataFunction = () => { //myHtml is an array of parsedData

    myHtml.forEach((object) => {
      // console.log("Object - ", object)
      for(const key in object) {
        console.log(`${key}: ${object[key]}`)
      }
    })
  }

  printDataFunction()

  // console.log(props.user.email)

  const [show, toggleShow] = useState(true);

  const sendMessage = async () => {
    const messageBody = {
      phoneNum: "8325408313",
      msgSubject: "Welcome from Sweeper Scout",
      msgBody: "Thank you for registering for street sweeper!"
    }
    const response = fetch(`/api/v1/${messageBody.phoneNum}/${messageBody.msgSubject}/${messageBody.msgBody}`)
    
  }

  return(
    <div>
      {/* <Button lg warning onClick={() => console.log("clicked")}>Show Toast</Button>  */}
      <h1>Street sweeping info</h1>
      <ul>
        {myHtml.map(item => {
          return <li>Date: {item.date}, Even or Odd: {item.evenOrOdd} Time Range: {item.timeRange}</li>;
        })}
      </ul>
      <Button> Click Me! </Button>
    </div>
  );
};
export default SweepInfo;

    //   const parser = new DOMParser();
    //   const htmlObj = parser.parseFromString(htmlData, "text/html")
    //  const tdElements = {} //htmlObj.get("td")
    //  Object.values(tdElements).forEach(value => {
    //   //  const value = tdElements[key]
    //    //const text = value.text
    //    console.log("td element", value)
    //  })
    //   console.log("html obj",  htmlObj)