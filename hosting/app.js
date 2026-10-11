/* eslint-disable @typescript-eslint/no-require-imports */
// Startup file for the hosting's Node.js app. The site itself is in ./app,
// one level down, because the hosting keeps its own node_modules link in
// this folder and won't accept a real one here.
const path = require("path");

process.env.NODE_ENV = "production";
process.chdir(path.join(__dirname, "app"));
require("./app/server.js");
