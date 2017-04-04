import {datadump} from './dataStore'
export class calculations{
    private static _datadump = datadump;
    public static calculateTotalIncome(_income:Object): number{
        var runningTotal = 0;
        if(_income){            
            for(var _inc in _income){
                runningTotal += parseInt(_income[_inc]["clientFigure"]);
            }
        } else{
        }

        return runningTotal
    }
    public static calculateTotalExpenditure(_expenditure): number{
        var runningTotal = 0;
        if(_expenditure){
            for(var _Exp in _expenditure){
                runningTotal += parseInt(_expenditure[_Exp]["clientFigure"]);
            }
        } else {

        }
        return runningTotal;
    }
    public static calculateTotalDebtLevel(_debts): number{
        var runningTotal = 0;
        if(_debts){
            for(var _debt in _debts){
                runningTotal += _debts[_debt]["totalAmountOwed"];
            }
        }
        return runningTotal
    }
    public static calculateSurplus(): number{
        var income: number = calculations.calculateTotalIncome(datadump.client.income);
        var expenditure: number = calculations.calculateTotalExpenditure(datadump.client.expenditure);
        return income - expenditure;
    }
    
    constructor(){

    }
}

export default calculations;