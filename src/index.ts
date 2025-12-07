// import all the packages and modules 

import { myServer } from "./app";

// main code 

let PORT:number = 3000  ;

myServer.listen(PORT , function():void{

    console.log(`Server is running @ http://localhost:${PORT} ...✅`) ;

}) ;

// export code 