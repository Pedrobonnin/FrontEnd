import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienciaLB } from 'src/app/model/experiencia-lb';
import { SExperienciaLBService } from 'src/app/service/s-experiencia-lb.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css']
})
export class NewExperienciaComponent {
  puesto:string = "";
  empresa:string = "";
  tiempo:string = "";
  contacto:string = "";

  constructor(private sExperiencia: SExperienciaLBService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const expe = new ExperienciaLB(this.puesto, this.empresa,this.tiempo,this.contacto);
    console.log(expe);
    this.sExperiencia.save(expe)
    .pipe(
      catchError(err => {
        alert("Falló");
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