import { Component, OnInit } from '@angular/core';
import {getDataService} from '../../ServiceLayer/getData.service';
import {dataRequestTemplate} from '../../Models/dataRequest.model';
import {datadump} from '../../ServiceLayer/dataStore';
import {Observable} from 'rxjs'
import {Response} from '@angular/http'

@Component({
  selector: 'app-result-screen',
  templateUrl: './result-screen.component.html',
  styleUrls: ['./result-screen.component.css'],
  providers:[getDataService]
})
export class ResultScreenComponent implements OnInit {
  private _gd: getDataService;
  private calculateTheResult(){
    var calcResultRequest: dataRequestTemplate = new dataRequestTemplate(
      "calcResult",
      datadump.clientReference, 

    )
    calcResultRequest.passedData = datadump.client;
    this._gd.getRequestJSON(
      calcResultRequest
    ).map(
      (getResult: Response)=>{
        console.log(getResult.json())
      }
    ).subscribe();
  }
  constructor(private __gd: getDataService) {
  
    this._gd = __gd;

  }

  ngOnInit() {
  }

}
