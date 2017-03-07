import {budgetItemClass} from '../Models/budgetItemClass';

export class classObjectConverter{
    public static fillInBlanksOnObject(budgetItem: Object){
        for(var budgetProperty in budgetItem){
            try{
                if(budgetItem[budgetProperty]){
                    
                } else {
                    
                }
            } catch(e){

            }
        }
    }
    public static pickDefaults(propertyName: string): any{        
        switch(propertyName){
            case 'name':
            return 'unnamed Budget Item - ATTENTION NEEDED';
            case 'order':
            return 99;;
            case 'defaultVaue':
            return 0;
            case 'essential':
            return false 
            case 'addedByClient':
            return 0
            case 'clientFigure':
            return 0
            case 'clientPartnerOrJoint':
            return 'client'
            case 'frequency':
            return 0
            case 'frequencyString':
            return 'monthly'
        }
    }
}
