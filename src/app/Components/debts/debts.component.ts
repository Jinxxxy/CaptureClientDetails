import {datadump}from '../../ServiceLayer/dataStore';
import { Component, OnInit } from '@angular/core';
import {debtItem} from '../../Models/debtItem.model';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.css',
  './../../Stylesheets/skeleton.css']
})
export class DebtsComponent implements OnInit {
  private formTitle: string = "Let looks at your debts!"
  private newDebt: debtItem = new debtItem();
  private _clientDebtList: Array<debtItem> = datadump.client.debts;
  private outputFunc():string{
    return JSON.stringify(this._clientDebtList, null, 2);
  }
  private deleteFromList(itemIndex):void{
    console.log(typeof datadump.client.debts);
    datadump.client.debts.splice(itemIndex, 1);    
  }
  private addNewDebtItemToList(){
    this._clientDebtList.push(this.newDebt);
    this.saveDebt;
  }  
  private saveDebt(){
    datadump.client.debts = this._clientDebtList;
  }
  private debtTypes: Array<string> = ["Credit Card", "Hire Purchase", "Overdraft"]
  constructor() { 

  }

  ngOnInit() {
  }

}
