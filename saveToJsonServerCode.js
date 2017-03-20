 var express = require("express");
 var app = express();
 var jsonFile = require("jsonfile");
 var fs = require("fs");
 var mdb = require("mongodb");
 const db = require("monk")("mongodb://127.0.0.1/27017");

 var itemNameFolderFinder = {
    "client":{
        tableName: "clientData",
        keyName: "personalDetails.clientRef"
    },
    "expenditure":"clientFiles",
    "user": {
        tableName:"userData",
        keyName:"userId"
    },
    "config":{
        tableName:"configFiles",
        keyName:"type"
    }
}

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
function getData(fileName, folderName){
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
    })   
    return getDataPromise
};
function removeFrequencyString(itemArray){
    for(var item in itemArray){
        delete itemArray[item]["frequencyString"];
    }
};
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
     db.get("configFiles").find({}).then((results)=>{
         console.log(results)
     })
     var wholeObject = JSON.parse(decodeURI(req.url.replace("/?","")));
     console.log(wholeObject);
     var fileName = wholeObject["fileId"]
     console.log(fileName);
     var requestConfig = itemNameFolderFinder[wholeObject.type];
     var folderName = requestConfig.tableName.toString();
     console.log(requestConfig)
     var _keyName = requestConfig.keyName.toString();
     console.log(requestConfig.keyName)
     console.log(fileName)
     var f = {};
     f[_keyName] = fileName;
     console.log(f)
     db.get(folderName).find(f,{data:1},(ddd)=>{
        console.log(ddd)
     }).then((results)=>{
         if(Object.keys(results).length > 0){
            console.log("Results: ")
            console.log(results)
            res.json(results);
         } else {
            res.send({
                error: true,
                errorMessage: "Unable to find data", 
                requestType: folderName
            })
         }
     }).catch((err)=>{
         console.log(err)

     })

     console.log("After the request")
});


app.post("", function(req, res) { 
     var wholeObject = JSON.parse(decodeURI(req.url.replace("/?","")));
     console.log(wholeObject);
     var fileName = wholeObject["fileId"]
     console.log(fileName);
     var requestConfig = itemNameFolderFinder[wholeObject.type];
     var folderName = requestConfig.tableName.toString();
     console.log(requestConfig)
     var _keyName = requestConfig.keyName.toString();
     console.log(requestConfig.keyName)
     console.log(fileName)
    var f = {};
    f[_keyName] = fileName;
    console.log(f)
    var swapsy = JSON.parse(JSON.stringify(wholeObject.passedData).replace("'","\""));
    

    db.get(folderName).update(f,swapsy).then((results)=>{
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
     })

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
   var client = mdb.MongoClient("mongodb://127.0.0.1/27017", (err,_db)=>{
       console.log(_db)
   });
   db.get("userData").find({}).then((results)=>{
       console.log(results)
   })   
});