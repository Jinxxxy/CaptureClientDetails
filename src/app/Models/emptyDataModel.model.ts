import {budgetItemClass} from './budgetItem.model'
import {debtItem} from './debtItem.model'
export class emptyDataModel{
    public static client: {
        personalDetails:{

        }
        expenditure:Array<budgetItemClass>
        debts: Array<debtItem>
        income: Array<Object>
    } = {
        personalDetails:{

        },
        expenditure: <Array<budgetItemClass>> [],
        debts: <Array<debtItem>> [],
        income: <Array<Object>>[]
    }
}
    

export default emptyDataModel;