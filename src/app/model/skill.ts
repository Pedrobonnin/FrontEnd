export class Skill {
    idSkill:number;
    unaSkill:string;
    porcentaje:number;
    outerStrokeColor:string;


    constructor(unaSkill:string, porcentaje:number, outerStrokeColor:string){
        this.unaSkill = unaSkill;
        this.porcentaje = porcentaje;
        this.outerStrokeColor = outerStrokeColor;
    }
}
