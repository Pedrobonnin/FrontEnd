export class Proyecto {
    idProy?: number;
    nameProy: string;
    detailsProy: String;
    repoUrlProy:string;
    siteUrlProy: string;
    imgUrlProy: string;
    toolsProy:string;
   

    constructor(nameProy:string, detailsProy:string, repoUrlProy:string, siteUrlProy:string, imgUrlProy:string, toolsProy:string){
        this.nameProy = nameProy;
        this.detailsProy = detailsProy;
        this.repoUrlProy = repoUrlProy;
        this.siteUrlProy = siteUrlProy;
        this.imgUrlProy = imgUrlProy;
        this.toolsProy = toolsProy;
    }
}
