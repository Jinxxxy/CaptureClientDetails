import { dataRequestTemplate } from '../Models/dataRequest.model';
import {Observable} from 'rxjs'
import {Http, Response} from '@angular/http'
import {connectionData} from './ServiceLayerConfig/serverLocationDetails'
import {datadump} from '../ServiceLayer/dataStore';
import {Injectable} from '@angular/core';


@Injectable()
export class setDataService{
    private _http: Http; 
    saveClientData: Function = ((crudtype: string): Observable<Object>=>{
        var postClientTemplate: dataRequestTemplate = new dataRequestTemplate(
            "client",
            datadump.clientReference
        );                
        postClientTemplate.passedData = datadump.client;
        postClientTemplate.crud = crudtype;
        var returnObservable: Observable<Object> = this._http.post(
            connectionData.baseServerString 
            + connectionData.serverParameterSeparator +
            JSON.stringify(postClientTemplate),"");
        return returnObservable;        
    })
    saveUserData: Function = ((): Observable<Object>=>{
        console.log('Saving...')
        
        var postClientTemplate: dataRequestTemplate = new dataRequestTemplate(
            "user",
            datadump.clientReference
        );
                
        postClientTemplate.passedData = datadump.user;
        var returnObservable: Observable<Object> = this._http.post(
            connectionData.baseServerString 
            + connectionData.serverParameterSeparator +
            JSON.stringify(postClientTemplate), ""
        )
        return returnObservable
    })

    constructor(private __http: Http){
        this._http = __http;
    }
}
export default setDataService;