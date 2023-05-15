import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Estudio } from 'src/app/model/estudio';
import { EstudioService } from 'src/app/service/estudio.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-estudio',
  templateUrl: './estudio.component.html',
  styleUrls: ['./estudio.component.css']
})
export class EstudioComponent {
  


  estudy: Estudio[] = [];

  isLogged = false;

  constructor(private sEstudio: EstudioService, private tokenService: TokenService) { }


  ngOnInit(): void {
    this.cargaEstudio();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargaEstudio(): void {
    this.sEstudio.lista().subscribe(
      data => { 
        this.estudy = data; 
        this.noHayDatos = this.estudy.length === 0;
      }
      
    )
  }

  delete(id?: number) {
    if (id != undefined) {
      if (confirm('¿Estás seguro de que deseas eliminar este Estudio?')) {
        this.sEstudio.delete(id)
        .pipe(
          catchError(err => {
            alert("No sepudo borrar el elemento");
            return of(null);
          })
        )
        .subscribe(
          dat => {
            this.cargaEstudio();
          }
        )
      }
    }

  }

  noHayDatos: boolean = true;
  public isCursorOnDeleteButton = false;
}
