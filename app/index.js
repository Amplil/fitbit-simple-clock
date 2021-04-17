import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { charger } from "power";
import { battery } from "power";

let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const day = document.getElementById("day");
const time = document.getElementById("time");
const btIcon = document.getElementById("battery-icon");
const btText = document.getElementById("battery-text");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  //console.log(evt.date.getDay());
  //console.log(evt.date.getMonth());
  //console.log(evt.date.getFullYear());
  //console.log(evt.date.getDate());
  let year = today.getFullYear();
  let month = util.zeroPad(today.getMonth()+1);
  let date = util.zeroPad(today.getDate());
  let week = weekday[today.getDay()];
  day.text =`${year}/${month}/${date} ${week}`;
  
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
  
  updateBattery();
}

function updateBattery() {
  //console.log("updateBattery");
  console.log(btIcon.href);
  if (charger.connected) {  
    btIcon.href = "images/b/bc.png";
    btIcon.style.fill = "green";
    btText.text="OnCharge";
  } else {
    console.log("charge Level: " + battery.chargeLevel);
    let cl = battery.chargeLevel;
    btText.text=`${cl}%`;
    if (cl < 25) {
      btIcon.href = "images/b/b4g.png";
      btIcon.style.fill = "red";
    } else if (cl < 50) {
      btIcon.href = "images/b/b3g.png";
      btIcon.style.fill = "orange";
    } else if (cl < 75) {
      btIcon.href = "images/b/b2g.png";
      btIcon.style.fill = "yellow";
    } else {
      btIcon.href = "images/b/b1g.png";
      btIcon.style.fill = "green";
    }
  }
}

