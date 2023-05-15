import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Estudio } from 'src/app/model/estudio';
import { EstudioService } from 'src/app/service/estudio.service';

@Component({
  selector: 'app-new-estudio',
  templateUrl: './new-estudio.component.html',
  styleUrls: ['./new-estudio.component.css']
})
export class NewEstudioComponent {
  titulo:string ="";
  escuela:string="";
  tiempo:string="";
  nivel:string="";
  localidad:string="";

  constructor(private sEstudio: EstudioService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const estudy = new Estudio(this.titulo, this.escuela, this.tiempo, this.nivel, this.localidad);
    console.log(estudy);
    this.sEstudio.save(estudy)
    .pipe(
      catchError(err => {
        alert("Falló");
        return of(null);
      })
    )
    .subscribe(data => {
      if (data) {
        alert("Estudio añadida");
        this.router.navigate(['/'], { fragment: 'estudio' });
      }
    });
  }

}
