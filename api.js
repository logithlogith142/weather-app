import React, { useEffect, useState } from "react";
export default function Getdata() {
  const [items, setitems] = useState([]);
  const [text, settext] = useState("");
  const [temp, settemp] = useState(0);
  const [hum, sethum] = useState(0);
  const [speed, setspeed] = useState(0);
  const [city, setcity] = useState("chennai");
  const [load, setload] = useState(false);
  const [citynot, setcitynot] = useState(false);

  let get = async () => {
    setload(true);
    const api = "e717dd47016d45a5d02485b9b7384ea6";
    const a = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api}&units=metric`
    );
    try {
      const response = await a.json();
      setitems(response);
      if (response.code === 400) {
        console.error("invalid city");
        setload(false);
        setcitynot(true);
        console.log(items);
        return;
      }
      settemp(response.main.temp);
      sethum(response.main.humidity);
      setspeed(response.wind.speed);
      setcity(response.name);
      setcitynot(false);
    } catch (error) {
      console.error("error is occured", error.message);
    } finally {
      setload(false);
    }
  };

  console.log(text);

  const userget = () => {
    const a = document.querySelector(".input").value;
    settext(a);

    get();
  };
  useEffect(function () {
    get();
  }, []);
  return (
    <>
      {!load && !citynot && (
        <div>
          <input type="text" className=" input" />
          <button onClick={userget}>search</button>
          <h1 style={{ color: "red" }}>climate</h1>
          <h1 style={{ color: "black" }}>{temp}</h1>
          <h1 style={{ color: "purple" }}>{city}</h1>
          <h1 style={{ color: "red" }}>wind speed</h1>
          <h3 style={{ color: "black" }}>{speed}</h3>
          <h1 style={{ color: "red" }}>humidity</h1>
          <h1 style={{ color: "black" }}>{hum}</h1>
        </div>
      )}
      {load && (
        <div style={{ color: "red" }}>
          <h3>loading...</h3>
        </div>
      )}
      {citynot && (
        <div style={{ color: "red" }}>
          <h3>city not found</h3>
        </div>
      )}
    </>
  );
}
