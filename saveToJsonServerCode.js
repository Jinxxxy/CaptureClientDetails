 var express = require("express");
 var app = express();
 var jsonFile = require("jsonfile");
 var fs = require("fs");
 var mdb = require("mongodb");
 const db = require("monk")("mongodb://localhost/27017");

 var itemNameFolderFinder = {
    "client":{
        tableName: "clientFiles",
        keyName: "personalData.clientRef"
    },
    "expenditure":"clientFiles",
    "UserData": {
        tableName:"userData",
        keyName:"userId"
    },
    "config":{
        tableName:"configFiles",
        keyName:"type"
    }
}

var getData = ((fileName, folderName)=>{
    var getDataPromise = new Promise((res,rej)=>{
        console.log(__dirname + "/src/app/" + folderName + "/" + fileName + ".json")
        fs.readFile(__dirname + "/src/app/" + folderName + "/" + fileName + ".json", "utf8", (err, data)=>{
            if(err){
                console.log(err);
                rej({
                    errorMessage:"Unable to retrieve file:" + err,
                    _fileName: fileName, 
                    callingFunction: getData.toString(),
                    failedTime: Date.now().toString()
                });
            } else {
                console.log(data);
                res(JSON.parse(data));
            }
        })


        /*try{
            var conn = new XMLHttpRequest();
            conn.open("GET", "http://localhost:5000/src/app/JSONFiles/" + folderName + "/" + fileName + ".json", true);
            conn.onload = (()=>{
                console.log(conn.response);
                res(conn.response);
            });
            conn.onerror = (()=>{
                rej({
                    errorMessage:"Unable to retrieve file:" + conn.response,
                    _fileName: fileName, 
                    callingFunction: getData.toString(),
                    failedTime: Date.now().toString()
                })
            })
            conn.send()
        }
        catch(err){
            console.log(err);
        }*/
    })   
    return getDataPromise
});
var removeFrequencyString = ((itemArray)=>{
    for(var item in itemArray){
        delete itemArray[item]["frequencyString"];
    }
});
function getLatestClientRef(){
    //WARNING HACK ALERT!!!
    var path = './src/app/clientFiles';
    var fileArray = [];
    fs.readdir(path, (files)=>{
        for(var file in files){
            console.log(file)
            console.log(typeof file)
            fileArray.push(file);
        }
        return fileArray;
    })
}
function createClientData(wholeObject){
    getLatestClientRef();
    //Name of file to find 
    var fileName = wholeObject.fileId.toString();
    //Converted itemName above to a folder name for file. Uses object 'itemNameFolderFinder'. Potentially move out to a config file for ease.
    var folderFinder = itemNameFolderFinder[wholeObject.type];
    var createFilePromise = new Promise((resolve, reject)=>{
        fs.writeFile(fileName, wholeObject.passedData, (err)=>{
            if(err){
            resolve("File couldn't be created: \n" + err)
            }
            resolve("File Created")
        });
        
    })
    return createFilePromise;
}

var numberOfRequests = 0;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/", function(req, res) {
    numberOfRequests++;
     console.log(numberOfRequests)
     console.log(req.url)     
     var wholeObject = JSON.parse(decodeURI(req.url.replace("/?","")));
     var fileName = wholeObject["fileId"];
     var tableName = itemNameFolderFinder[wholeObject.type]
     db.get(tableName).find({"personalData.clientRef": fileName}).then((results)=>{
        res.json(results);
     })
});

function updateClientData(wholeObject){
    //Name of file to find 
    var fileName = wholeObject.fileId.toString();
    //Converted itemName above to a folder name for file. Uses object 'itemNameFolderFinder'. Potentially move out to a config file for ease.
    var folderFinder = itemNameFolderFinder[wholeObject.type];
    //Gets a promise to return the file using the parameters above. Will then replace sections of JSON to update the file. 

    var getDataPromise = getData(fileName, folderFinder).then((returnedObject)=>{        
        var file = './src/app/' + folderFinder + "/" + fileName + "" + '.json';
        jsonFile.writeFile(file, wholeObject.passedData, ((err)=>{
            if(err){
                return(err);
                console.log(err);
            } else {
                return("Item Updated");
                console.log("Item Updated");
            }            
        }))
     }).catch((errorObject)=>{
         return(errorObject)
         console.log(errorObject)
     })
     return getDataPromise;
}
app.post("", function(req, res) { 
    console.log(req.body)
    console.log("RAWR")
    var wholeObject = JSON.parse(decodeURI(req.url.replace("/?",""))); 
    console.log(wholeObject);
    //Potentially move to single function to decide response method. 
    if(wholeObject.crud === "u"){
        var resPromise = updateClientData(wholeObject);
        resPromise.then((response)=>{
            res.send(response);
        })
    } else if(wholeObject.crud === "c"){
        var resPromise = createClientData(wholeObject);
        resPromise.then((response)=>{
            res.send(response);
        })
    }
    
});
 /* serves all the static files */
app.get(/^(.+)$/, function(req, res){ 
     res.send(req.url);
     var wholeObject = JSON.parse(decodeURI(req.url.replace("?","")));
     var fileName = Object.keys(wholeObject)[0];
     var dataToSave = wholeObject[fileName]
     console.log("This one?")
     console.log(fileName);
     console.log(dataToSave);
     var file = fileName + '.json';
     jsonFile.writeFile(file, dataToSave, ((err)=>{
         if(err){
            console.log(err)
        }
     }))
     
});
var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log("Listening on " + port);   
//    mdb.MongoClient.connect("mongodb://localhost/27017"), (err, db)=>{
//         if(err){
//             console.log(err)
//         } else {
//             var dbcoll = db.collection("clientData");
//             _db = db;
//             // dbcoll.find({"personalDetails.clientRef":2000002}).toArray().then((results)=>{
//             //     console.log(results)
//             // })
//         };
//     }
//     _db.collection("clientData").find().toArray().then((results)=>{
//         console.log(results)
//     })

   db.get("configFiles").find({}).then((result)=>{
       console.log(result)
   })
   
   
});