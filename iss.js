const request = require("request");

//fetch IP******************************
const fetchMyIp = function (callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error.code, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

//fetchCoordsByIP******************************
const fetchCoordsByIP = function (ip, callback) {
  request("https://freegeoip.app/json/" + ip, (error, response, body) => {
    if (error) {
      callback(error.code, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching longitude and latitude. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    data = JSON.parse(body);
    const coords = { latitude: data.latitude, longitude: data.longitude };
    callback(null, coords);
  });
};

//fetchISSFlyOverTimes******************************
const fetchISSFlyOverTimes = function (coords, callback) {
  request(
    `https://api.n2yo.com/rest/v1/satellite/radiopasses/25544/${coords.latitude}/${coords.latitude}/0/5/40/&apiKey=4LM6PK-QQE7FE-GHQ78B-4QDC`,
    (error, response, body) => {
      if (error) {
        callback(error.code, null);
        return;
      }

      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching fly over times. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      passes = JSON.parse(body).passes.slice(0, 5);
      let nextPasses = [];
      for (pass of passes) {
        let objPass = {};
        objPass["risetime"] = pass.startUTC;
        objPass["duration"] = pass.endUTC - pass.startUTC;
        nextPasses.push(objPass);
      }
      callback(null, nextPasses);
    }
  );
};

//nextISSTimesForMyLocation******************************
const nextISSTimesForMyLocation = function (callback) {
  fetchMyIp((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
