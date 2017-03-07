export class dataRequestTemplate {
    type: string = "";
    fileId: number = 0;
    itemName: string = "";
    authenticated: boolean = false;
    constructor(_type: string, _fileId: number, _itemName?: string, authenticated?: boolean){
        this.type = _type
        this.fileId = _fileId
        this.itemName = _itemName
    }
}

export default dataRequestTemplate;