import React, {useContext} from 'react'
import {Love, Hate, Fear, Happy, CryingFace} from 'animated-emojis'
import { VideoContext } from '../../context/VideoAnalyticsProvider';

import Disgust from '../../image/disgust.gif'
import Other from '../../image/other.png'

export default function EmotionsCard() {
  const {videoDetails, setVideoDetails} = useContext(VideoContext);
  const _getPercentage = (decimal) => {
    if(decimal == undefined || isNaN(decimal)){
      return '0%';
    }
    return Math.round(decimal * 100) + '%';
  }
  return (
    <div className="card card-stretch mb-5 mb-xxl-8">
      {/*begin::Header*/}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder text-dark fs-3">Emotions Analyzer</span>
        </h3>
      </div>
      {/*end::Header*/}
      {/*begin::Body*/}
      <div className="card-body pt-2 pb-0 mt-n3">
        <div className="tab-content mt-5" id="myTabTables1">
          {/*begin::Tap pane*/}
          <div className="tab-pane fade show active" id="kt_tab_pane_1_1" role="tabpanel" aria-labelledby="kt_tab_pane_1_1">
            {/*begin::Table*/}
            <div className="table-responsive">
              <table className="table table-borderless align-middle">
                <thead>
                  <tr>
                    <th className="p-0 w-50px" />
                    <th className="p-0 min-w-200px" />
                    <th className="p-0 min-w-100px" />
                    <th className="p-0 min-w-40px" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="px-0 py-3">
                    <Love size={5} />
                    </th>
                    <td className="ps-0">
                      <a href="#" className="text-gray-800 fw-bolder text-hover-primary fs-6">JOY</a>
                      <span className="text-muted fw-bold d-block mt-1">Joy Meter</span>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100 me-3">
                        <div className="d-flex flex-stack mb-2">
                          <span className="text-dark me-2 fs-6 fw-bolder">
                            Progress
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="progress h-6px  w-100 bg-light-primary">
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: _getPercentage(videoDetails.emotions.em_joy)}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                          </div>
                          <span className="text-muted fs-7 fw-bold ps-3">
                            {videoDetails.emotions ? _getPercentage(videoDetails.emotions.em_joy) : ''}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="px-0 py-3">
                    <Hate size={5} />
                    </th>
                    <td className="ps-0">
                      <a href="#" className="text-gray-800 fw-bolder text-hover-primary fs-6">ANGER</a>
                      <span className="text-muted fw-bold d-block mt-1">Hate Meter</span>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100 me-3">
                        <div className="d-flex flex-stack mb-2">
                          <span className="text-dark me-2 fs-6 fw-bolder">
                            Progress
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="progress h-6px  w-100 bg-light-primary">
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: _getPercentage(videoDetails.emotions.em_anger)}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                          </div>
                          <span className="text-muted fs-7 fw-bold ps-3">
                          {videoDetails.emotions ? _getPercentage(videoDetails.emotions.em_anger) : ''}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="px-0 py-3">
                    <Happy size={5} />
                    </th>
                    <td className="ps-0">
                      <a href="#" className="text-gray-800 fw-bolder text-hover-primary fs-6">SURPRISE</a>
                      <span className="text-muted fw-bold d-block mt-1">Surprise Meter</span>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100 me-3">
                        <div className="d-flex flex-stack mb-2">
                          <span className="text-dark me-2 fs-6 fw-bolder">
                            Progress
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="progress h-6px  w-100 bg-light-primary">
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: _getPercentage(videoDetails.emotions.em_surprise)}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                          </div>
                          <span className="text-muted fs-7 fw-bold ps-3">
                          {videoDetails.emotions ? _getPercentage(videoDetails.emotions.em_surprise) : ''}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="px-0 py-3">
                    <img src={Disgust} alt="" style={{ width:"96px", marginRight:"-10px" }}/>
                    </th>
                    <td className="ps-0">
                      <a href="#" className="text-gray-800 fw-bolder text-hover-primary fs-6">DISGUST</a>
                      <span className="text-muted fw-bold d-block mt-1">Disgust Meter</span>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100 me-3">
                        <div className="d-flex flex-stack mb-2">
                          <span className="text-dark me-2 fs-6 fw-bolder">
                            Progress
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="progress h-6px  w-100 bg-light-primary">
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: _getPercentage(videoDetails.emotions.em_disgust)}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                          </div>
                          <span className="text-muted fs-7 fw-bold ps-3">
                          {videoDetails.emotions ? _getPercentage(videoDetails.emotions.em_disgust) : ''}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="px-0 py-3">
                    <Fear size={5} />
                    </th>
                    <td className="ps-0">
                      <a href="#" className="text-gray-800 fw-bolder text-hover-primary fs-6">FEAR</a>
                      <span className="text-muted fw-bold d-block mt-1">Fear Meter</span>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100 me-3">
                        <div className="d-flex flex-stack mb-2">
                          <span className="text-dark me-2 fs-6 fw-bolder">
                            Progress
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="progress h-6px  w-100 bg-light-primary">
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: _getPercentage(videoDetails.emotions.em_fear)}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                          </div>
                          <span className="text-muted fs-7 fw-bold ps-3">
                          {videoDetails.emotions ? _getPercentage(videoDetails.emotions.em_fear) : ''}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="px-0 py-3">
                    <CryingFace size={5} />
                    </th>
                    <td className="ps-0">
                      <a href="#" className="text-gray-800 fw-bolder text-hover-primary fs-6">SADNESS</a>
                      <span className="text-muted fw-bold d-block mt-1">Sadness Meter</span>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100 me-3">
                        <div className="d-flex flex-stack mb-2">
                          <span className="text-dark me-2 fs-6 fw-bolder">
                            Progress
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="progress h-6px  w-100 bg-light-primary">
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: _getPercentage(videoDetails.emotions.em_sadness)}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                          </div>
                          <span className="text-muted fs-7 fw-bold ps-3">
                          {videoDetails.emotions ? _getPercentage(videoDetails.emotions.em_sadness) : ''}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="px-0 py-3">
                    <img src={Other} alt="" style={{ width:"68px", marginLeft:"25px" }}/>
                    </th>
                    <td className="ps-0">
                      <a href="#" className="text-gray-800 fw-bolder text-hover-primary fs-6">OTHERS</a>
                      <span className="text-muted fw-bold d-block mt-1">Other Meter</span>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100 me-3">
                        <div className="d-flex flex-stack mb-2">
                          <span className="text-dark me-2 fs-6 fw-bolder">
                            Progress
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="progress h-6px  w-100 bg-light-primary">
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: _getPercentage(videoDetails.emotions.em_others)}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                          </div>
                          <span className="text-muted fs-7 fw-bold ps-3">
                          {videoDetails.emotions ? _getPercentage(videoDetails.emotions.em_others) : ''}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/*end::Table*/}
          </div>
          {/*end::Tap pane*/}
        </div>
      </div>
    </div>
  )
}
