//imports
const {
  fetchMyIp,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");

//call fetchmyIP
// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log(`Error: ${error}`);
//   } else {
//     console.log(ip);
//   }
// });

// const ipTest = "23.17.131.142";

// //call fetchCoordsByIP
// fetchCoordsByIP(ipTest, (error, coords) => {
//   if (error) {
//     console.log(`Error: ${error}`);
//   } else {
//     console.log(coords);
//   }
// });

// const testCoord = { latitude: 51.0299, longitude: -114.0339 };

// //call fetchCoordsByIP
// fetchISSFlyOverTimes(testCoord, (error, coords) => {
//   if (error) {
//     console.log(`Error: ${error}`);
//   } else {
//     console.log(riseAndDuration);
//   }
// });

// const { nextISSTimesForMyLocation } = require("./iss");

// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   // success, print out the deets!
//   console.log(passTimes);
// });

const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});
