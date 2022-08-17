import React, { Fragment, useEffect, useState } from "react";
import StartIcon from "@mui/icons-material/Start";
import StopIcon from "@mui/icons-material/Stop";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import "./index.css";
const pad = (n, width, z) => {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
function Solution() {
  const [timeString, settimeString] = useState("03:00");
  const [minutes, setminutes] = useState(3);
  const [seconds, setseconds] = useState(0);
  const [copyofminutes, setcopyofminutes] = useState(3);
  const [copyOfseconds, setcopyOfseconds] = useState(0);
  const [interval, setinterval] = useState(null);

  const intervalFunction = () => {
    let string = "";
    let Psecond = JSON.parse(localStorage.getItem("seconds"));
    let Pminute = JSON.parse(localStorage.getItem("minutes"));
    if (Psecond == 0 && Pminute == 0) {
      clearInterval(interval);
    } else {
      if (Psecond == 0) {
        if (Pminute != 0) {
          string = pad(parseInt(Pminute) - 1, 2) + ":" + pad(59, 2);
          localStorage.setItem(
            "minutes",
            JSON.stringify(parseInt(Pminute) - 1)
          );
          localStorage.setItem("seconds", JSON.stringify(59));
        } else {
          string = "00:" + pad(60, 2);
          setseconds(60);
          localStorage.setItem("seconds", JSON.stringify(60));
        }
      } else {
        string = "" + pad(Pminute, 2) + ":" + pad(parseInt(Psecond) - 1, 2);
        localStorage.setItem("seconds", JSON.stringify(parseInt(Psecond) - 1));
      }
      settimeString(string);
    }
  };
  function startBUttonClick(flag) {
    if (interval) {
      clearInterval(interval);
    }
    let fraction = parseInt(seconds) / 60;
    let time;
    if (minutes) {
      time = parseInt(minutes) + parseInt(fraction);
      setminutes(parseInt(minutes) + parseInt(fraction));
    } else {
      time = 0;
      setminutes(0);
    }

    setseconds(parseInt(seconds) % 60);
    localStorage.setItem("minutes", JSON.stringify(time));
    localStorage.setItem("seconds", JSON.stringify(parseInt(seconds) % 60));
    if (flag) {
      settimeString(minutes + ":" + seconds);
    } else {
      let Psecond = JSON.parse(localStorage.getItem("seconds"));
      let Pminute = JSON.parse(localStorage.getItem("minutes"));
      settimeString(pad(Pminute, 2) + ":" + pad(Psecond, 2));
    }

    let myInterval = setInterval(intervalFunction, 1000);
    setinterval(myInterval);
  }
  function stopButtonClick() {
    if (interval) {
      clearInterval(interval);
    }
    setcopyofminutes(JSON.parse(localStorage.getItem("minutes")));
    setcopyOfseconds(JSON.parse(localStorage.getItem("seconds")));
  }
  function resumeBUttonClick() {
    if (interval) {
      clearInterval(interval);
    }
    setminutes(copyofminutes);
    setseconds(copyOfseconds);
    let fraction = parseInt(copyOfseconds) / 60;
    let time;
    time = parseInt(copyofminutes) + parseInt(fraction);
    setminutes(parseInt(copyofminutes) + parseInt(fraction));
    setseconds(parseInt(copyOfseconds) % 60);
    localStorage.setItem("minutes", JSON.stringify(time));
    localStorage.setItem("seconds", JSON.stringify(copyOfseconds));
    let Psecond = JSON.parse(localStorage.getItem("seconds"));
    let Pminute = JSON.parse(localStorage.getItem("minutes"));

    settimeString(
      pad(Pminute, 2) +
        ":" +
        pad(Psecond == "0" ? 59 : parseInt(Psecond) - 1, 2)
    );

    let myInterval = setInterval(intervalFunction, 1000);
    setinterval(myInterval);
  }
  function restBGUttonClick() {
    clearInterval(interval);
    setminutes(0);
    setseconds(0);
    settimeString("00:00");
  }
  return (
    <div style={{ marginTop: "20px" }}>
      <span className="spanInputSection">
        <label>
          Minutes
          <input
            type="number"
            value={minutes}
            onChange={(e) => {
              e.preventDefault();
              setminutes(e.target.value);
              setcopyofminutes(e.target.value);
            }}
          />
        </label>
        <label style={{ marginLeft: "10px" }}>
          Seconds
          <input
            type="number"
            value={seconds}
            onChange={(e) => {
              e.preventDefault();
              setseconds(e.target.value);
              setcopyOfseconds(e.target.value);
            }}
          />
        </label>
      </span>
      <button
        onClick={(e) => {
          if (minutes || seconds) {
            startBUttonClick();
          }
        }}
      >
        <div style={{ display: "flex" }}>
          <StartIcon />
          <span className="spanInputText">START</span>
        </div>
      </button>
      <button
        onClick={(e) => {
          stopButtonClick();
        }}
      >
        <div style={{ display: "flex" }}>
          <StopIcon />
          <span className="spanInputText">PAUSE</span>
        </div>
      </button>
      <button
        onClick={(e) => {
          resumeBUttonClick();
        }}
      >
        <div style={{ display: "flex" }}>
          <PlayCircleOutlineIcon />
          <span className="spanInputText">CONTINUE</span>
        </div>
      </button>
      <button
        onClick={(e) => {
          restBGUttonClick();
        }}
      >
        <div style={{ display: "flex" }}>
          <RestartAltIcon />
          <span className="spanInputText">RESET</span>
        </div>
      </button>

      <div style={{ color: "rgb(97 203 76)" }}>
        <h1 data-testid="running-clock">{timeString}</h1>
      </div>
    </div>
  );
}

export default Solution;
