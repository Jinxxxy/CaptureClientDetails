 var express = require("express");
 var app = express();
 var jsonFile = require("jsonfile");
 var fs = require("fs");
 var itemNameFolderFinder = {
    "client":"ClientFiles",
    "expenditure":"ClientFiles",
    "UserData": "UserData",
    "config":"ConfigFiles"
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
     var folderName = itemNameFolderFinder[wholeObject.type]
     fs.readFile(__dirname + "/src/app/" + folderName + "/" +  fileName + ".json", ((err, data)=>{
         console.log(err);
         console.log(data);
         if(err !== null){
             erroObject = {
                 name: "GetClientFileError",
                 message: err
             }
             res.send(erroObject);
         }
         if(Buffer.isBuffer(data)){
             var returnData = data.toString('utf8');
             var jsonReturnData = JSON.parse(returnData);
             console.log("Return Data: ")
             console.log(jsonReturnData)
             res.json(jsonReturnData);
         }
     }))
});
app.post("", function(req, res) { 
    console.log(req.body)
    console.log("RAWR")
    var wholeObject = JSON.parse(decodeURI(req.url.replace("/?",""))); 
    console.log(wholeObject);
    //Name of file to find 
    var fileName = wholeObject.fileId.toString();
    //Name of item in object to be replaced (IE 'Income' or 'Expenditure')

    //Converted itemName above to a folder name for file. Uses object 'itemNameFolderFinder'. Potentially move out to a config file for ease.
    var folderFinder = itemNameFolderFinder[wholeObject.type];
    //Gets a promise to return the file using the parameters above. Will then replace sections of JSON to update the file. 
    var getDataPromise = getData(fileName, folderFinder).then((returnedObject)=>{        
        var file = './src/app/' + folderFinder + "/" + fileName + "" + '.json';
        jsonFile.writeFile(file, wholeObject.passedData, ((err)=>{
            if(err){
                res.send(err);
                console.log(err);
            } else {
                res.send("Item Updated");
                console.log("Item Updated");
            }            
        }))
     }).catch((errorObject)=>{
         res.send(errorObject)
         console.log(errorObject)
     })
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
});