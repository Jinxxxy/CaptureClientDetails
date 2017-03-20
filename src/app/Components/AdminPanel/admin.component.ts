import {Component} from '@angular/core';
import {budgetItemClass} from '../../Models/budgetItem.model';
import {generalHelpers} from '../../HelperMethods/GeneralHelper'
import {getUserData} from '../../ServiceLayer/getUserData'
import {setDataService} from '../../ServiceLayer/SetData'
import {stringKeyConverters} from '../../HelperMethods/keyToStringConverters'
import {getDataService} from '../../ServiceLayer/GetData.service';
import {Observable} from 'rxjs';
import {dataRequestTemplate} from '../../Models/dataRequest.model'
import {datadump} from '../../ServiceLayer/dataStore'
import {Response} from '@angular/http'
@Component({
  selector: 'adminPanel',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css', 
  './../../Stylesheets/skeleton.css'], 
  providers: [getDataService, setDataService]
})
export class Admin {
  private title: string = "Admin Panel"  
  private _userData: Object = datadump.user;
  private _userId: string = "100001";
  private _save: setDataService;
  private keyToString: Function = stringKeyConverters.userPermissionLevelKeyToString;
  private getData: getDataService;
  printFullName(_firstName: string, _lastName: string): void{
  }
  saveData(){
    var data = {
      "saveProfile":[
        {"itemName":"UserData"},
        {"userId": this._userId}
      ],
      "data": [this._userData]
    }
    this._save.saveUserData();

  }
  
  constructor(private __get: getDataService, private __save: setDataService)
  {
    this.getData = __get;  
    this._save = __save;
    //this.getUserDetails();  
  }
}