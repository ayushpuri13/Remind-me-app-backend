const express=require('express');
var app= express();
var auth =require('./Routes/auth.js');
var mongoose =require('mongoose');
var bodyParser =require('body-parser');
var port=process.env.PORT || 3000;
var cors =require('cors');

//----------Config-----//
app.use(bodyParser.json());


app.use(cors());




//-----------database connection---------//


var mongoDB='mongodb+srv://Ayush:Waheguru123@cluster0-bw6nq.mongodb.net/remind-me-app?retryWrites=true&w=majority';


mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//------------Routes-------------//

app.use('/api/v1/auth',auth);





app.listen(port,()=>console.log('Example app listening'))