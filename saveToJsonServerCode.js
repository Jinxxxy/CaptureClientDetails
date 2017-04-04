var express = require("express");
var app = express();
var mdb = require("mongodb");
const db = require("monk")("mongodb://127.0.0.1/clientDataCollection");
var exec = require('child_process').exec;
var numberOfRequests = 0;
var itemNameFolderFinder = {
    "client":{
        tableName: "clientData",
        keyName: "personalDetails.clientRef",
        lastUpdatedDate: true
    },
    "user": {
        tableName:"userData",
        keyName:"userId",
        
    },
    "config":{
        tableName:"configFiles",
        keyName:"type"
    },
    "calcResult":{
        
    }
}

function decisionLogicCode(userData){
    //This is where the decision logic code will be placed. 
    return "DMP"
}

function removeFrequencyString(itemArray){
    for(var item in itemArray){
        delete itemArray[item]["frequencyString"];
    }
};


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function parseObject(urlString){
    return JSON.parse(decodeURI(urlString.replace("/?","")));
}
function forEachRequest(reqObject){
     numberOfRequests++;
     console.log(numberOfRequests)
     console.log(reqObject.url);
}
function getData(){

}
app.get("/", function(req, res) {
     //Used no matter the request type.
     forEachRequest(req);
     var wholeObject = parseObject(req.url);
     console.log(wholeObject)
     var requestConfig = itemNameFolderFinder[wholeObject.type];

     //From here it becomes method specific.
     if(requestConfig === "newClient"){
          
     } else if(wholeObject.type === "calcResult"){
        var resultType = decisionLogicCode(wholeObject);
        db.get("resultObjects").find({},{"solutions.DMP":1}).then((results)=>{
            console.log(results)
            res.send(results);
        })
     } else {
        //Transfer and implement this in the getData function - Already created above.
        var fileName = wholeObject["fileId"]

        // console.log(requestConfig)
        var folderName = requestConfig.tableName.toString();
        // console.log(folderName)
        var _keyName = requestConfig.keyName.toString();
        // console.log(_keyName)
        if(folderName === "userData"){
            projection = {}
            fileName = parseInt(fileName);
        }
        var _blankFindObject = {};

        _blankFindObject[_keyName] = fileName;
        // console.log(_keyName)
        //Tidy this bit up
        var projection = {"data":1}

        // console.log(projection)
        // console.log(db)
        // console.log(
        // "findObject: " 
        // )
        // console.log(_blankFindObject)
        // console.log(" Projection: "); 
        // console.log(projection);
        db.get(folderName).find(_blankFindObject,projection).then((results)=>{
            console.log(results)
            if(Object.keys(results).length > 0){
                // console.log("Results: ")
                // console.log(results)
                res.json(results);
            } else {
            console.log("Else: " + results)
                res.send({
                    error: true,
                    errorMessage: "Unable to find data", 
                    requestType: folderName 
                })
            }
        }).catch((err)=>{
            res.send({
                error: true,
                errorMessage: "An error occured while getting your data: " + err, 
                requestType: folderName 
            })
        })
     }
     

});
app.post("", function(req, res) { 
    forEachRequest(req);
    var wholeObject = parseObject(req.url);
    var fileName = wholeObject["fileId"]
    var requestConfig = itemNameFolderFinder[wholeObject.type];
    var folderName = requestConfig.tableName.toString();
    var _keyName = requestConfig.keyName.toString();
    var _findObject = {};
    _findObject[_keyName] = fileName;
    console.log(wholeObject.passedData)
    var swapsy = JSON.parse(JSON.stringify(wholeObject.passedData).replace("'","\""));
    db.get(folderName).update(_findObject,swapsy).then((results)=>{
        console.log("Update Completed.")        
        res.send(
            {
                error: false,
                errorMessage: null, 
                returnMessage: 'Data successfully saved!'
            }
        )
     }).catch((err)=>{
        console.log(wholeObject.passedData)
        console.log(err)
        res.send(
            {
                error: true,
                errorMessage: err, 
                returnMessage: 'Unable to save data'
            }
        )
     })    
});
 /* serves all the static files */
app.get(/^(.+)$/, function(req, res){ 
         
});

var port = process.env.PORT || 5000;
    app.listen(port, function() {
    console.log("Listening on " + port);
//    var client = mdb.connect("mongodb://127.0.0.1/clientDataCollection", (err,_db)=>{
//       
//    });

   
});