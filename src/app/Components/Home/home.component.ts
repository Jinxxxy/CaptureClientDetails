import {Injectable, Component} from '@angular/core';
import {budgetItemClass} from '../../Models/budgetItem.model';
import {generalHelpers} from '../../HelperMethods/GeneralHelper'
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {datadump} from '../../ServiceLayer/dataStore';
import {Observable, Subscription} from 'rxjs/Rx';
import {getDataService} from '../../ServiceLayer/getData.service';
import {dataRequestTemplate} from '../../Models/dataRequest.model'
import {emptyDataModel} from '../../Models/emptyDataModel.model';
import {calculations} from '../../ServiceLayer/calculations.service'

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
  _calculations: calculations;
  loadClientBudget(clientRef: number){
    alert(clientRef)
  }
  private getData: getDataService
    loadClient(clientRef: number){
      var requestObject: dataRequestTemplate = new dataRequestTemplate(
              "client",
              clientRef,
              "income",
              false)
      var incomeRequest: Observable<Response> = this.getData.getRequestJSON(requestObject);
      incomeRequest.map(
        
        (returnedObject: Response)=>{
          try {
          var parsedObject = returnedObject.json()[0];
          datadump.clientReference = parsedObject["personalDetails"]["clientRef"];
          
          datadump.client = parsedObject;
          datadump.clientLoaded = true;          
        } catch(error){
          var errorObject = returnedObject.json()
            alert(errorObject.errorMessage + " for " + errorObject.requestType);
          }
        }
      ).subscribe();
  }
  scaffoldNewClient(clientReference: number){
    datadump.client = emptyDataModel.client;
    datadump.clientReference = clientReference;
    datadump.clientLoaded = true;
  }
  constructor(private gd: getDataService){
  this.getData = gd;  
  this._calculations = calculations;
  }

}
