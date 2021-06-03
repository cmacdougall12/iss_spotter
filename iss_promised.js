const request = require("request-promise-native");

//fetch IP******************************
const fetchMyIp = function () {
  return request("https://api.ipify.org?format=json");
};

//fetchCoordsByIP******************************
const fetchCoordsByIp = function (body) {
  return request(`https://freegeoip.app/json/${JSON.parse(body).ip}`);
};

const fetchISSFlyOverTimes = function (body) {
  data = JSON.parse(body);
  const coords = { latitude: data.latitude, longitude: data.longitude };
  return request(
    `https://api.n2yo.com/rest/v1/satellite/radiopasses/25544/${coords.latitude}/${coords.latitude}/0/5/40/&apiKey=4LM6PK-QQE7FE-GHQ78B-4QDC`
  );
};

//convert function to adjust to another API. Original API not available
const convert = function (body) {
  passes = JSON.parse(body).passes.slice(0, 5);
  let nextPasses = [];
  for (pass of passes) {
    let objPass = {};
    objPass["risetime"] = pass.startUTC;
    objPass["duration"] = pass.endUTC - pass.startUTC;
    nextPasses.push(objPass);
  }

  return nextPasses;
};

//Add all above functions to nextISSTimesForMyLocation
const nextISSTimesForMyLocation = function () {
  return fetchMyIp()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then(convert)
    .then((data) => {
      // const { response } = JSON.parse(data);
      return data;
    });
};

module.exports = { nextISSTimesForMyLocation };
