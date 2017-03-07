import {Component} from '@angular/core';
import {Expenditure} from '../Components/Expenditure/expenditure.component'
import {MenuBar} from '../Components/Menubar/menuBar.component'
import {Income} from '../Components/Income/income.component'
import {Home} from '../Components/Home/home.component'
import {AppComponent} from '../app.component';
import {Admin} from '../Components/AdminPanel/admin.component'
import {DebtsComponent} from  '../Components/debts/debts.component'
export var componentList = {
    allComponents:{
        "expenditure":{
            "component": Expenditure,
            "name": "expenditure",
            "path": "/expenditure",
            "visible": true
        },
        "menubar":{
            "component": MenuBar,
            "name": "menubar",
            "path": "/menu",
            "visible": true
        }, 
        "income":{
            "component": Income,
            "name": "income",
            "path": "/income",
            "visible": true
        }, 
        "appcomponent":{
            "component": AppComponent,
            "name": "appcomponent",
            "path": "/appcomponent",
            "visible": false
        },
        "homecomponent":{
            "component": Home,
            "name": "homecomponent",
            "path": "/home",
            "visible": true
        }
    },
    linkArray:[
        {path:"home", component:Home},
        {path:"expenditure", component:Expenditure},
        {path:"income", component:Income},
        {path:"admin", component: Admin},
        {path:"debts", component: DebtsComponent}
    ],
    componentArray: [Home, AppComponent, Expenditure, Income, MenuBar, Admin, DebtsComponent]
}

var getListOfComponents = ((obj):Array<any>=>{
    var tempArr: Array<any> = [];
    for(var i in obj){
        tempArr.push(obj[i]["component"]);
    }
    return tempArr
})

console.log(getListOfComponents(componentList.allComponents))

export default componentList;