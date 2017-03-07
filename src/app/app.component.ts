import {Component} from '@angular/core';
import {budgetItemClass} from './Models/budgetItem.model';
import {generalHelpers} from './HelperMethods/GeneralHelper'
import {Expenditure} from './Components/Expenditure/expenditure.component'
import {Income} from './Components/Income/income.component'
import {RouterModule, Routes} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Testing SSD Speed!';  
  
  
}
