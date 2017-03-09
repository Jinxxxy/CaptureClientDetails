import {datadump}from '../../ServiceLayer/dataStore';
import { Component, OnInit } from '@angular/core';
import {debtItem} from '../../Models/debtItem.model';
import {setDataService} from '../../ServiceLayer/setData'

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.css',
  './../../Stylesheets/skeleton.css'],
  providers:[setDataService]
})
export class DebtsComponent implements OnInit {
  private formTitle: string = "Let looks at your debts!"
  private newDebt: debtItem = new debtItem();
  private _clientDebtList: Array<debtItem> = datadump.client.debts;
  private saveService: setDataService;
  private outputFunc():string{
    return JSON.stringify(this._clientDebtList, null, 2);
  }
  private deleteFromList(itemIndex):void{
    console.log(typeof datadump.client.debts);
    datadump.client.debts.splice(itemIndex, 1);    
  }
  private addNewDebtItemToList(){
    console.log(datadump.client.debts);
    //Replace below with a mapped class => object function / method
    datadump.client.debts.push(JSON.parse(JSON.stringify(this.newDebt)));
    this.saveService.saveClientData().subscribe();
  }
  private debtTypes: Array<string> = ["Credit Card", "Hire Purchase", "Overdraft"]
  constructor(private _save: setDataService) { 
    this.saveService = _save;
    
  }

  ngOnInit() {

  }

}
