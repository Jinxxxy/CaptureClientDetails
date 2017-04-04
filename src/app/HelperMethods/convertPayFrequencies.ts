export class convertFrequencyValues{
    private static convertToWeekly(_freqString: string, _valueToConvert: number): number{
        if(_freqString === null){
            return 0;
        } else{
            switch(_freqString.toLowerCase()){
                case "weekly":
                return parseInt((_valueToConvert).toFixed(0));
                case "fornightly":
                return parseInt((_valueToConvert / 2).toFixed(0));
                case "4 weekly": 
                return parseInt((_valueToConvert / 4).toFixed(0));
                case "monthly":
                return parseInt(((_valueToConvert * 12) / 52).toFixed(0));
                case "quarterly":
                return parseInt(((_valueToConvert * 4) / 52).toFixed(0));
                case "annually":
                return parseInt((_valueToConvert / 12).toFixed(0));
                default:
                throw "Unknown frequency string: " + _freqString;
            }
        }
        
    }
    public static convertToMonthly(_freqString: string, _valueToConvert: number){
        var weeklyAmount = this.convertToWeekly(_freqString, _valueToConvert);
        return parseInt(((weeklyAmount * 52) / 12).toFixed(0));
    }    
}
export default convertFrequencyValues;