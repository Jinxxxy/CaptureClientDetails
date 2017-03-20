import { Component, OnInit } from '@angular/core';
import {clientDetails} from '../../Models/clientProfile.model'
import {datadump} from '../../ServiceLayer/dataStore';
import {Observable} from 'rxJS';
import {dataRequestTemplate} from '../../Models/dataRequest.model';
import {Response} from '@angular/http';
import {getDataService} from '../../ServiceLayer/getData.service';
import {setDataService} from '../../ServiceLayer/setData'

@Component({
  selector: 'app-personal-details',
  templateUrl: './personaldetails.component.html',
  styleUrls: ['./personaldetails.component.css',
  './../../Stylesheets/skeleton.css'],
  providers:[getDataService,setDataService]
})
export class PersonalDetailsComponent implements OnInit {
  _clientDetails;
  newClient: clientDetails;
  private gd: getDataService;
  private __save: setDataService;

  constructor(private _gd: getDataService, private _save: setDataService) {
    this.gd = _gd
    this.__save = _save;
    
   }

  ngOnInit() {
  }
}
