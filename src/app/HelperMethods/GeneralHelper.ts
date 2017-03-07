import {budgetItem} from '../Models/budgetItems'

export var generalHelpers = {
    mapToItem: function(json):budgetItem{
        for(var i in json){            
            var temp: budgetItem = new budgetItem();
            temp.name = json["name"];
            temp.order = json["order"];
            temp.defaultValue = json["defaultValue"];
            temp.essential = json["essentialExpenditure"];
            temp.addedByClient = json["addedByClient"];
            temp.clientPartnerOrJoint = json["clientPartnerOrJoint"];
            temp.clientFigure = json["clientFigure"];
            temp.frequency = json["frequencyIndex"];
        }
        console.log(temp)
        return temp;
    }
}

export default generalHelpers;