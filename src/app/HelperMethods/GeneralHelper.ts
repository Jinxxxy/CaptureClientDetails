import {budgetItemClass} from '../Models/budgetItem.model'

export var generalHelpers = {
    mapToItem: function(json):budgetItemClass{
        for(var i in json){            
            var temp: budgetItemClass = new budgetItemClass();
            temp.name = json["name"];
            temp.order = json["order"];
            temp.defaultValue = json["defaultValue"];
            temp.essential = json["essentialExpenditure"];
            temp.addedByClient = json["addedByClient"];
            temp.clientPartnerOrJoint = json["clientPartnerOrJoint"];
            temp.clientFigure = json["clientFigure"];
            temp.frequency = json["frequencyIndex"];
        }
        return temp;
    }
}

export default generalHelpers;