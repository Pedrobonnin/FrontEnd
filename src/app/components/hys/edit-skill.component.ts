import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Skill } from 'src/app/model/skill';

import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class EditSkillComponent {

  skill: Skill = null;
  color: string;

  constructor(private sSkill: SkillService, private activateRouter: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    const id = this.activateRouter.snapshot.params['id'];
    this.sSkill.detail(id).subscribe(
      data => {
        this.skill = data;
        this.color = this.skill.outerStrokeColor; // Asignar valor inicial de color
      }, err => {
        alert("Error al modificar");
        this.route.navigate(['']);
      }
    )
  }

  onUpdate(): void {
    this.skill.outerStrokeColor = this.color; // Asignar valor de color a outerStrokeColor
    const id = this.activateRouter.snapshot.params['id']
    this.sSkill.update(id, this.skill)
      .pipe(
        catchError(err => {
          alert("Error al modificar Skill");
          return of(null);
        })
      )
      .subscribe(
        data => {
          this.route.navigate(['']);
        }
      )
  }

  onColorSelected(color: string): void {
    this.color = color; // Asignar valor seleccionado a la variable color
    this.skill.outerStrokeColor = color; // Asignar valor seleccionado a outerStrokeColor
  }

}