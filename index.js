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
  console.log(req.params.date);
  (req.params.date)

  if (req.params.date.match(/^\d+$/) != null) {
    console.log("Received a UNIX timestamp!");
    res.json(convertUNIXToDate(req.params.date));
    return;
  }

  console.log("Not a UNIX timestamp.");

  // Reject if we receive an invalid date.
  if (!validateDate(response_value)) {
    res.json({error: "Invalid Date"});
  }

  res.json(convertDateToJSON(response_value));
});

function convertUNIXToDate(unix) {
  let date = new Date(Number(unix));
  return { unix, utc: date.toUTCString() };
}

function convertDateToJSON(date) {
  return { unix: date.valueOf(), utc: date.toUTCString() }
}

function validateDate(date) {
  if (date == "Invalid Date") return false;
  return true;
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});