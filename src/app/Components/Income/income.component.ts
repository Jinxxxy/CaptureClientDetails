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

@Component({
  selector: 'incomeForm',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css',
  './../../Stylesheets/skeleton.css'],
  providers: [getDataService, setDataService]
})
export class Income {
   incomeBudgetFields = datadump.client.income;
   addNew = "";
   _cpjList = cpjList;
   _save: setDataService;
   jointBudget: boolean = false;
   payFrequencyList = [];
   frequencyInput: string = "";
   _clientId: number = 2000001;
   _newFrequencyString = "";
   _clientOrPartner = "";
   _newBudgetItem:budgetItemClass = new budgetItemClass();
   gd: getDataService; 
  _clientLoaded: boolean = datadump.clientLoaded;
  removeFromBudgetList(itemIndex: number){
    datadump.client.income.splice(itemIndex, 1);
    this.incomeBudgetFields.splice(itemIndex, 1)
  }
  save(saveObject: Object){    
    var saveResponse: Observable<Object> = this._save.saveClientData();
    saveResponse.map((response: Object)=>{
      
    })
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
      temp.clientPartnerOrJoint = this._newBudgetItem["clientPartnerOrJoint"].toLocaleLowerCase();   
      console.log(datadump.client.income);
      datadump.client.income.push(temp);
      this.loadIncomeData();        
    } else {
      alert("Add the name of the field you want to add.")
    }
  }
  addFrequencyString(objectToAddItemTo: Object): Object{
    var frequencyKey:number = objectToAddItemTo["frequency"];
    var frequencyString = stringKeyConverters.convertFrequencyKeyToString(frequencyKey);
    console.log(objectToAddItemTo);
    objectToAddItemTo["frequencyString"] = frequencyString;
    console.log(frequencyString)
    return objectToAddItemTo;
  }
  loadIncomeData(){
    console.log(this.incomeBudgetFields)
    console.log(datadump);
    if(datadump["clientLoaded"] === true){      
      console.log(datadump.client.income);
      var f = datadump.client.income;
      console.log(f);
      var sortedObject = this.putItemsIntoArray(f);
      console.log(sortedObject);
      this.incomeBudgetFields = sortedObject;
    } else {

    }
  }
  sortIncomeObjectToArray(incomeObject: Object): Array<Object>{
    var returnArray = [];
    var toReturn = returnArray.concat(incomeObject["client"]).concat(incomeObject["partner"]).concat(incomeObject["joint"]);
    return toReturn;
  }
  isJointBudget(){
      var returnValue: boolean = false;
      var conn = new XMLHttpRequest();
      conn.open("get", "./app/ClientFiles/" + this._clientId + ".json", true);
      conn.onload = (()=>{
          var dataObject = JSON.parse(conn.response).data.personalDetails;
          console.log(dataObject)
          this.jointBudget = dataObject["jointBudget"];
          console.log(dataObject["jointBudget"])
      })
      conn.onerror = (()=>{
          console.log(conn.response);
      })
      conn.send();
  }
  getArrayFromObject(arrayOfObject: Object): Array<Object>{
    var returnArray = [];
    for(var oa in arrayOfObject){
      var tempArrayObject = arrayOfObject[oa];
      console.log(tempArrayObject);
      returnArray.push(tempArrayObject);      
    }
    console.log(returnArray);
    return returnArray
  }
  putItemsIntoArray(objectOfArrays:Object):Array<Object>{
    var returnArray = [];
    for(var _array in objectOfArrays){
        returnArray.push(this.addFrequencyString(objectOfArrays[_array]));      
    }
    return returnArray;
  }  
  filterAndSeparateIncomeItems(objectOfArraysToSort: Object):Object{
    var client = [];
    var partner = [];
    var joint = [];
    
    for(var x in objectOfArraysToSort){
      console.log(objectOfArraysToSort[x])
      if(objectOfArraysToSort[x].clientPartnerOrJoint === "client"){
        console.log(x)
        console.log(this.getArrayFromObject(objectOfArraysToSort[x]))
        client.push(this.getArrayFromObject(objectOfArraysToSort[x]));
      }
      else if (objectOfArraysToSort[x].clientPartnerOrJoint === "partner"){
        partner.push(this.getArrayFromObject(objectOfArraysToSort[x]));
      }
      else {
        joint.push(this.getArrayFromObject(objectOfArraysToSort[x]));
      }
    }
    var returnObj = [
        {"client": client}, 
        {"partner": partner}, 
        {"joint": joint}
      ];
      return returnObj;
  }  
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
  constructor(private __getData: getDataService, private __save: setDataService)
  {    
    this._save = __save;
    this.gd = __getData;
    //this.isJointBudget();
    this.getKeyData();
    console.log(datadump)
    if(datadump['clientLoaded']){      
      this.loadIncomeData();
    }    
    console.log(this.incomeBudgetFields)
    console.log(datadump)
  }
}
