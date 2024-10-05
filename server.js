var mysql = require('mysql2')
const express = require('express')
const fs = require('fs')
//const crypto = require('crypto')
const { auth, requiresAuth } = require('express-openid-connect')
const dotenv = require('dotenv')

//dotenv.config()


/*const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

const app = express() 




//app.use(auth(config))
*/
const app = express()
var connection=mysql.createPool({
//  host:process.env.DB_HOST_URL, 
  //user:process.env.DB_ADMIN_USER, 
  //password:process.env.DB_ADMIN_PASSWORD, 
  //host: "localhost",
  //user: "root",
  //password: "password",
  //database:"cropdev",
//  port:3306, 
//  ssl:{
 //   ca:fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")
  //  }
  host: 'localhost', // Usually 'localhost' for local instances
  user: 'root',
  password: 'N0ns3ns3!',
  database: 'cropdev',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});


app.post('/currentDate', (req, res) => {
      const date = new Date()
      res.send(date.toISOString())
      res.status(200)
})

app.post('/', (req, res) => {      //once user is logged in, get their subscriber ID, and pass it to the app.
  let subscriber;
  const user = req.body["user"]
  connection.query("SELECT * FROM tbl_subscribers WHERE fld_s_EmailAddr = "+user.email, (err, results, fields) =>{
    if(err){
      res.send("no entity found")
      res.status(404)
    }else{
      subscriber = results
    }
    res.body = subscriber
    res.send()
    res.status(200)
  })
})

app.post('/user:home',(req,res)=>{
  /*
query to implement once build is ready
  const user = req.body["user"]
  const subscriber = req.body["subscriber"]
  connection.query("SELECT l.fld_l_LocationName, l.fld_l_LocationID, l.fld_s_SubscriberID_pk, c.fld_c_LocationID_fk, c.fld_ct_CropTypeID_fk, c.fld_CropImg, c.fld_c_CropName  FROM tbl_locations AS l INNER JOIN tbl_crops AS c ON  "+ results["subscriber"]["fld_s_SubscriberID"]+ " = c.fld_s_SubscriberID_pk, AND l.fld_s_SubscriberID_pk = l.=fld_s_SubscriberID_pk AND c.fld_l_LocationID_fk = l.fld_l_LocationID_pk;", (err, results, fields)=>{
  const hasAmbient = connection.query("SELECT fld_s_EmailAddr, fld_s_HasAmbientWeather, fld_s_AmbientWeatherKey FROM tbl_subscribers WHERE "+user.email+"=fld_s_EmailAddr;")
  userLocations.push(hasAmbient);
  res.send(JSON(userLocations));*/
  
  })*/

//query to test endpooint
   connection.query("SELECT * FROM tbl_crops", (err, results, fields)=>{ 
      if(err){
        res.send("entity not found")
        res.status(404)

      }else{
        res.json(results)
      }
    })
})

app.post('/user:cropspage', (req, res) =>{
  const user =req.body["user"]
  const userCrops = connection.query("SELECT  s.fld_s_SubscriberID_pk, c.fld_s_SubscriberID_pk, c.fld_c_CropName, c.fld_c_DatePlanted, c.fld_c_")
})

 /* 
app.get('/connect', (req, res) =>{

  connection.query('SELECT * FROM tbl_subscribers;', (error, results, fields)=>{
    if (error) throw error;
    res.json(results) 
  })
  res.status(200)
  res.send()
})*/

app.listen(3000)

