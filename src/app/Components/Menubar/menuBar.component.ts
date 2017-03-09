import {Component, Pipe} from '@angular/core';
import {budgetItemClass} from '../../Models/budgetItem.model';
import {generalHelpers} from '../../HelperMethods/GeneralHelper'
import {Router, ROUTER_CONFIGURATION} from '@angular/router'
import {datadump} from '../../ServiceLayer/dataStore'
import {Observable} from 'rxjs';
import {Response} from '@angular/http'
import {dataRequestTemplate} from '../../Models/dataRequest.model'
import {getDataService} from '../../ServiceLayer/getData.service'


@Component({
  selector: 'menuBar',
  templateUrl: './menuBar.component.html',
  styleUrls: ['./menuBar.component.css',
  './../../Stylesheets/skeleton.css'],
  providers: [getDataService]
  
})

export class MenuBar {
    private title: string = "Menu Bar";
    private linksMenu = [];
    private userPermissionLevel: number = 5;
    private gd: getDataService;
    private _clientId: number;
    private _userId: 100001;
    _datadump = datadump;
    private outputFunc():Object{
    return datadump.client;
  }
    private filterPermissionList(inputVal: number){
        return inputVal < this.userPermissionLevel;
    }
    loadClient(clientRef: number){
    var requestObject: dataRequestTemplate = new dataRequestTemplate(
            "client",
            clientRef,
            "income",
            false)
    var incomeRequest: Observable<Response> = this.gd.getRequestJSON(requestObject);
    incomeRequest.map(
      (returnedObject: Response)=>{
        console.log(returnedObject.json())
        var parsedObject = returnedObject.json();
        console.log(parsedObject)
        datadump.client = parsedObject;
        datadump.clientLoaded = true;
        datadump.clientReference = clientRef;        
      }
    ).subscribe();
  }
    private getJson(){

        var getRoutingLinksTemplate: dataRequestTemplate = new dataRequestTemplate(
            "config", "routingLinks"
        );
        
        this.gd.getRequestJSON(getRoutingLinksTemplate).map(
            (_getRoutes: Response)=>{            
                var JsonConfig = _getRoutes.json()["data"]["routingLinks"];
                console.log(JsonConfig)
                for(var i in JsonConfig){
                    if(JsonConfig[i].permissionLevelRequired <= this.userPermissionLevel)
                    {                    
                        this.linksMenu.push(JsonConfig[i])
                    }         
                }
            }
        ).subscribe();
        // var conn = new XMLHttpRequest();
        // conn.open("GET", "./app/ConfigFiles/routingLinks.json", true);
        // conn.onload = ()
        // conn.onerror = (()=>{
        //     throw "Unable to load config";
        // })
        // conn.send();
    }
    constructor(private _gd: getDataService){
        this.gd = _gd;
        this.getJson();        
        console.log(datadump)
    }
}

var routerHelpers = {
    getJson: function(){
        var conn = new XMLHttpRequest();
        conn.open("GET", "./app/JSONFiles/ConfigFiles/routingLinks.json", true);
        conn.onload = (()=>{
            var config = JSON.parse(conn.response)["data"]["routingLinks"];            
        })
        conn.onerror = (()=>{
            throw "Unable to load config";
        })
        conn.send();
    }
}
