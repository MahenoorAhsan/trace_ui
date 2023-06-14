import { useState, useEffect } from "react";
import DataModal from "../components/dataModal/DataModal";
import TableRow from "../components/table/TableRow";
import { useSpring, animated, to } from "@react-spring/web";
import { ShimmerTable } from "react-shimmer-effects";
import { getTableData, getVideoData } from "../data/api";
import { Navigate } from "react-router-dom";
import { API, HEADERS } from "../Config";
import Swal from "sweetalert2";
import axios from "axios";
// var data = require("../data/table_of_contents.json");
const tableHeader = {
  Title: "",
  CHANNEL: "",
  Handle: "",
  LOCATION: "",
  Threat: "",
  EMOTION: "",
  SITUATIONS: "",
  "PErson/Location detected": "15%",
  Virality: "",
  VIEWS: "",
  REACTS: "",
  Datetime: "",
};

const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
const Alaysis = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [data, setData] = useState({});
  const [videoData, setVideoData] = useState({});
  const [searchQuery, setSearch] = useState("");
  const [analysing, setAnalysing] = useState(false);
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
    if (!t) {
      Navigate("/", "/analysis");
    }
    setData(t);
    setVideoData(d);
  };
  const selectVideo = async(index) =>{
    setSelectedIndex(index);
    let d = await getVideoData(data.result[index].Title);
    setVideoData(d);  
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
  let searchData = [];
  let searchString = [
    "Title",
    "CHANNEL",
    "Handle",
    "LOCATION",
    "PErson/Location detected",
  ];
  let searchArray = ["EMOTION", "SITUATIONS"];
  const setSearchData = (data) => {
    Object.entries(data).forEach(function (ele) {
      if (searchString.includes(ele[0])) {
        searchData.push(ele[1]);
      }
      if (searchArray.includes(ele[0])) {
        searchData.push(...ele[1]);
      }
    });
  };

  const uploadFile = async (event) => {
    console.log("called");
    console.log(event.target.files[0]);
    if (event.target.files[0].type == "video/mp4") {
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("video_no", 12345);

      try {
        Swal.fire({
          title: "Uploading",
          html: "<b>Video is being uploaded please wait!<b>",
          didOpen: () => {
            Swal.showLoading();
          },
        });
        let upload = await axios.post(API.upload, formData, HEADERS);
        Swal.update({
          title: "In Queue",
          html: "<b>Your video is in Queue. Please wait !!<b>"
        })
        if (upload.status === 200) {
          let status = "IN Queue";
          do {
            let data = await axios.get(
              API.extract,
              { params: { filename: event.target.files[0].name } },
              HEADERS
            );
            status = data.data.status;
            await delay(10000);
            const b = Swal.getHtmlContainer().querySelector("b");
            b.textContent = data.data;
            console.log(data.data.PERSON_DETECTED);
            if(typeof data.data.PERSON_DETECTED != undefined){
              status = "Completed";
              Swal.close();
              setData({});
              let d =await getTableData();
              setData(d);
            }
            console.log(data);
          } while (status !== "Completed");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (
    data == {} ||
    data == undefined ||
    data == null ||
    Object.keys(data).length < 1
  ) {
    return <ShimmerTable row={5} col={5} />;
  }
  return (
    <>
      <div className="search-bar mt-4 mb-2">
        <div className="row">
          <div className="col-5">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="search...."
                aria-label="search....."
                aria-describedby="basic-addon2"
                onChange={(event) => setSearch(event.target.value)}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFYklEQVR4nO2d34tVVRTHPzZ57SXDoWdjFIugLEeipkGToIeUaCgj+mE/CIt+PUQvvfSDUqaijAhMggoroqGgBzWzzF4i+iX6DxQ2Y1NQM2PYjEqNNzassctin9vRO3Pv2vusD5yXmXvPWet8zzn77LXWXhccx3Ecx3GcvFkGbAA2Ax8CB4EfgXHghGzj8reD8pnw2Tvlu06LnAOsB7YDI0C9xW1Y9nUzsMDVKU8vsE2u9vocbePA68AKF6aYfmAHcHIOhahHtq+Aa12Y/1gKfFLixB0Fdsu4cBdwJbAEWATUZFskfwv/u1s+G77zV4n975TvVpZwAp8GjjU5SaPAS3L3zG/hWPNlHy/LPouONwU8JbZVinAlft/kxHwBXA90zcGxu4C1coyi438H9FARbgKOFJyIPfK4aRd9wOcFtkwAA2TOI8B0xPlfZFzoFDcAP0fsCi8Yj5Mh82SAjV2J7wHndtpAYCHwfoGNm8SHbNhcMIDehz3uL3jRCKJkwUMFz+dV2OUq4I+I3Y+RwQCux4xfgeXYZ7nY2mj7dMoD/QXAmHIovF1dTjpcEgnhTKT4SlyLzDOmjD+mirgmMqZ8m9rk8ZnI89fiAF6WByL+PElCsSl9RX1A+rwbueOTiH3pQOGIkXnGbMxTDivfQnTaNH2RWzskhHLh1oh/IWhplt2R2FRu7FU+7sJwpk9fPWGClRtXR+JdJjOP25Sh4UrKlS+Vr1sxWJCgJ1Ahn5Era5WvY9YKJ25RBo7OUXLJCmdHwiohTGSGd5RxL5I/W5TPb2EIXTcVBr7cWaV8PoQRLoxUh7RSkJAKtUg1S4hSdJwNyqgwF6kKe5Tvd2AwG5hNZq0Eg8r3ZzHAR8qocMdUhXuU70MY4IAyqp1lPNZid/sxwCFlVMgUVoUe5ftPGECnabupDucr33/HACeUUUmlNltkgfL9OAZwQTglSDgXHccfWZwSJNRydZwqD+pLLIZPDlQgKVU2WfUDBieGnaxibzf3Wqyu2aSMCqGUqvC8Rd91cPFTqsNnyvfbMcAyZdRkReYitUj4fTFGGE6pVmmWWK18DufADNuVcWHlbO68onx+E0Osr2CRw2/K51CJYiqmM27ZwFlmXWTNSM16oVxYB16VQrnXMMiKSJ+SkMDJjX7lY/D5IhJZihAW5efGvlSKrZE4Vl1toaoxF26L3B0rMc5OZfRhWeySOudJxwlzsasyIekpZXjokJA6Q5GIRBJL2pAWR/rRtZF0eTD1JgI1aXHU6MAxCTekxhrJlTf68nWKE9/FkfTun1ZXGxVwaWTCO5Zi44AZBhJurXFZZA3IP8B1JM6jkefvhPHH15qCJmtHc6nM1FnFmTEltEKyOIAfj9g7sx3JQZR5BaLMvBIvNDLPGGoiRHaiBB4uaPE3aqDF33BJMRpFyaLCZkDGkJiTe9u8HK4/Eps6XVGyuFN6pMVRkaP7JJ/SNUfJpXWREHrj9k2TzqnZilKTFkc6zKJfkbfIAstai8daLWlXnelr3KZkBn6WnOTKiYLEg3aUcHpS1vQNSoFan3y3u6HVeLf8rU8+MyilOpP/s++T8nKhy2ArKwoyduxqczP+aeBj4IomdlVaFCS0sjUSdqnP4haq1F8FLi5pU+VFmSmcCO0q3o5U2NfPYAvNDd4AbjzD8chFUSyVdeDPyQRuv/y80ZgslPlbAoEjEmkOP3n0gjQdm628hYtitC/YWNUmj9bpdVHs0eui2MNFMYiLYhAXxSAuikFcFIO4KAZxUQziohjERTGIi2IQF8UgpxO6f6LTxlaF3hIByfAL2o4RUVwMQ6K4GIZEcTEMDfQ+gDuO4ziO49Bp/gXDQUKWEGOlqAAAAABJRU5ErkJggg==" />
                </button>
              </div>
            </div>
          </div>
          <div className="col-7">
            <input
              className="d-none"
              type="file"
              name=""
              id="input_file"
              accept=".mp4,.mov,.avi"
              onChange={uploadFile}
            />
            <label className="btn btn-primary float-end" htmlFor="input_file">
              Upload
            </label>
          </div>
        </div>
      </div>
      <p className="videoCount">Video List ( {data.result.length} videos)</p>
      <div className="table-responsive">
        <table className="table analysis-table">
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" name="" id="" />
              </th>
              {Object.entries(tableHeader).map(function (header) {
                return (
                  <th key={header[0]} scope="col" style={{ width: header[1] }}>
                    <a>{Capitalize(header[0])}</a>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.result.map(function (element, ind) {
              setSearchData(element);
              if (searchQuery.length > 3) {
                var s = searchData.join(" ").toLocaleLowerCase();
                if (!s.includes(searchQuery.toLocaleLowerCase())) {
                  return <tr></tr>;
                }
              }
              searchData = [];
              return (
                <tr key={ind}>
                  <td>
                    <input
                      type="radio"
                      name="showData"
                      id=""
                      onClick={() => {selectVideo(ind);}}
                      defaultChecked={selectedIndex === ind ? true: false}
                    />
                  </td>
                  {Object.keys(tableHeader).map(function (index, i) {
                    return <TableRow key={i} data={element} index={index} />;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <span className="leftArrow" onClick={() => handleOpen()}></span>
      <animated.div style={springs} className="dataModal">
        <DataModal
          toggleIsOpen={handleOpen}
          tableData={data.result[selectedIndex]}
          videoData={videoData}
        />
      </animated.div>
    </>
  );
};

export default Alaysis;
