import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Estudio } from 'src/app/model/estudio';
import { EstudioService } from 'src/app/service/estudio.service';

@Component({
  selector: 'app-edit-estudio',
  templateUrl: './edit-estudio.component.html',
  styleUrls: ['./new-estudio.component.css']
})
export class EditEstudioComponent {
  estudy: Estudio = null; // inicializar con un objeto vacío


  constructor(private sEstudio: EstudioService, private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sEstudio.detail(id)
    .pipe(
      catchError(err => {
        alert("Error al modificar Estudio");
        return of(null);
      })
    )
    .subscribe(
      data =>{
        this.estudy = data;
      }
    )
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.sEstudio.update(id, this.estudy)
    .pipe(
      catchError(err => {
        alert("Error al modificar Estudio");
        return of(null);
      })
    )
    .subscribe(
      data => {
        this.router.navigate(['']);
        setTimeout(() => {
          this.router.navigateByUrl('/#estudio');
        }, 300);  
      }
    )
  }

}
