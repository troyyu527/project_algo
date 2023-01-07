const express = require("express");
const app = express();

const data = require('./input_data/data.json');
const algo = require('./input_data/algo.json');

//setting view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

//route for index page
app.get("/", function (req, res) {
  res.render("index", {
    data: data,
    algo: algo,
  });
});
//route for data page
app.get("/:datapage", function (req, res) {
  const {datapage} = req.params;
  data.forEach(data=>{
    const type = "data"
    if(datapage==data.name) res.render("datapage",{datapage,type});
  })
  algo.forEach((algo,i)=>{
    const type = i===0?"sort":"algo"
    algo.sub.name.forEach(name=>{
      if(datapage==name) res.render("datapage",{datapage,type});
    })
    
  })

});

app.listen(process.env.PORT || 8080, function () {
  console.log("Server is running on port 8080 ");
});

