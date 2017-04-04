export class dataPostTemplate{
    crud: string = "";
    type: string = "";
    fileId: any = 0;
    itemName: string = "";
    authenticated: boolean = false;
    passedData: any;
    constructor(_type: string, passedData: Object, _fileId: any, _itemName?: string, authenticated?: boolean){
        this.type = _type
        this.fileId = _fileId
        this.itemName = _itemName
    }
}