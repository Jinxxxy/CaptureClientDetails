import {Component} from '@angular/core';
import {budgetItemClass} from '../../Models/budgetItem.model';
import {generalHelpers} from '../../HelperMethods/GeneralHelper';
import {getDataService} from '../../ServiceLayer/getData.service';
import {setDataService} from '../../ServiceLayer/setData';
import {Observable} from 'rxjs'
import {dataRequestTemplate} from '../../Models/dataRequest.model'
import {Response} from '@angular/http'
import {datadump} from '../../ServiceLayer/dataStore';
import {stringKeyConverters} from '../../HelperMethods/keyToStringConverters'
import {cpjList} from '../../ConfigFiles/clientPartnerOrJoint';
import {convertFrequencyValues} from '../../HelperMethods/convertPayFrequencies'
import {payFrequencyList} from '../../ConfigFiles/payFrequencyList'


@Component({
  selector: 'incomeForm',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css',
  './../../Stylesheets/skeleton.css'],
  providers: [getDataService, setDataService]
})
export class Income {
   incomeBudgetFields = datadump.client.income;
   addNew: budgetItemClass = new budgetItemClass();
   _cpjList = cpjList;
   _save: setDataService;
   _payFrequencyList: Object;
   _newBudgetItem:budgetItemClass = new budgetItemClass();
   gd: getDataService; 
   _convert: convertFrequencyValues;
  _clientLoaded: boolean = datadump.clientLoaded;
  removeFromBudgetList(itemIndex: number){
    datadump.client.income.splice(itemIndex, 1);
    this.incomeBudgetFields.splice(itemIndex, 1);
    this.__save.saveClientData().subscribe();
  }
  addNewFunc(){
    if(this.addNew !== undefined){
      var temp: budgetItemClass = new budgetItemClass();
      temp.name = this._newBudgetItem["name"];
      temp.defaultValue = 1;
      temp.addedByClient = true;
      temp.essential = false;
      temp.clientFigure = this._newBudgetItem["clientFigure"];
      temp.order = datadump.client.income.length - 1;
      temp.frequencyString = this._newBudgetItem["frequencyString"];
      temp.frequency = stringKeyConverters.convertFrequencyStringToKey(temp.frequencyString);
      temp.clientPartnerOrJoint = this._newBudgetItem["clientPartnerOrJoint"];
      datadump.client.income.push(temp);
      this._save.saveClientData().subscribe();
    } else {
      alert("Add the name of the field you want to add.")
    }
  }  
  constructor(private __getData: getDataService, private __save: setDataService)
  {    
    this._save = __save;
    this.gd = __getData;
    this._payFrequencyList = payFrequencyList
    this._convert = convertFrequencyValues;

  }
}
