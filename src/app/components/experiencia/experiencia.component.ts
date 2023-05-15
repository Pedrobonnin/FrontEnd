import { Component } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { ExperienciaLB } from 'src/app/model/experiencia-lb';
import { SExperienciaLBService } from 'src/app/service/s-experiencia-lb.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent {
  expe: ExperienciaLB[] = [];

  isLogged = false;

  constructor(private sExperienciaLB: SExperienciaLBService, private tokenService: TokenService) { }


  ngOnInit(): void {
    this.cargaExperiecia();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargaExperiecia(): void {
    this.sExperienciaLB.lista().subscribe(
      data => {
        this.expe = data;
        this.noHayDatos = this.expe.length === 0;
      }
    )
  }

  delete(id?: number) {
    if (id != undefined) {
      if (confirm('¿Estás seguro de que deseas eliminar esta Experiencia laboral?')) {
        this.sExperienciaLB.delete(id)
          .pipe(
            catchError(err => {
              alert("No sepudo borrar el elemento");
              return of(null);
            })
          )
          .subscribe(
            dat => {
              this.cargaExperiecia();
            }
          )
      }
    }

  }
  noHayDatos: boolean = true;
  public isCursorOnDeleteButton = false;
}

