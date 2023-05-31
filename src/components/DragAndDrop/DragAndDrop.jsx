import React from "react";
import { useState, useRef, useContext } from "react";
import axios from "axios";
import { API, HEADERS } from "../../Config";
import { VideoContext } from "../../context/VideoAnalyticsProvider";

export default function DragAndDrop({ setAnalysing }) {
  // drag state
  const [dragActive, setDragActive] = useState(false);
  const { videoDetails, setVideoDetails } = useContext(VideoContext);

  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState("");
  // ref
  const inputRef = useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleFiles = async (file) => {
    if (file[0].type == "video/mp4") {
      console.log(file[0]);
      let formData = new FormData();
      formData.append("file", file[0]);
      formData.append("video_no", 12345);
      try {
        let upload = await axios.post(API.upload, formData, HEADERS);

        if (upload.status === 200) {
          let status = "In Queue";
          do {
            let data = await axios.get(
              API.extract,
              { params: { filename: file[0].name } },
              HEADERS
            );
            status = data.data.status;
            setStatus(status);
            setIsProcessing(true);
            await delay(10000);
            console.log(data);
            if(status === "Completed"){
              setVideoDetails({
                resolution: data.data.resolution,
                frame_rate: data.data.frame_rate,
                distortion_score: data.data.distortion_score,
                duration: data.data.duration,
                name: data.data.name,
                watermark: data.data.watermark,
                emotions : {
                  em_anger: data.data.em_anger,
                  em_joy: data.data.em_joy,
                  em_disgust: data.data.em_disgust,
                  em_fear: data.data.em_fear,
                  em_others: data.data.em_others,
                  em_sadness: data.data.em_sadness,
                  em_surprise: data.data.em_surprise,
                  ht_hateful: data.data.ht_hateful, 
                  ht_targeted: data.data.ht_targeted, 
                  ht_aggressive: data.data.ht_aggressive
                }
              })
            }
          } while (status !== "Completed");
          setAnalysing(true);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };

  return (
    <div className="video-uploader">
      <div className="card card-stretch mb-5 mb-xxl-8">
        <div className="card-body pb-0">
          <div className="d-flex flex-column h-100">
            <h3 className="text-dark text-center fs-1 fw-bolder lh-lg">
              <img
                src="/static/build/assets/img/logo-full.png"
                alt=""
                className="w-25 mb-5"
              />
              <br />
              Begin analytics by uploading a video
            </h3>
            <div className="text-center pt-7">
              {isProcessing ?
              <>
              <img src="/static/build/assets/img/processing.gif" alt="" />
              <h6 className="text-center"> {status} </h6>
              </>
              :
              <form
                className="mx-auto mb-xxl-8"
                id="form-file-upload"
                onDragEnter={handleDrag}
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  ref={inputRef}
                  type="file"
                  id="input-file-upload"
                  multiple={true}
                  onChange={handleChange}
                />
                <label
                  id="label-file-upload"
                  htmlFor="input-file-upload"
                  className={dragActive ? "drag-active" : ""}
                >
                  <div>
                    <p>Drag and drop your file here or</p>
                    <button className="upload-button" onClick={onButtonClick}>
                      Upload a file
                    </button>
                  </div>
                </label>
                {dragActive && (
                  <div
                    id="drag-file-element"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  ></div>
                )}
              </form>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
