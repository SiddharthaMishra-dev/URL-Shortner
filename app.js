const express=require("express")
const bodyParser=require("body-parser")
const { urlencoded } = require("body-parser")
const ejs = require("ejs");
const app=express()

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))


let shortened="Enter URL"

app.get("/",function(req,res){
    res.render('home',{
        shortened:shortened
    })

})
app.post("/",function(req,res){
    async function requestURL(){
        const response=await fetch("https://gotiny.cc/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input: `${req.body.url}` }),
          })
        const result = await response.json()
        shortened=`gotiny.cc/${await result[0].code}`
        res.redirect("/")
    }
    requestURL()


    
})

app.listen(3000,function(){
    console.log("Server is listening on port 3000")
})
