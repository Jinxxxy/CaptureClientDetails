import {_getData} from '../ServiceLayer/getData.service';
import {Http} from '@angular/http'
import {connectionData} from './ServiceLayerConfig/serverLocationDetails';
import {Observable, Subscription} from 'rxjs/Rx';
import {budgetItemClass} from '../Models/budgetItem.model';
import {debtItem} from '../Models/debtItem.model'

export class datadump{
    public static client: {
        personalDetails:{

        }
        expenditure:Array<budgetItemClass>
        debts: Array<debtItem>
        income: Array<Object>
    }
    public static user: {
        details: {

        }
        worklist:{

        }
    }
    public static clientLoaded: boolean = false;
    public static userLoaded: boolean = false;

    public static clientReference: number = null;
    public static userId: number = null;
}
export default datadump;


