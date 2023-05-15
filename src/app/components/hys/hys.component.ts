import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/service/skill.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']

})
export class HysComponent {
  skill: Skill[] = [];

  isLogged = false;

  constructor(private sSkill: SkillService, private tokenService: TokenService) { }


  ngOnInit(): void {
    this.cargaSkills();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargaSkills(): void {
    this.sSkill.lista().subscribe(
      data => { this.skill = data; }
    )
  }

  delete(id?: number) {
    if (id !== undefined) {
      if (confirm('¿Estás seguro de que deseas eliminar esta habilidad?')) {
        this.sSkill.delete(id)
          .pipe(
            catchError(err => {
              alert("No se pudo borrar el elemento");
              return of(null);
            })
          )
          .subscribe(
            dat => {
              this.cargaSkills();
            },
          );
      }
    }
  }

  public isCursorOnDeleteButton = false;
}
