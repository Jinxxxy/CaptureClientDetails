import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {} from './data/componentList'
import {RouterModule, Routes} from '@angular/router'
import {componentList} from './ConfigFiles/componentList';
import { PersonalDetailsComponent } from './Components/personaldetails/personaldetails.component';
const appRoutes: Routes = componentList.linkArray;

@NgModule({
  declarations: [componentList.componentArray, PersonalDetailsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [],
  bootstrap: [componentList.allComponents.appcomponent.component]
})
export class AppModule { }

