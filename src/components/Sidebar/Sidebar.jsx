import React from "react";
import { useContext } from "react";
import { VideoContext } from "../../context/VideoAnalyticsProvider";

export default function Sidebar() {
  const { videoDetails, setVideoDetails } = useContext(VideoContext);
  return (
    <div id="kt_sidebar" className="sidebar bg-info">
      <div className="d-flex flex-column sidebar-body">
        <div id="kt_sidebar_content" className="py-10 px-2 px-lg-8">
          <h2 className="fw-bolder text-white fs-2 pb-4 text-center">
            Video Quality Inspector
          </h2>
          <div className="hover-scroll-y me-lg-n5 pe-lg-4">
            <div className="card bg-info">
              <div className="card-body px-0">
                <div className="pt-0">
                  <div className="d-flex flex-center position-relative bgi-no-repeat bgi-size-contain bgi-position-x-center bgi-position-y-center">
                    <div className="position-absolute mb-7">
                      <div className="symbol symbol-circle symbol-100px overflow-hidden d-flex flex-center z-index-1">
                        <img
                          alt="Play Button"
                          src="/static/build/assets/img/play-button.gif"
                          className="mh-100px"
                        />
                      </div>
                    </div>
                    <div id="kt_user_chart" style={{ height: 200 }} />
                  </div>
                  <div className="pt-4">
                    {/*begin::Title*/}
                    <div className="text-center pb-12">
                      {/*begin::Username*/}
                      <h3 className="fw-bolder text-white fs-2 pb-4">
                        {videoDetails.name}
                      </h3>
                    </div>
                    {/*end::Title*/}
                    {/*begin::Row*/}
                    <div className="row row-cols-2 px-xl-12 sidebar-toolbar">
                      <div className="col p-3">
                        <a
                          href="#"
                          className="btn p-5 w-100 text-start btn-active-primary d-flex flex-column justify-content-between"
                        >
                          <span className="text-white fw-bolder fs-1 d-block pb-1">
                            {videoDetails.resolution}
                          </span>
                          <span className="fw-bold">Resolution</span>
                        </a>
                      </div>
                      <div className="col p-3">
                        <a
                          href="#"
                          className="btn p-5 w-100 h-100 text-start btn-active-primary d-flex flex-column justify-content-between"
                        >
                          <span className="text-white fw-bolder fs-1 d-block pb-1">
                            {videoDetails.frame_rate}
                          </span>
                          <span className="fw-bold">Frame Rate</span>
                        </a>
                      </div>
                      <div className="col p-3">
                        <a
                          href="#"
                          className="btn p-5 w-100 h-100 text-start btn-active-primary d-flex flex-column justify-content-between"
                        >
                          <span className="text-white fw-bolder fs-1 d-block pb-1">
                            {videoDetails.distortion_score}
                          </span>
                          <span className="fw-bold">Distortion Score</span>
                        </a>
                      </div>
                      <div className="col p-3">
                        <a
                          href="#"
                          className="btn p-5 w-100 h-100 text-start btn-active-primary d-flex flex-column justify-content-between"
                        >
                          <span className="text-white fw-bolder fs-1 d-block pb-1">
                            {videoDetails.duration}
                          </span>
                          <span className="fw-bold">Duration</span>
                        </a>
                      </div>
                    </div>
                    {/*end::Row*/}
                  </div>
                  {/*end::Items*/}
                </div>
              </div>
              {/*end::Body*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
