//app.js
import express from "express";
const app = express();
import AWS from "aws-sdk"; //npm install aws-sdk
import dotenv from 'dotenv'
dotenv.config() //npm install dotenv

const PORT = "3000";
AWS.config.update({
  AWS_ACCESS_KEY_ID:"AKIATU5O2YPB4HGWVFT4",
  AWS_SECRET_ACCESS_KEY:"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",
  AWS_REGION:"us-east-1"
})
//function to generate random number
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
//function to send OTP using AWS-SNS
function sendOTP() {
  var mobileNo = "18325408313";
  var OTP = generateRandomNumber(1000, 9999);

  var params = {
    Message:
      "Welcome! your mobile verification code is: " +
      OTP +
      "    Mobile Number is:" +
      mobileNo /* required */,
    PhoneNumber: mobileNo,
  };

  return new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise()
    .then((message) => {
      console.log("OTP SEND SUCCESS");
    })
    .catch((err) => {
      console.log("Error " + err);
      return err;
    });
}

sendOTP(); //calling send otp function
