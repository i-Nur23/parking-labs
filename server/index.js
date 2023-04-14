var express = require("express")
var http = require("http")
var path = require("path")
const {urlencoded} = require("express");

app = express();

places = [
  {
    "name" : "A1",
    "isFree" : 0,
    "tags" : ["A", "B", "C"]
  },
  {
    "name" : "A2",
    "isFree" : 0,
    "tags" : ["B", "C"]
  },
  {
    "name" : "A3",
    "isFree" : 0,
    "tags" : ["B", "C"]
  },
  {
    "name" : "A4",
    "isFree" : 1,
    "tags" : ["D", "E"]
  },
  {
    "name" : "A5",
    "isFree" : 1,
    "tags" : ["D", "E"]
  },
  {
    "name" : "B1",
    "isFree" : 1,
    "tags" : ["C", "D"]
  },
  {
    "name" : "B2",
    "isFree" : 0,
    "tags" : ["C", "D", "E"]
  },
  {
    "name" : "B3",
    "isFree" : 0,
    "tags" : ["B", "C"]
  },
  {
    "name" : "B4",
    "isFree" : 0,
    "tags" : ["A", "B"]
  },
  {
    "name" : "B5",
    "isFree" : 0,
    "tags" : ["A"]
  },
  {
    "name" : "C1",
    "isFree" : 1,
    "tags" : ["A"]
  },
  {
    "name" : "C2",
    "isFree" : 1,
    "tags" : ["B", "C"]
  },
  {
    "name" : "C3",
    "isFree" : 0,
    "tags" : ["B", "C"]
  },
  {
    "name" : "C4",
    "isFree" : 0,
    "tags" : ["D", "E", "F"]
  },
  {
    "name" : "C5",
    "isFree" : 1,
    "tags" : ["E", "F"]
  }
]

app.get("/places.json", (req, res) => {
  res.json(places)
})

app.get("/organisedPlaces.json", (req, res) => {
  var arrayOfTags = [];
  places.forEach(place => {
    place.tags.forEach(tag => {
      if (arrayOfTags.indexOf(tag) == -1) {
        arrayOfTags.push(tag)
      }
    })
  })

  var tagObjects = arrayOfTags.map(tag => {
    var tagPlaces = [];
    places.forEach(place => {
      if (place.tags.indexOf(tag) !== -1) {
        tagPlaces.push(place.name)
      }
    });
    return {"name" : tag, "places" : tagPlaces};
  })

  res.json(tagObjects);
})

app.patch("/places/:name", (req, res) => {
  var name = req.params.name;
  var place = places.find(p => p.name == name);
  if(place){
    place.isFree = !place.isFree;
    res.send("OK")
  } else {
    res.send("NOT OK")
  }
})

app.post("/newPlace", (req, res) => {
  var body = req.body;
  var name = body.name;
  var tags = body.tags;
  var place = places.find(p => p.name == name);
  if(!place){
    places.push({name : name, isFree : 1, tags : tags})
    res.json({success : true, description : ""});
  } else {
    res.json({success : false, description : "Такое место уже есть"});
  }
})

app.use(express.static(path.dirname(__dirname) + "/client"))
app.use(express.urlencoded())
http.createServer(app).listen(3000);