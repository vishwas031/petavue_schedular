import moment from "moment-timezone";
import { calendar } from "../controller/scheduleEvent.js";
import { oauth2Client } from "../utils/oAuthClient.js";

export function CreateAllSlots(startTime, endTime, intervalMinutes, bufferMinutes) {
  const minTime = formatTimeToHHMM(new Date(startTime))
  const maxTime = formatTimeToHHMM(new Date(endTime))
  const startMoment = moment(minTime, 'HH:mm');
  const endMoment = moment(maxTime, 'HH:mm');
  if (!startMoment.isValid() || !endMoment.isValid()) {
    console.log('Invalid start or end time.');
    return;
  }

  if (startMoment.isSameOrAfter(endMoment)) {
    console.log('End time should be after the start time.');
    return;
  }

  const intervalMs = intervalMinutes * 60 * 1000;
  const bufferMs = bufferMinutes * 60 * 1000;

  let currentMoment = startMoment.clone();
  const tasks = [];

  tasks.push({
    startTime: currentMoment.toISOString(),
    endTime: currentMoment.add(intervalMs).toISOString(),
  });

  while (currentMoment.add(bufferMs).isBefore(endMoment)) {
    if (currentMoment.add(intervalMs).isBefore(endMoment)) {
      currentMoment.subtract(intervalMs)
      const task = {
        startTime: currentMoment.clone().toISOString(),
        endTime: currentMoment.add(intervalMs).toISOString(),
        isAvailable: true,
      };
      tasks.push(task);
    }
  }
  return tasks
}

export async function getBookedSlots(startTime, endTime) {
  const bookedSlots = []
  try {
    const user = req.user; // Assuming user is authenticated using Passport

  if (!user) {
    return res.status(401).json({ message: 'User not authenticated.' });
  }
  console.log("user",user);

  const calendar = calendar(user.accessToken);
    const response = await calendar.events.list({
      auth: oauth2Client,
      calendarId: "primary",
      timeMin: startTime,
      timeMax: endTime,
      singleEvents: true,
      orderBy: 'startTime',
    });
    const events = response.data.items;
    events.forEach((event) => {
      bookedSlots.push({
        startTime: new Date(event.start.dateTime).toISOString(),
        endTime: new Date(event.end.dateTime).toISOString()
      })
    });
    return bookedSlots;
  } catch (err) {
    console.error('Error fetching events:', err.message);
  }
  console.log("returned booked Events");
}



export function getAvaliableSlots(bookedTimingArr, allSlotsArr) {
  function doIntervalsOverlap(interval1, interval2) {
    return !(interval1.startTime > interval2.endTime || interval1.endTime < interval2.startTime);
  }
  for (let i = allSlotsArr.length - 1; i >= 0; i--) {
    if (bookedTimingArr.some(aInterval => doIntervalsOverlap(aInterval, allSlotsArr[i]))) {
      allSlotsArr.splice(i, 1);
    }
  }

  return allSlotsArr;
}

export function formatTimeToHHMM(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes}`;
}
