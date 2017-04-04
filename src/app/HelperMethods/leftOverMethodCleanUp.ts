export class leftOverCleanUpMethods{
    //Income Section
    private datadump: any;
    private incomeBudgetFields = [];
    private stringKeyConverters = {
        convertFrequencyKeyToString: ((input)=>{

        })
    }
    //Above are dummy variables - remove if needed again.
    sortIncomeObjectToArray(incomeObject: Object): Array<Object>{
        var returnArray = [];
        var toReturn = returnArray.concat(incomeObject["client"]).concat(incomeObject["partner"]).concat(incomeObject["joint"]);
        return toReturn;
    }
    getArrayFromObject(arrayOfObject: Object): Array<Object>{
        var returnArray = [];
        for(var oa in arrayOfObject){
        var tempArrayObject = arrayOfObject[oa];
        returnArray.push(tempArrayObject);      
        }
        return returnArray
    } 
    putItemsIntoArray(objectOfArrays:Object):Array<Object>{
        var returnArray = [];
        for(var _array in objectOfArrays){
            returnArray.push(this.addFrequencyString(objectOfArrays[_array]));      
        }
        return returnArray;
    }  
    filterAndSeparateIncomeItems(objectOfArraysToSort: Object):Object{
        var client = [];
        var partner = [];
        var joint = [];

        for(var x in objectOfArraysToSort){
            if(objectOfArraysToSort[x].clientPartnerOrJoint === "client"){
            client.push(this.getArrayFromObject(objectOfArraysToSort[x]));
            }
            else if (objectOfArraysToSort[x].clientPartnerOrJoint === "partner"){
            partner.push(this.getArrayFromObject(objectOfArraysToSort[x]));
            }
            else {
            joint.push(this.getArrayFromObject(objectOfArraysToSort[x]));
            }
        }
        var returnObj = [
            {"client": client}, 
            {"partner": partner}, 
            {"joint": joint}
            ];
        return returnObj;
    } 
    loadIncomeData(){
        if(this.datadump["clientLoaded"] === true){   
            var f = this.datadump.client.income;
            var sortedObject = this.putItemsIntoArray(f);
            this.incomeBudgetFields = sortedObject;
        } else {

        }
    }
    addFrequencyString(objectToAddItemTo: Object): Object{
        var frequencyKey:number = objectToAddItemTo["frequency"];
        var frequencyString = this.stringKeyConverters.convertFrequencyKeyToString(frequencyKey);
        objectToAddItemTo["frequencyString"] = frequencyString;
        return objectToAddItemTo;
    }   
}