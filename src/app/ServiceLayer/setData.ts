import {_getData} from './getData.service';
import { dataRequestTemplate } from '../Models/dataRequest.model';
import {Observable} from 'rxjs'
import {Http} from '@angular/http'
import {connectionData} from './ServiceLayerConfig/serverLocationDetails'
import {datadump} from '../ServiceLayer/dataStore';


var itemNameFolderFinder = {
    "income":"clientData",
    "expenditure":"clientData",
    "UserData": "UserData"
}

export class setDataService{
    private _http: Http; 
    saveClientData: Function = ((): Observable<Object>=>{
        var returnObservable: Observable<Object> = this._http.post(
            connectionData.baseServerString 
            + connectionData.serverParameterSeparator, 
            JSON.stringify(datadump.client));
        return returnObservable;        
    })
    saveUserData: Function = ((): Observable<Object>=>{
        var returnObservable: Observable<Object> = this._http.post(
            connectionData.baseServerString 
            + connectionData.serverParameterSeparator, 
            JSON.stringify(datadump.user)
        )
        return returnObservable
    })

    constructor(private __http: Http){
        this._http = __http;
    }
}

// export var setData = {
//     saveData: ((jsonObj):Promise<string>=>{
//         console.log("saveData")
//         var savePromise: Promise<string> = new Promise((res,rej)=>{
//             if(jsonObj["frequencyString"] !== undefined){
//                  delete jsonObj["frequencyString"];
//             }
//             var jsonstring = JSON.stringify(jsonObj);
//             console.log(jsonstring)
//             var conn = new XMLHttpRequest();
//             conn.open("POST", "http://localhost:5000?" + jsonstring, true);
//             conn.onload = (()=>{
//             res("Data Saved")
//             })
//             conn.onerror = (()=>{
//             rej("Data failed to save")
//             })
//             conn.send();
//         });
//         return savePromise;        
//     }),
//     save: ((objectName: string, objectToReplace: Object): any =>{
//         console.log("save")
//         var saveImplementation: Promise<string> = setData.saveData(objectToReplace);
//         saveImplementation.then((serverResponse)=>{
//             console.log(serverResponse)            
//         })
//     })    
// }
export default setDataService;