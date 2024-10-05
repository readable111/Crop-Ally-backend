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
  var connection=mysql.createConnection({
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
  password: 'password',
  database: 'cropdev'
});
connection.connect();

//app.get('/profile',requiresAuth(),(req, res)=> {
//    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//});

app.get('/currentDate', (req, res) => {
      const date = new Date()
      res.send(date.toISOString())
      res.status(200)
})
app.get('/', (req, res) => {
  res.send("Hello World")
})

app.get('/user:home',(req,res)=>{
 // connection.query("SELECT * FROM tbl_subscribers;", (error, results, fields)=>{
    const user = req.body["user"]
    const subscriber = connections.query("SELECT fld_s_SubscriberID_pk fld_s_EmailAddr FROM tbl_subscribers WHERE fld_s_EmailAddr = "+user.email)
    const userLocations = connection.query("SELECT l.fld_l_LocationName, l.fld_l_LocationID, l.fld_s_SubscriberID_pk, c.fld_c_LocationID_fk, c.fld_ct_CropTypeID_fk, c.fld_CropImg, c.fld_c_CropName  FROM tbl_locations AS l INNER JOIN tbl_crops AS c ON  "+ subscriber["fld_s_SubscriberID"]+ " = c.fld_s_SubscriberID_pk, AND l.fld_s_SubscriberID_pk = l.=fld_s_SubscriberID_pk AND c.fld_l_LocationID_fk = l.fld_l_LocationID_pk;")
    const hasAmbient = connection.query("SELECT fld_s_EmailAddr, fld_s_HasAmbientWeather, fld_s_AmbientWeatherKey FROM tbl_subscribers WHERE "+user.email+"=fld_s_EmailAddr;")

    userLocations.push(hasAmbient);
    res.send(JSON(userLocations));
  //})
})

app.get('/user:cropspage', (req, res) =>{
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

