const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const postsRouters = require("./routes/posts");

mongoose.connect('mongodb+srv://paul:jsdBGmshQx1gN25N@cluster0-zxpeg.mongodb.net/node-angular?retryWrites=true', { useNewUrlParser: true })
  .then(()=>{
    console.log('Connected to database');
  })
.catch(()=>{
  console.log('Connection failed')
});

// This is to extract the data from the post request. The post request has a body = data. So by using the bodyParser we are able to extract that
// data by automatically extracting that data and add it as a new field to the res object which we can access .
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); // this will parse url encoded data. We do not need it.

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();                                           // This error popped up due to the fact that the server and client are operating on different domains.
});
app.use("/api/posts", postsRouters);
module.exports = app;
