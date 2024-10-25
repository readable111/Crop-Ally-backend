const mysql = require('mysql2')
const {DefaultAzureCredential, ClientSecretCredential} = require('@azure/identity')
const express = require('express')
const fs = require('fs')
//const crypto = require('crypto')
const { auth, requiresAuth } = require('express-openid-connect')
const dotenv = require('dotenv')

// Uncomment the following lines corresponding to the authentication type you want to use.
// for system-assigned managed identity
/*
const mysqlConnectionMiddleWare = async (req, res) =>{
  try{ 
    const credential = new DefaultAzureCredential();

    var accessToken =  await credential.getToken('https://ossrdbms-aad.database.windows.net/.default');
    if(!accessToken || !accessToken.token){
      throw new Error("Failed to receive access token")

    }


    const connection = mysql.createPool({
    host: process.env.AZURE_MYSQL_HOST,
    user: process.env.AZURE_MYSQL_MYSQL_1ABFF_USER,
    password: accessToken.token,
    database: process.env.AZURE_MYSQL_DATABASE,
    port: process.env.AZURE_MYSQL_PORT,
    ssl: {
      ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")
    }
});

  req.dbConnection = connection
}catch(error){
      console.log("Error Acquiring Azure access token or connecting to mysql:" , error)
      res.status(500).send("Error Acquiring Azure access token or cennecting to mySQL")
  }
}

/*const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};
*/




//app.use(auth(config))
const app = express()

app.get('/', (req, res)=>{
  res.send("is this thing on?")
})

app.listen(process.env.PORT)
/*
app.use(mysqlConnectionMiddleWare)
app.get('/currentDate', (req, res) => {
      const date = new Date()
      res.send(date.toISOString())
      res.status(200)
})

app.get('/', (req, res)=>{
  res.send("app working")
})

/*app.post('/', (req, res) => {      //once user is logged in, get their subscriber ID, and pass it to the app.
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
})*/

/*

app.get('/editprofile/:subID', (req, res)=>{
    const subID = req.params.subID

    //QUERY FOR ALL FIELDS ON MATCHING SUBid
    req.dbConnection.query("SELECT * FROM tbl_subscribers WHERE fld_s_SubscriberID_pk = "+subID, (err, res, fields)=>{
      if(err){
        res.send("entity not found")
        res.status(404)
      }else{
        res.json(res)
        res.status(200)
      }
  })
})

app.get('/home/:id',(req,res)=>{
  /*
query to implement once build is ready
  connection.query("SELECT l.fld_l_LocationName, l.fld_l_LocationID, l.fld_s_SubscriberID_pk, c.fld_c_LocationID_fk, c.fld_ct_CropTypeID_fk, c.fld_CropImg, c.fld_c_CropName  FROM tbl_locations AS l INNER JOIN tbl_crops AS c ON  "+ results["subscriber"]["fld_s_SubscriberID"]+ " = c.fld_s_SubscriberID_pk, AND l.fld_s_SubscriberID_pk = l.="+subID+" AND c.fld_l_LocationID_fk = l.fld_l_LocationID_pk;", (err, results, fields)=>{
  
  })*/

//query to test endpooint
/*
const subID = req.params.id
   connection.query("SELECT * FROM tbl_crops WHERE fld_s_SubscriberID_pk = "+subID, (err, results, fields)=>{ 
      if(err){
        res.send("entity not found")
        res.status(404)

      }else{
        res.json(results)
      }
    })
})


app.get('/cropspage:id', (req, res) =>{
  const subID = req.params.id
  const userCrops = connection.query("SELECT * FROM tbl_crops WHERE fld_s_SubscriberID_pk = "+subID, (err, res, fields) =>{
    if(err){
      res.send("entity not found")
      res.status(404)
    }else{
      res.json(results)
    }
  })
})


app.get('/user/:id/viewcrop/:cid', (req, res)=>{


})

app.post('/addcrop', (req, res) =>{
  const subID = req.body.subID
  const cropData = req.body.cropData

  connection.query("INSERT INTO tbl_crops(fld_c_CropID_pk, fld_s_SubscriberID_pk, fld_c_ZipCode, fld_c_State, fld_f_FarmID_fk, fld_m_MediumID_fk, fld_l_LocationID_fk, fld_ct_CropTypeID_fk, fld_CropImg, fld_c_HRFNumber, fld_c_CropName, fld_c_Variety, fld_c_Source, fld_c_DatePlanted, fld_c_Comments, fld_c_Yeild, fld_c_WasStartedIndoors, fld_c_isActive")// finish said query
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

//app.listen(process.env.PORT)

