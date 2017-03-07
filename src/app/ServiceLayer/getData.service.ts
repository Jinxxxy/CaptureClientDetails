import {dataRequestTemplate} from '../Models/dataRequest.model'
import {connectionData} from './ServiceLayerConfig/serverLocationDetails'
import {datadump} from '../ServiceLayer/dataStore';
import {Observable} from 'rxjs';
import {Http, Response} from '@angular/http';
import {folderPathDetails} from './ServiceLayerConfig/folderPath';
import {Injectable} from '@angular/core';
//var grt = new getRequestTemplate("tes");

@Injectable()
export class _getData{
    private _http: Http;
    private processResponseData = (()=>{
        
    })    
    getRequestString:Function = ((requestObject: dataRequestTemplate):Observable<Response>=>{
        var folderName: string = requestObject["type"];
        var fileName: number = requestObject["fileId"];
        console.log(requestObject)
        var getObservable: Observable<Response> = this._http.get(
         connectionData.baseServerString +
         connectionData.serverParameterSeparator + JSON.stringify(requestObject)
         
          )
        return getObservable;
    }) 
    getRequestJSON:Function = ((requestObject: dataRequestTemplate):Observable<Response>=>{
        var folderName: string = requestObject["type"];
        var fileName: number = requestObject["fileId"];
        var getObservable: Observable<Response> = this._http.get(
         connectionData.baseServerString +
         connectionData.serverParameterSeparator + JSON.stringify(requestObject)         
        )
        return getObservable;
    })
    constructor(private __http: Http){
        this._http = __http;
    }
}

export default _getData;