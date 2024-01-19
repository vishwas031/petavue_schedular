import { google } from "googleapis";
import { v4 as uuid } from "uuid";
import { oauth2Client } from "../utils/oAuthClient.js";
import UserModel from "../models/user.js";
import dayjs from "dayjs";

export const calendar = google.calendar({
  version: "v3",
  auth: new google.auth.OAuth2(
    {
      clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URL,
    }
  ),
});

async function scheduleEvents(req, res) {
  const user = await UserModel.findOne({email: req.body.email})
  const token = req.header('Authorization').replace('Bearer ', '')
  oauth2Client.setCredentials({
    access_token: token
  });
  await calendar.events.insert({
    calendarId: req.body.email,
    auth: oauth2Client,
    conferenceDataVersion: 1,
    requestBody: {
      summary: req.body.summary,
      description: req.body.description,
      start: {
        dateTime: dayjs(new Date(req.body.startTime)).toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: dayjs(new Date(req.body.endTime)).toISOString(),
        timeZone: "Asia/Kolkata",
      },
      conferenceData: {
        createRequest: {
          requestId: uuid(),
        },
      },
      attendees: [{
        // email: req.profile.emails[0].value //we can get users email through the middleware using req.profile.emails[0].value
        email: req.body.myEmail
      }]
    }
  })
  console.log("scheduled event!")
  res.send("Done")
}

export { scheduleEvents }
