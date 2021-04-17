import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const day = document.getElementById("day");
const time = document.getElementById("time");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  console.log(evt.date.getDay());
  console.log(evt.date.getMonth());
  
  
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  let sec =util.zeroPad(today.getSeconds());
  //console.log(sec);
  //console.log(evt.date.toTimeString());
  time.text = `${hours}:${mins}:${sec}`;
}
