import React, { useEffect, useState } from "react";
import logo from "./assets/test.svg";
import "./App.css";
import { kill } from "process";
import { clear } from "console";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setCount((last) => last + 1);
      console.log(count);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <svg
          width="86"
          height="86"
          viewBox="0 0 86 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="node_normal">
            <g id="circle_bg" filter="url(#filter0_dd_7554_610)">
              <circle cx="43" cy="42" r="40" fill="#3F3F46" />
              <circle cx="43" cy="42" r="39.5" stroke="white" />
            </g>
            <text x="26" y="52" className="text" fill="white">
              {count}
            </text>
          </g>
          <defs>
            <filter
              id="filter0_dd_7554_610"
              x="0"
              y="0"
              width="86"
              height="86"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_7554_610"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_dropShadow_7554_610"
                result="effect2_dropShadow_7554_610"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect2_dropShadow_7554_610"
                result="shape"
              />
            </filter>
          </defs>
        </svg>

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
