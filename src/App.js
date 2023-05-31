import "./App.css";
import { useState } from "react";
import Main from "./main";
import Sidebar from "./components/Sidebar/Sidebar";
import { VideoContext } from "./context/VideoAnalyticsProvider";

function App() {
  const [videoDetails, setVideoDetails] = useState({
    resolution: " ------ ",
    frame_rate: " ---- ",
    distortion_score: " 0.0",
    duration: "0.0",
    name: "Video name",
    watermark: [],
    emotions: {
      "em_sadness": "N/A", 
      "em_others": "N/A", 
      "em_fear": "N/A", 
      "em_disgust": "N/A", 
      "em_surprise": "N/A", 
      "em_joy": "N/A",
      "em_anger": "N/A", 
      "ht_hateful": "N/A", 
      "ht_targeted": "N/A", 
      "ht_aggressive": "N/A"
    }
  });

  return (
    <body
      id="kt_body"
      data-sidebar="on"
      class="header-fixed header-tablet-and-mobile-fixed toolbar-enabled sidebar-enabled"
    >
      <VideoContext.Provider value={{ videoDetails, setVideoDetails }}>
        <div class="d-flex flex-column flex-root">
          <div class="page d-flex flex-row flex-column-fluid">
            <div className="wrapper  d-flex flex-column flex-row-fluid">
              <Main />
            </div>

            <Sidebar />
          </div>
        </div>
      </VideoContext.Provider>
    </body>
  );
}

export default App;
