import { dataRequestTemplate } from '../Models/dataRequest.model';
import {Observable} from 'rxjs'
import {Http, Response} from '@angular/http'
import {connectionData} from './ServiceLayerConfig/serverLocationDetails'
import {datadump} from '../ServiceLayer/dataStore';
import {Injectable} from '@angular/core';


// var itemNameFolderFinder = {
//     "income":"clientData",
//     "expenditure":"clientData",
//     "UserData": "UserData"
// }
@Injectable()
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
export default setDataService;