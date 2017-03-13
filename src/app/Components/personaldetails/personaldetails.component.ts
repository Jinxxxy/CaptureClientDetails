import { Component, OnInit } from '@angular/core';
import {clientDetails} from '../../Models/clientProfile.model'
import {datadump} from '../../ServiceLayer/dataStore';
import {Observable} from 'rxJS';
import {dataRequestTemplate} from '../../Models/dataRequest.model';
import {Response} from '@angular/http';
import {getDataService} from '../../ServiceLayer/getData.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personaldetails.component.html',
  styleUrls: ['./personaldetails.component.css',
  './../../Stylesheets/skeleton.css'],
  providers:[getDataService]
})
export class PersonalDetailsComponent implements OnInit {
  newClient: clientDetails;
  private gd: getDataService;

  constructor(private _gd: getDataService) {
    this.gd = _gd
    var _clientDetails: clientDetails = new clientDetails();
    _clientDetails.firstName = "Test";
    _clientDetails.middleNames = "Mc";
    _clientDetails.surname = "Testy";
    _clientDetails.dateOfBirth = new Date();
    _clientDetails.homePhone = "019777999999"
    _clientDetails.workPhone = "019777999999"
    _clientDetails.mobilePhone = "019777999999"
    _clientDetails.addressLine1 = "addy1"
    _clientDetails.addressLine2 = "addy2"
    _clientDetails.townCity = "townstring"
    _clientDetails.country = "country"
    _clientDetails.postCode = "WF99PP"
    this.newClient = _clientDetails;
   }
   
  ngOnInit() {
  }
}
