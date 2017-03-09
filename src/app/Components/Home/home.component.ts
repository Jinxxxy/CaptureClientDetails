import {Injectable, Component} from '@angular/core';
import {budgetItemClass} from '../../Models/budgetItem.model';
import {generalHelpers} from '../../HelperMethods/GeneralHelper'
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {datadump} from '../../ServiceLayer/dataStore';
import {Observable, Subscription} from 'rxjs/Rx';
import {getDataService} from '../../ServiceLayer/getData.service';
import {dataRequestTemplate} from '../../Models/dataRequest.model'

@Component({
  selector: 'homePage',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
  './../../Stylesheets/skeleton.css'],
  providers:[getDataService]
})
@Injectable()
export class Home {
  public _clientId: number;
  private _worklistArray: Array<number> = [2000001, 2000002]
  private title: string = "Home Panel";
  _datadump = datadump;
  _clientLoaded: boolean = datadump.clientLoaded;
  loadClientBudget(clientRef: number){
    alert(clientRef)
  }
  getData: getDataService
  // public test(){     
  //       const reqObject = new dataRequestTemplate("test", 2000001, "income");        
  //       const resp = this.gd.getRequestString(reqObject);
  //       resp.subscribe((resp)=>{
  //           console.log(resp)            
  //       }, (err)=>{
  //           console.log(err)
  //       }, ()=>{
  //           console.log("Completed!")
  //       })
  //   }
  // public loadClient(){
  //   const requestObject: dataRequestTemplate = new dataRequestTemplate(
  //     "client",
  //     this._clientId,
  //     "income",
  //     false
  //   )
  //   const loadClientRequest: Observable<Response> = this.getData.getRequestJSON(requestObject);
  //   const clientData: Object = loadClientRequest.map(
  //     (returnedObject: Response)=>{
  //       var processedObject = returnedObject.json();
  //       console.log(processedObject["data"])

  //       datadump.client = processedObject["data"];
  //       datadump.clientLoaded = true;
  //       datadump.clientReference = this._clientId;
  //       console.log(datadump)
  //     }
  //   ).subscribe();
  // }
  constructor(private gd: getDataService)
  {
  this.getData = gd;  
  }
}
