"use strict";
// import all the packages and modules 
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// main code 
let PORT = 3000;
app_1.myServer.listen(PORT, function () {
    console.log(`Server is running @ http://localhost:${PORT} ...✅`);
});
// export code 
