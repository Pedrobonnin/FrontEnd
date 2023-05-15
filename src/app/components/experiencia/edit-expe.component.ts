import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ExperienciaLB } from 'src/app/model/experiencia-lb';
import { SExperienciaLBService } from 'src/app/service/s-experiencia-lb.service';

@Component({
  selector: 'app-edit-expe',
  templateUrl: './edit-expe.component.html',
  styleUrls: ['./new-experiencia.component.css']
})
export class EditExpeComponent implements OnInit {
  expLab: ExperienciaLB = null; // inicializar con un objeto vacío


  constructor(private sExperiencia: SExperienciaLBService, private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sExperiencia.detail(id)
      .pipe(
        catchError(err => {
          alert("Error al modificar experiencia");
          return of(null);
        })
      )
      .subscribe(
        data => {
          this.expLab = data;
        }
      )
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sExperiencia.update(id, this.expLab)
      .pipe(
        catchError(err => {
          alert("Error al modificar experiencia");
          return of(null);
        })
      )
      .subscribe(
        data => {
          this.router.navigate(['']);
          setTimeout(() => {
            this.router.navigateByUrl('/#experiencia');
          }, 300);
        }
      )
  }

}