// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// Provide current date when blank API call received.
app.get("/api", function (req, res) {
  res.json(convertDateToJSON(new Date()));
});

// Convert valid dates and UNIX time codes to time stamp JSON object.
app.get("/api/:date", function(req, res) {
  let response_value = new Date(req.params.date);

  // Handle an input of just digits as a unix timestamp.
  if (isUnixTime(req.params.date)) {
    console.log("Received a UNIX timestamp!");
    res.json(convertUNIXToDate(req.params.date));
    return;
  }

  console.log("Not a unix date.");

  // Reject if we receive an invalid date.
  if (!validateDate(response_value)) {
    // console.log("Received an invalid date.");
    res.json({error: "Invalid Date"});
    return;
  }

  console.log("Not an invalid date.");

  // Convert valid dates into the timestamp response object.
  res.json(convertDateToJSON(response_value));
});

// Check to see if input is only digits, which we treat as a UNIX timestamp.
function isUnixTime(input) {
  console.log(`Checking ${input} to see if only integer.`);
  if (/^[0-9]+$/.test(input)) {
    console.log("Integer only.");
    return true;
  }
  console.log("Mixed string.");
  return false;
}

// Create the response object for unix dates.
function convertUNIXToDate(unix) {
  let date = new Date(Number(unix));
  return { unix, utc: date.toUTCString() };
}

// Create response object for valid dates.
function convertDateToJSON(date) {
  return { unix: date.valueOf(), utc: date.toUTCString() }
}

// Simple checking if date input was not purely digits.
function validateDate(date) {
  if (date == "Invalid Date") return false;
  return true;
}

// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});