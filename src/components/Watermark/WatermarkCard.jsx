import React, { useContext } from "react";
import { Love, Hate, Fear, Happy, CryingFace } from "animated-emojis";
import { VideoContext } from "../../context/VideoAnalyticsProvider";

export default function WatermarkCard() {
  const watermarks = [
    "TakaTak ID: bindusatyan",
    "Le yTate [ES",
    "MxTaketak",
    "a AKsi ",
    "TakaTak ? 0 : bindugats ",
    "Bindusathyan ",
  ];
  const _getPercentage = (decimal) => {
    if (decimal == undefined || isNaN(decimal)) {
      return "0%";
    }
    return Math.round(decimal * 100) + "%";
  };
  const { videoDetails, setVideoDetails } = useContext(VideoContext);
  return (
    <>
      <div className="card card-stretch mb-5 mb-xxl-8">
        {/*begin::Header*/}
        <div className="card-header align-items-center border-0 mt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="fw-bolder text-dark fs-3">Text Inspector</span>
          </h3>
        </div>
        <div className="card-body pt-3">
          <div className="timeline-label">
            <div className="timeline-item">
              <div className="timeline-badge">
                <i className="fa fa-genderless text-warning fs-1" />
              </div>
              <div className="fw-mormal timeline-content text-muted ps-3">
                {videoDetails.watermark}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-stretch mb-5 mb-xxl-8">
        {/*begin::Header*/}
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder text-dark fs-3">
              Hate Analyzer
            </span>
          </h3>
        </div>
        {/*end::Header*/}
        {/*begin::Body*/}
        <div className="card-body pt-2 pb-0 mt-n3">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-6">
                  <div className="px-0 py-3">
                    <CryingFace size={5} />
                  </div>
                </div>
                <div className="col-6 center">
                  <div className="ps-0 center">
                    <a
                      href="#"
                      className="text-gray-800 fw-bolder text-hover-primary fs-6"
                    >
                      HATE
                    </a>
                    <span className="text-muted fw-bold d-block mt-1">
                      Hate Meter
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="d-flex flex-column w-100 me-3">
                  <div className="d-flex flex-stack mb-2">
                    <span className="text-dark me-2 fs-6 fw-bolder">
                      Progress
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="progress h-6px  w-100 bg-light-primary">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{
                          width: _getPercentage(
                            videoDetails.emotions.ht_hateful
                          ),
                        }}
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className="text-muted fs-7 fw-bold ps-3">
                      {videoDetails.emotions
                        ? _getPercentage(videoDetails.emotions.ht_hateful)
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-6">
                  <div className="px-0 py-3">
                    <Hate size={5} />
                  </div>
                </div>
                <div className="col-6 center">
                  <div className="ps-0 center">
                    <a
                      href="#"
                      className="text-gray-800 fw-bolder text-hover-primary fs-6"
                    >
                      TARGETED
                    </a>
                    <span className="text-muted fw-bold d-block mt-1">
                      Targeted Meter
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="d-flex flex-column w-100 me-3">
                  <div className="d-flex flex-stack mb-2">
                    <span className="text-dark me-2 fs-6 fw-bolder">
                      Progress
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="progress h-6px  w-100 bg-light-primary">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{
                          width: _getPercentage(
                            videoDetails.emotions.ht_targeted
                          ),
                        }}
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className="text-muted fs-7 fw-bold ps-3">
                      {videoDetails.emotions
                        ? _getPercentage(videoDetails.emotions.ht_targeted)
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-6">
                  <div className="px-0 py-3">
                    <Happy size={5} />
                  </div>
                </div>
                <div className="col-6 center">
                  <div className="ps-0 center">
                    <a
                      href="#"
                      className="text-gray-800 fw-bolder text-hover-primary fs-6"
                    >
                      AGGRESIVE
                    </a>
                    <span className="text-muted fw-bold d-block mt-1">
                      Aggresive Meter
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="d-flex flex-column w-100 me-3">
                  <div className="d-flex flex-stack mb-2">
                    <span className="text-dark me-2 fs-6 fw-bolder">
                      Progress
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="progress h-6px  w-100 bg-light-primary">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{
                          width: _getPercentage(
                            videoDetails.emotions.ht_aggressive
                          ),
                        }}
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className="text-muted fs-7 fw-bold ps-3">
                      {videoDetails.emotions
                        ? _getPercentage(videoDetails.emotions.ht_aggressive)
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
