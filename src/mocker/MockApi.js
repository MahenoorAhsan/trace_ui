var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet("/trace/extract_record", { params: { video_no: 12345 }}).reply(200, {
  data: {
    "video_no": null,
    "url": null,
    "type": null,
    "name": "C031-011.mp4",
    "resolution": "1280 x 720 Pixels",
    "frame_rate": 37,
    "distortion_score": 26.93,
    "watermark": "Bindusathyan Install MX T: k to earn up to  1 000 TakaTak ID: bindusatyan a AKsi Install MX TakaTak to earn up to 1 000: TakaTak  0: bindugats   MxTaketak",
    "aspect_ratio": true,
    "duration": 12.0,
    "em_sadness": "0.9875613451004028",
    "em_others": "0.004298894666135311",
    "em_fear": "0.0022293911315500736",
    "em_disgust": "0.0019091528374701738",
    "em_surprise": "0.001672548009082675",
    "em_joy": "0.001193670672364533",
    "em_anger": "0.0011349424021318555",
    "ht_hateful": "0.009115630760788918",
    "ht_targeted": "0.005900657270103693",
    "ht_aggressive": "0.002460411051288247",
    "height": 1280,
    "width": 720,
    "status": "Completed"
},
});

export default axios;