

export class stringKeyConverters {
    public static userPermissionLevelKeyToString(_key: number): string{
        switch(_key){
            case 0:
            return "Basic"
            case 1:
            return "Beginner"
            case 2:
            return "Intermediate"
            case 3:
            return "Advanced"
            case 4: 
            return "Admin"
            case 5:
            return "SuperUser"
        }
    }
    public static userPermissionStringToKey(_key: string): number{
        switch(_key){
            case "Basic":
            return 0
            case "Beginner":
            return 1
            case "Intermediate":
            return 2
            case "Advanced":
            return 3
            case "Admin": 
            return 4
            case "SuperUser":
            return 5
        }
    }
    public static convertFrequencyKeyToString(index: number): string{        
        switch(index){
        case 0:
        return "Weekly"
        case 1:
        return "Fortnightly"
        case 2: 
        return "4 Weekly"
        case 3:
        return "Monthly"
        case 4:
        return "Quarterly"
        case 5:
        return "Annually"
        }
    }
    public static convertFrequencyStringToKey(frequencyString: string): number{
            switch(frequencyString){
            case "Weekly":
            return 0
            case "Fortnightly":
            return 1
            case "4 Weekly":
            return 2
            case "Monthly":
            return 3
            case "Quarterly":
            return 4
            case "Annually":
            return 5
            }
    }
}

export default stringKeyConverters;