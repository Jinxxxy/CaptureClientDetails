export class dataRequestTemplate {
    type: string = "";
    fileId: any = 0;
    itemName: string = "";
    authenticated: boolean = false;
    passedData: any;
    constructor(_type: string, _fileId: any, _itemName?: string, authenticated?: boolean){
        this.type = _type
        this.fileId = _fileId
        this.itemName = _itemName
    }
}

export default dataRequestTemplate;