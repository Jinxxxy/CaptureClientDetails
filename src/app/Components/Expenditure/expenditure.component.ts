import {Component, Injectable} from '@angular/core';
import {budgetItemClass} from '../../Models/budgetItem.model';
import {generalHelpers} from '../../HelperMethods/GeneralHelper';
import {setDataService} from '../../ServiceLayer/setData';
import {stringKeyConverters} from '../../HelperMethods/keyToStringConverters'
import {datadump} from '../../ServiceLayer/dataStore';
import {Observable} from'rxjs';
import {getDataService} from '../../ServiceLayer/getData.service';
import {Response} from '@angular/http';
import {dataRequestTemplate} from '../../Models/dataRequest.model';
import {convertFrequencyValues} from '../../HelperMethods/convertPayFrequencies'
import {payFrequencyList} from '../../ConfigFiles/payFrequencyList'

@Component({
  selector: 'expenditureForm',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.css',
  './../../Stylesheets/skeleton.css'],
  providers: [getDataService, setDataService]})
@Injectable()
export class Expenditure {
  _datadump = datadump.client.expenditure;
  clientPartnerJoint: Array<string> = ["Client", "Partner", "Joint"];
  addNew: budgetItemClass = new budgetItemClass();
  _save: setDataService;
  _get: getDataService;  
  _clientId: number = 2000001;
  _clientLoaded: boolean = datadump.clientLoaded;
  payFrequencyList: Array<string> = [];
  _stringKeyConverters = stringKeyConverters;
  testObs: Observable<Array<Object>> = new Observable<Array<Object>>();
  total: number = 0; 
  removeFromBudgetList(itemIndex: number){
    datadump.client.expenditure.splice(itemIndex, 1); 
    this.__save.saveClientData().subscribe();
  }
  save(saveObject: Object){
    this._save.saveClientData();
  }
  addNewFunc(){ 
    if(this.addNew !== undefined){
      this.addNew.addedByClient = true;
      datadump.client.expenditure.push(this.addNew); 
      this.addNew =  new budgetItemClass();  
      this._save.saveClientData().subscribe();
    } else {
      alert("Add the name of the item you want to add.")
    }
  }
constructor(private __get: getDataService, private __save: setDataService)
  {
    this._get = __get;
    this._save = __save;
    this.payFrequencyList = payFrequencyList;
  }
}
