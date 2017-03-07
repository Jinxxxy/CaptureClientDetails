import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {} from './data/componentList'
import {RouterModule, Routes} from '@angular/router'
import {componentList} from './ConfigFiles/componentList';
const appRoutes: Routes = componentList.linkArray;

@NgModule({
  declarations: [componentList.componentArray, Pipe],
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

