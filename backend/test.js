const http = require("http");

const data = JSON.stringify({
  title: "Dashboard becomes blank after login",
  description:
    "The user can successfully log in, but after authentication the dashboard becomes completely blank.",
  environment: "React, Chrome, Windows 11"
});

const options = {
  hostname: "localhost",
  port: 5000,
  path: "/api/analyze",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let result = "";

  res.on("data", (chunk) => {
    result += chunk;
  });

  res.on("end", () => {
    console.log("Status:", res.statusCode);
    console.log("Response:");
    console.log(result);
  });
});

req.on("error", (error) => {
  console.error("Error:", error.message);
});

req.write(data);
req.end();