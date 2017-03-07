import {Component, Injectable} from '@angular/core';
import {budgetItemClass} from '../../Models/budgetItem.model';
import {generalHelpers} from '../../HelperMethods/GeneralHelper';
import {setDataService} from '../../ServiceLayer/setData';
import {stringKeyConverters} from '../../HelperMethods/keyToStringConverters'
import {datadump} from '../../ServiceLayer/dataStore';
import {Observable} from'rxjs';
import {_getData} from '../../ServiceLayer/getData.service';
import {Response} from '@angular/http';
import {dataRequestTemplate} from '../../Models/dataRequest.model';

@Component({
  selector: 'expenditureForm',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.css',
  './../../Stylesheets/skeleton.css'],
  providers: [_getData]
})
@Injectable()
export class Expenditure {
  budgetFields: Array<Object> = [];
  clientPartnerJoint: Array<string> = ["Client", "Partner", "Joint"];
  addNew: budgetItemClass = new budgetItemClass();
  _save: setDataService;
  _get: _getData;  
  _clientId: number = 2000001;
  _clientLoaded: boolean = datadump.clientLoaded;
  payFrequencyList: Array<string> = [];
  _stringKeyConverters = stringKeyConverters;
  testObs: Observable<Array<Object>> = new Observable<Array<Object>>();
  total: number = 0;
  getKeyData(){
    var conn = new XMLHttpRequest();
    conn.open("GET", "./app/ConfigFiles/keyToTextConversion.json", true);
    conn.onload = (()=>{
      var payFrequencyObject = JSON.parse(conn.response)["data"]["income"]["payFrequency"];
      for(var g in payFrequencyObject){
        this.payFrequencyList.push(payFrequencyObject[g]);
      }
    })
    conn.onerror = (()=>{
      throw "Failed to get income frequency list";
    })
    conn.send();
  }  
  removeFromBudgetList(itemIndex: number){
    datadump.client.expenditure.splice(itemIndex, 1);    
  }
  calculateTotal(incomeObjectArray: Array<Object>){
    var returnTotal: number = 0;
    for(var incomeObject in incomeObjectArray){
      returnTotal += incomeObjectArray[incomeObject]["clientFigure"];
    }
    console.log(returnTotal)
    this.total = returnTotal;
    return returnTotal;
  }
  save(saveObject: Object){
    this._save.saveClientData();
  }
  addNewFunc(){ 
    if(this.addNew !== undefined){
      console.log(this.addNew)
      // var temp: budgetItemClass = new budgetItemClass();
      // temp.name = this.addNew.name;
      // temp.defaultValue = 1;
      // temp.addedByClient = true;
      // temp.essential = false;
      // temp.order = this.budgetFields.length - 1;
      // temp.clientFigure = this.addNew.clientFigure;
      // temp.clientPartnerOrJoint = this.addNew.
      // this.budgetFields.push(temp);
      this.addNew.addedByClient = true;
      datadump.client.expenditure.push(this.addNew); 
      this.addNew =  new budgetItemClass();  
      console.log() 
    } else {
      alert("Add the name of the item you want to add.")
    }
  }
  budgetArrayToObject(jsonObj, userId: string):Object{
    var jsonPrepObj = {};
    jsonPrepObj[userId] = {};
    for(var x in jsonObj){
      console.log(jsonPrepObj[userId]);
      jsonPrepObj[userId][jsonObj[x].name] = jsonObj[x];
    }
    return jsonPrepObj;
  }
  processReturnedObject(arr: Object){
    var tempArray: Array<Object> = [];
    console.log(arr);    
    for(var i in arr){   
      console.log(arr[i]);      
      tempArray.push(arr[i])          
    }
    this.budgetFields = tempArray;
  }
  getExpenditureDataFromDump(){
    this.budgetFields.length = 0;
    this.budgetFields = datadump.client.expenditure;
  }
constructor(private __get: _getData, private __save: setDataService)
  {
    this._get = __get;
    this._save = __save
    this.getKeyData();
    if(datadump['clientLoaded']){
      this.getExpenditureDataFromDump();
    }
  }
}
