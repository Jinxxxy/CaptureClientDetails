import { Component, OnInit } from '@angular/core';
import {MenuBar} from '../menuBar/menuBar.component';
import {getDataService} from '../../ServiceLayer/getData.service';
import {datadump} from '../../ServiceLayer/dataStore';
import {dataRequestTemplate} from '../../Models/dataRequest.model';
import {Observable} from 'rxJs';
import {Response} from '@angular/http'

@Component({
  selector: 'message-screen',
  templateUrl: './message-screen.component.html',
  styleUrls: ['./message-screen.component.css',
  './../../Stylesheets/skeleton.css'],
  providers: [getDataService]
})
export class MessageScreenComponent implements OnInit {
  public static _visible: boolean = false;
  public static _options: boolean = false;
  private static optionsArray: [{name:string, _function: Function}]
  public static informationMessage: string;
  public static optionMessage: string;
  public static numberInput: boolean = false;
  public static _numInput: number;
  private _mb = MenuBar;
  public static geDa: getDataService;
  public getNumberInput(){
    return MessageScreenComponent._numInput;
  }
  public setNumInput(_input: number): void{
    MessageScreenComponent._numInput = _input
  }
  public getNumberInputStatus(){
    return MessageScreenComponent.numberInput;
  }
  public setVisible(){    
    return MessageScreenComponent._visible;
  }
  public getInformationMessage(){
    return MessageScreenComponent.informationMessage;
  }
  public getOptionsArray(){
    return MessageScreenComponent.optionsArray;
  }
  public static resetMessageCentre(): void{
    MessageScreenComponent._visible = false;
    MessageScreenComponent._options = false;
    MessageScreenComponent.optionsArray = null;
    MessageScreenComponent.informationMessage = "";
    MessageScreenComponent.optionMessage = "";
    MessageScreenComponent.numberInput = false;
  }
  public static options(optionsMessage: string, optArray: [{name:string, _function: Function}]): void{
    MessageScreenComponent._options = true;
    MessageScreenComponent.optionsArray = optArray;
    MessageScreenComponent._visible = true;
    MessageScreenComponent.informationMessage = optionsMessage;
  }
  public static notification(_message: string): void{
    MessageScreenComponent._visible = true;
    MessageScreenComponent.informationMessage = _message;
    MessageScreenComponent.optionsArray = [{
      name: "Ok",
      _function:()=>{
        MessageScreenComponent.resetMessageCentre();
      }
    }]
  }
  //Load user details functions.
  public getUser(_gud:Function){
    console.log("getUser - Called")
    MessageScreenComponent._visible = true;
    MessageScreenComponent.numberInput = true;
    MessageScreenComponent.informationMessage = "Please enter your login number: "
    MessageScreenComponent.optionsArray = [
      {
        name: "Log in:",
        _function: _gud
      }
    ]
  }
  public getUserDetails(){
    console.log(MessageScreenComponent._numInput)
    var requestObject: dataRequestTemplate = new dataRequestTemplate(
    "user",
    MessageScreenComponent._numInput,
    "userData",
    false

    );
    const _getUserDetails: Observable<Response> = MessageScreenComponent.geDa.getRequestJSON(
    requestObject
    );
    var outputObject = _getUserDetails.map(
        (returnedObject: Response)=>{
            var parsedObject: Object = returnedObject.json();
            console.log(parsedObject);
            if(parsedObject[0]!== undefined){
                console.log("User profile loaded!")
                var userObject: Object = parsedObject[0];
                console.log(userObject["userId"])
                datadump.userId = userObject["userId"]; 
                console.log(parsedObject)
                datadump.user = userObject;
                datadump.userLoaded = true;
                MessageScreenComponent.resetMessageCentre();
            } else if(parsedObject["error"]!== undefined){
                var errorObject = returnedObject.json()
                MessageScreenComponent.informationMessage = "Can't find that user id, please enter a valid id."

            } else {
                alert("COULDNT COMPLETE REQUEST")
            };

        }
    ).subscribe();
  }
  constructor(public _gd: getDataService){
    MessageScreenComponent.geDa = _gd;
    if(datadump.userLoaded === false){
      console.log("Please log in: ")
      this.getUser(this.getUserDetails)
    }
      
    
  }

  ngOnInit() {
   
  }

}
