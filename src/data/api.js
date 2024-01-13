const BASE_API_URL = process.env.REACT_APP_API_BASE_URL || "https://traces.neurologicai.com/";

export async function getTableData() {
  try{
    var res = await fetch(
      // "http://64.120.30.97:5000/trace/get_table_of_contents",
      `${BASE_API_URL}/trace/get_table_of_contents`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0cmFjZSIsIm5hbWUiOiJmeF90cmFjZV91c2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ.Yex2anJ9wbxVw22OWmZ8KpvapVlcb11LASajgiHURMs",
          Cookie:
            "session=.eJw1zssKgkAYQOF3mXWIDhjZLizrt1TSHMtNjOOU4x2svETvnhJtD9_ivBFljDfN9VFlvERLxHszibZMOMIEfwDFFtBA6apMhzlk9ZnopiaNaIgDmJDMCiMNvREVahIF_tQKbmi_TjSFYdKDaAUNDBnSqrNPG2yllmqtob8dpQvvMC1NrY060mLsBEW42NcvWpOcRYpyWHk0vYud71oNmiER_0fLZ55_vjc1QOM.ZEYD-g.d7HkNIqhb3mbzYavbOvmi4Z5_Wk",
        },
      }
    );
    var data = await res.json();
    return data;
  }catch(e){
    alert(e);
  }
  return false;
  
}

export async function getVideoData(name) {
  try{
    var res = await fetch(
      // `http://64.120.30.97:5000/trace/get_video_info?filename=${name}`,
      `${BASE_API_URL}/trace/get_video_info?filename=${name}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0cmFjZSIsIm5hbWUiOiJmeF90cmFjZV91c2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ.Yex2anJ9wbxVw22OWmZ8KpvapVlcb11LASajgiHURMs",
          Cookie:
            "session=.eJw1zssKgkAYQOF3mXWIDhjZLizrt1TSHMtNjOOU4x2svETvnhJtD9_ivBFljDfN9VFlvERLxHszibZMOMIEfwDFFtBA6apMhzlk9ZnopiaNaIgDmJDMCiMNvREVahIF_tQKbmi_TjSFYdKDaAUNDBnSqrNPG2yllmqtob8dpQvvMC1NrY060mLsBEW42NcvWpOcRYpyWHk0vYud71oNmiER_0fLZ55_vjc1QOM.ZFEfHg.sfH5ckCHdp-cC64wakQ1YHyh4gc",
        },
      }
    );
    var data = await res.json();
    return data;
  }catch(e){
    alert(e);
  }
  return false;
}

export function processData(videoData){
    let section ={};
    let audio_highlight = [];
    let video_highlight = [];
    let table_contents = [];
    for(var i = 0; i<=10; i++){
        section[i*videoData.AUDIO_AUDIT.SEGMENT_DURATION]= '';
    }
    videoData.TABLE_OF_CONTENTS.forEach((element, idx) => {
      let key = Math.floor(element.TIME/videoData.AUDIO_AUDIT.SEGMENT_DURATION) * videoData.AUDIO_AUDIT.SEGMENT_DURATION;
      element.INDEX = idx+1;
      if(element.KEY == "SENTIMENT_EMOTION"){
        audio_highlight[key] = element;
      }
      if(element.KEY == "SCENE_OBJECT" ){
        video_highlight[key] = element;
      }
      table_contents.push(element);
    });
    return {audio_highlight, video_highlight, table_contents};
}


export function capitalizeWord(text){
  text = text.toLowerCase();
  text = text.replace(/_/g, ' ');
  var textArr = text.split(' ');
  for (var i = 0; i < textArr.length; i++) {
    textArr[i] = textArr[i].charAt(0).toUpperCase() + textArr[i].slice(1);
  }
  return textArr.join(' ');
}