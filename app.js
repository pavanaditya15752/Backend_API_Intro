
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query=req.body.cityInput;
  const url='https://api.openweathermap.org/data/2.5/weather?q='+query+'&units=metric&appid=17a74b0fdb8f362d16a45f3e1a9e4e32';
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherdata=JSON.parse(data);
      const temp=weatherdata.main.temp;
      const icon=weatherdata.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p> The current weather conditions is "+weatherdata.weather[0].description+"</p>");
      res.write("<p> The current temperature at "+query+" is "+temp+" celcius");
      res.write("<img src="+imageURL+">");
      res.send();
    })
  })
})

app.listen(3000,function(){
  console.log("running on 3000")
})
