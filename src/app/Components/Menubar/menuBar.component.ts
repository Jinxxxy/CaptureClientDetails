import {Component, Pipe} from '@angular/core';
import {budgetItemClass} from '../../Models/budgetItem.model';
import {generalHelpers} from '../../HelperMethods/GeneralHelper'
import {Router, ROUTER_CONFIGURATION, Event, RouterModule, NavigationStart} from '@angular/router'
import {datadump} from '../../ServiceLayer/dataStore'
import {Observable} from 'rxjs';
import {Response} from '@angular/http'
import {dataRequestTemplate} from '../../Models/dataRequest.model'
import {getDataService} from '../../ServiceLayer/getData.service'
import {setDataService} from '../../ServiceLayer/setData'
import {emptyDataModel} from '../../Models/emptyDataModel.model'
import {MessageScreenComponent} from '../message-screen/message-screen.component'


@Component({
  selector: 'menuBar',
  templateUrl: './menuBar.component.html',
  styleUrls: ['./menuBar.component.css',
  './../../Stylesheets/skeleton.css'],
  providers: [getDataService, setDataService]
  
})

export class MenuBar {
    private title: string = "Menu Bar";
    private linksMenu = [];
    private userPermissionLevel: number = 5;
    private gd: getDataService;
    private _clientId: number;
    private _userId: number;
    private _router: Router;
    _datadump = datadump;
    private outputFunc():Object{
    return datadump.changed;
    }
    private _resetApp(_reset = this.resetApplication){
        MessageScreenComponent.options(
            "Are you sure you want to reset the application?", 
            [
                {
                    name: "Go Ahead",
                    _function: _reset
                },
                {
                    name: "Not Right Now",
                    _function: MessageScreenComponent.resetMessageCentre
                }
            ]
        )
    }
    private resetApplication(){
        console.log("resettingApplication");
        datadump.clientLoaded = false;
        datadump.clientReference = null;
        datadump.client = emptyDataModel.client;
        MessageScreenComponent.resetMessageCentre();
    }
    private filterPermissionList(inputVal: number){
        return inputVal < this.userPermissionLevel;
        
    }

    
    private getJson(){

        var getRoutingLinksTemplate: dataRequestTemplate = new dataRequestTemplate(
            "config", "routingLinks"
        );
        
        this.gd.getRequestJSON(getRoutingLinksTemplate).map(
            (_getRoutes: Response)=>{            
                console.log(_getRoutes)
                var JsonConfig = _getRoutes.json()[0]["data"];
                
                console.log(JsonConfig)
                for(var i in JsonConfig){
                    if(JsonConfig[i].permissionLevelRequired <= this.userPermissionLevel)
                    {                    
                        this.linksMenu.push(JsonConfig[i])
                        console.log(this.linksMenu)
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
    constructor(private _gd: getDataService, private __setDataService: setDataService, private __router: Router){
        this.gd = _gd;
        this.getJson();        
        console.log(datadump);
        this._router = __router;
        this._router.events.forEach((event)=>{
            if(event instanceof NavigationStart){
                if(this._datadump.userLoaded && this._datadump.clientLoaded){
                    console.log("Mapped event is now working!")
                    __setDataService.saveClientData().subscribe();
                    __setDataService.saveUserData().subscribe();
                }
            }
            
        })
        MessageScreenComponent._visible = true;
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
