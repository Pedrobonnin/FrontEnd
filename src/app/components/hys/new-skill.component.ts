
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';


import { catchError, of } from 'rxjs';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent {

  unaSkill: string;
  porcentaje: number;
  outerStrokeColor: string;
  color:any;
  

  @Output() colorSelected = new EventEmitter<string>();

  onColorSelected(color: string) {
    this.colorSelected.emit(color);
  }

  constructor(private sSkill: SkillService, private router: Router) { }

  ngOnInit(): void {
   
  }


  onCreate(): void {
    // Convertir el valor del color a una cadena de texto en formato RGB
    const outerStrokeColor = this.color;

    const skill = new Skill(this.unaSkill, this.porcentaje, outerStrokeColor);
    console.log(skill);
    this.sSkill.save(skill)
      .pipe(
        catchError(err => {
          alert("Falló la creacion de Experiencia");
          return of(null);
        })
      )
      .subscribe(data => {
        if (data) {
          alert("Experiencia añadida");
          this.router.navigate(['/'], { fragment: 'experiencia' });
        }
      });
  }

}