import { capitalizeWord } from "../data/api";
import data from "../data/dashboard.json";
import { useState, useEffect } from "react";

import { getTableData, getVideoData } from "../data/api";

import { useSpring, animated, to } from "@react-spring/web";
import DataModal from "../components/dataModal/DataModal";
import { ShimmerSectionHeader, ShimmerTable, ShimmerThumbnail } from "react-shimmer-effects";
import { BASE_URI } from "../Config";
import Swal from "sweetalert2";

const Home = () => {
    const [tag, setTag] = useState('political');
    const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tableData, setTableData] = useState({});
  const [videoData, setVideoData] = useState({});
  const [springs, api] = useSpring(() => ({
    delay: 20000,
    from: { x: 100 + "%", y: -50 + "%" },
  }));

  useEffect(() => {
    getData();
    setSelectedIndex(0);
  }, []);

  const getData = async () => {
    let t = await getTableData();
    let d = await getVideoData(t.result[0].Title);
    console.log(t);
    setTableData(t);
    setVideoData(d);
  };
  const selectVideo = async(title) =>{
    Swal.fire({
        title: "Processing",
        html: "<b>Data is being loaded<b>",
        didOpen: () => {
          Swal.showLoading();
        },
      });
    let d = await getVideoData(title);
    setVideoData(d);
    Swal.close();  
  }
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const handleOpen = () => {
    api.start({
      to: { x: !isOpen ? 0 + "%" : 100 + "%", y: -50 + "%" },
      config: {
        mass: 10,
        friction: 40,
        tension: 60,
      },
    });
    setIsOpen(!isOpen);
  };
  if (
    tableData == {} ||
    tableData == undefined ||
    tableData == null ||
    Object.keys(tableData).length < 1
  ) {
    return (<div>
        <ShimmerSectionHeader />
        <ShimmerThumbnail height={250} rounded />
        <ShimmerThumbnail height={250} rounded />
        <ShimmerThumbnail height={250} rounded />
    </div>);
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn btn-link text-light text-decoration-none disabled" onClick={() => setTag('hate_speech')}>Hate Speech</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-light text-decoration-none disabled" onClick={() => setTag('instigation')}>Instigation</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-light text-decoration-none" onClick={() => setTag('intimidation')}>Intimidation</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-light text-decoration-none" onClick={() => setTag('violence')}>Funny</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-light text-decoration-none disabled" onClick={() => setTag('funny')}>Funny</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-light text-decoration-none" onClick={() => setTag('political')}>Political</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-light text-decoration-none disabled" onClick={() => setTag('harrasment')}>Harrasment</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-light text-decoration-none" onClick={() =>setTag('drug_abuse')}>Drug Abuse</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-light text-decoration-none disabled" onClick={() => setTag('criminal_activity')}>Criminal Activity</button>
            </li>
            {/* <li className="nav-item">
              <button className="btn btn-link text-light text-decoration-none disabled" onClick={() => setTag('alcohol_others')}>Alcohol & Others</button>
            </li> */}
          </ul>
        </div>
      </nav>
      <div className="container-fluid mt-3">
        {data.map((items, index) => {
            if(items.tag !== tag) return (<></>)
          return (
            <><h5>{capitalizeWord(items.name)}</h5>
            <div className="row row-cols-5 mb-3" key={index}>
              {items.data.map((item,idx) => {
                return (
                  <div className="col" onClick={async () => {await selectVideo(item['file_name']); handleOpen()}} key={item['file_name']+idx}>
                    <div className="card border-0">
                      <img
                        src={BASE_URI +`static/thumbnails_video/${item['file_name']}/thumbnail.jpg`}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body px-0">
                        {Object.keys(item).map((key, i) => {
                          return (
                            <p className="card-text" style={{ fontSize:"12px", marginBottom:"5px" }} key={Math.random()}>
                                <span className="fw-bold">{capitalizeWord(key)}</span> : <span>{item[key]}</span>
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            </>
            
          );
        })}
      </div>
      <animated.div style={springs} className="dataModal">
        <DataModal
          toggleIsOpen={handleOpen}
          tableData={tableData.result[selectedIndex]}
          videoData={videoData}
        />
      </animated.div>
    </>
  );
};

export default Home;
