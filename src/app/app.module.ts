import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router'
import {componentList} from './ConfigFiles/componentList';
import { PersonalDetailsComponent } from './Components/personaldetails/personaldetails.component';
import { MessageScreenComponent } from './Components/message-screen/message-screen.component';
import {getDataService} from './ServiceLayer/getData.service';
import { ResultScreenComponent } from './Components/result-screen/result-screen.component'
const appRoutes: Routes = componentList.linkArray;

@NgModule({
  declarations: [componentList.componentArray, PersonalDetailsComponent, MessageScreenComponent, ResultScreenComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    RouterModule.forRoot(appRoutes),
    RouterModule.forChild(appRoutes)
  ],
  providers: [getDataService],
  bootstrap: [componentList.allComponents.appcomponent.component]
})
export class AppModule {
  
}

