import { Component, OnInit } from '@angular/core';
import {clientDetails} from '../../Models/clientProfile.model'

@Component({
  selector: 'app-personal-details',
  templateUrl: './personaldetails.component.html',
  styleUrls: ['./personaldetails.component.css',
  './../../Stylesheets/skeleton.css']
})
export class PersonalDetailsComponent implements OnInit {
  newClient: clientDetails;

  constructor() {
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
