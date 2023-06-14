import {React, useState} from "react";
import { SocialIcon } from "react-social-icons";
import { processData, capitalizeWord } from "../../data/api";
import { BASE_URI } from "../../Config";

export default function DataModal(props) {
  const {tableData, videoData} = props;
  const url = 'https://www.'+tableData['CHANNEL'].toLowerCase()+'.com/'+tableData['Handle'].replace(/[|&;$%@"<>()+,]/g, "");
  let emotions = [];
  videoData.AUDIO_AUDIT.EMOTION_DETECTION.forEach(element => {
    emotions.push(element[1])
  });
  const {audio_highlight, video_highlight, table_contents} = processData(videoData);


  const controlVideoPlayback = (time) => {
    let video = document.getElementById("video_playback");
    console.log(time);
    video.currentTime = Math.floor(time);
    video.play();
  }
  return (
    <div>
        <button className="rightArrow" onClick={() => {props.toggleIsOpen()}}></button>
      <div className="row">
        <div className="col-5">
          <div className="video-super">
            <SocialIcon
              url={url}
              style={{ borderRadius: 0, width: 25 }}
            />
            <h6>{tableData.Title}</h6>
            <h6>{videoData.SANITY_CHECKS.DURATION}</h6>
          </div>
          <div className="image-thumbnail">
            {/* <img
              src={ BASE_URI + videoData.THUMBNAIL_DIR }
              alt="Video thumbnail"
            /> */}
            <video src={ BASE_URI + videoData.VIDEO_DIR} controls="true" muted={true} id="video_playback" ></video>
          </div>
          <div className="video-sub">
            <h6>
              Language: <b>{videoData.AUDIO_AUDIT.LANGUAGE_CODE}</b>
            </h6>
            <h6>
              Location: <b>{tableData.LOCATION}</b>
            </h6>
            <h6>
              Post Date: <b>{tableData.Datetime}</b>
            </h6>
          </div>
          <div className="video-transcript">
            <p>
              {videoData.AUDIO_AUDIT.TRANSCRIPTION}
            </p>
          </div>
        </div>
        <div className="col-7">
          <div className="video-timeline-contianer">
            <table className="table table-dark video-timeline">
              <thead>
                <tr>
                  <th className="activity">.....</th>
                  {[...Array(10)].map((ele, idx) => (
                    <td key={idx + "header"}>
                      {Math.floor((idx * videoData.AUDIO_AUDIT.SEGMENT_DURATION)/60)}:{(idx * videoData.AUDIO_AUDIT.SEGMENT_DURATION)%60}m</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="activity">Activity/Behaviour</th>
                  {[...Array(10)].map((ele, idx) => {
                    return <td key={Math.random()}><span style={{height:'25px'}}></span></td>;
                  })}
                </tr>
                <tr>
                  <th className="activity">Crowd Gathering</th>
                  {[...Array(10)].map((ele, idx) => {
                    return <td key={Math.random()}><span style={{height:'25px'}}></span></td>;
                  })}
                </tr>
                <tr>
                  <th className="activity">Scene Object</th>
                  {[...Array(10)].map((ele, idx) => {
                    let t = videoData.AUDIO_AUDIT.SEGMENT_DURATION * idx;
                    if (video_highlight.hasOwnProperty(t)) {
                      return (
                        <td key={Math.random()}>
                          {" "}
                          <span className="eventBubble">{video_highlight[t].INDEX}</span>{" "}
                        </td>
                      );
                    } else {
                      return <td key={Math.random()}></td>;
                    }
                  })}
                </tr>
                <tr>
                  <th className="activity">Key Text</th>
                  {[...Array(10)].map((ele, idx) => {
                    return <td key={Math.random()}><span style={{height:'25px'}}></span></td>;
                  })}
                </tr>
                <tr>
                  <th className="activity">Audio Highlight</th>
                  {[...Array(10)].map((ele, idx) => {
                    let t = videoData.AUDIO_AUDIT.SEGMENT_DURATION * idx;
                    if (audio_highlight.hasOwnProperty(t)) {
                      return (
                        <td key={Math.random()}>
                          {" "}
                          <span className="eventBubble">{audio_highlight[t].INDEX}</span>{" "}
                        </td>
                      );
                    } else {
                      return <td key={Math.random()}><span style={{height:'25px'}}></span></td>;
                    }
                  })}
                </tr>
                <tr>
                  <th className="activity">Sentiment Emotion</th>
                  {[...Array(10)].map((ele, idx) => {
                    return <td key={Math.random()}><span style={{height:'25px'}}></span></td>;
                  })}
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th className="activity">....</th>
                  {[...Array(10)].map((ele, idx) => (
                    <td key={idx + "footer"}>{Math.floor((idx * videoData.AUDIO_AUDIT.SEGMENT_DURATION)/60)}:{(idx * videoData.AUDIO_AUDIT.SEGMENT_DURATION)%60}m</td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="video-detail">
            <div className="row">
              <div className="col-5">
                <div className="row video-action-table">
                  <div className="col-6">
                    <div className="video-score">
                      <div className="video-score--score">{Math.ceil(tableData.Threat)}</div>
                      <div className="video-score--title">Threat Score</div>
                    </div>
                    <div className="video-action">
                      <h4 className="action-title">Emotions</h4>
                      <p>{videoData.AUDIO_AUDIT.KEY_EMOTIONS.join(', ')}</p>
                    </div>
                    <div className="video-action">
                      <h4 className="action-title">Situtation Detected</h4>
                      <p>{videoData.VIDEO_AUDIT.KEY_SITUATIONS.join(', ')}</p>
                    </div>
                    <div className="video-action">
                      <h4 className="action-title">Place/Person Detected</h4>
                      <p>Hatefull, aggressive, saddness</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="video-score">
                      <div className="video-score--score">{Math.ceil(tableData.Virality)}</div>
                      <div className="video-score--title">Virality Score</div>
                    </div>
                    <div className="video-action">
                      <h4 className="action-title">Views</h4>
                      <p>
                        <b>{tableData.VIEWS}</b>
                      </p>
                    </div>
                    <div className="video-action">
                      <h4 className="action-title">Reactions</h4>
                      <p>
                        <b>{tableData.REACTS}</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-7">
                <div className="video-action-table">
                  <table className="table table-bordered table-video-action-list">
                    <tbody>
                      {table_contents.map((ele, idx) => {
                        let t = Math.ceil(Math.random() * 10);
                        return (
                          <tr key={Math.random()}>
                            <th scope="row">{ele.INDEX}</th>
                            <td colSpan={1}>{Math.floor(ele.TIME / 60)}:{Math.floor(ele.TIME % 60)}</td>
                            <td colSpan={4}>{ele.DETAILS}</td>
                            <td colSpan={1}>
                              {" "}
                              <button className="play" onClick={() => controlVideoPlayback(ele.TIME)}></button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
