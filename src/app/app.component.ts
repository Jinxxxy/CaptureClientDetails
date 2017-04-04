import {Component} from '@angular/core';
import {budgetItemClass} from './Models/budgetItem.model';
import {generalHelpers} from './HelperMethods/GeneralHelper'
import {Expenditure} from './Components/Expenditure/expenditure.component'
import {Income} from './Components/Income/income.component'
import {RouterModule, Routes} from '@angular/router'
import {MessageScreenComponent} from './Components/message-screen/message-screen.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  _ms = MessageScreenComponent;
  title = 'Testing SSD Speed!';
  constructor(){

  }  
}
