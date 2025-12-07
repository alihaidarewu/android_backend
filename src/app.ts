// import all the packages and modules 

import express,{Application,Request,Response,NextFunction} from "express" ;
import cors from "cors" ;
import morgan from "morgan";

import http from "http" ;

import db from "./config/database.config"

// main code 

let app:Application = express() ;
let myServer = http.createServer(app) ;

// connect with server 

app.use(express.urlencoded({extended:true})) ;
app.use(express.json()) ;

app.use(cors()) ;
app.use(morgan("dev")) ;

// Request-Response Cycle 

app.get("/" , function(req:Request , res:Response):Response{

    return res.status(200).json({

        status : 200 ,
        message : "Home Page" ,
        data : ""

    }) ;

}) ;


app.get("/data" , function(req:Request,res:Response):void{

    try
    {

        db.query("SELECT * FROM students", (err, results) => {

            if (err) return res.status(500).json({ error: err.message });

            res.json(results);
        });

    }
    catch(err:unknown)
    {
        res.status(400).json({

            status : 400 ,
            message : "Find Error To Connect Database"

        });
    }

});


app.post("/data" , function(req:Request,res:Response):void{

    try
    {
        const { id, name, mark } = req.body;

        const sql = "INSERT INTO students (id, name, mark) VALUES (?, ?, ?)";

        db.query(sql, [id, name, mark], (err, result) => {

            if (err) return res.status(500).json({ error: err.message });

            res.json({ message: "Data inserted successfully" });
        });
    }
    catch(err:unknown)
    {
        res.status(400).json({

            status : 400 ,
            message : "Find Error To post data on Database"

        });
    }

})

// Handle Server Error 

app.use(function(req:Request,res:Response,next:NextFunction):Response{

    return res.status(404).json({

        status : 404 ,
        message : "Page Not Found"

    }) ;

}) ;

app.use(function(err:unknown , req:Request,res:Response,next:NextFunction):Response{

    if(err instanceof Error)
    {
        return res.status(404).json({

            status : 404 ,
            message : "Page Not Found" ,
            error : err.message

        }) ;
    }
    else
    {
        
        return res.status(404).json({

            status : 404 ,
            message : "Page Not Found" ,
            error : err

        }) ;
    }

}) ;

// export code 

export {myServer}
