import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Tool } from 'src/app/model/tool';
import { ToolService } from 'src/app/service/tool.service';

@Component({
  selector: 'app-edit-tool',
  templateUrl: './edit-tool.component.html',
  styleUrls: ['./new-tool.component.css']
})
export class EditToolComponent {
  tl: Tool = null; // inicializar con un objeto vacío


  constructor(private sTool: ToolService, private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sTool.detail(id)
    .pipe(
      catchError(err => {
        alert("Falló la carga de la Tecnologia");
        return of(null);
      })
    )
      .subscribe(
        data => {
          this.tl = data;
        }
      )
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sTool.update(id, this.tl)
      .pipe(
        catchError(err => {
          alert("Error al modificar Tecnologia");
          return of(null);
        })
      )
      .subscribe(
        data => {
          this.router.navigate(['']);
          setTimeout(() => {
            this.router.navigateByUrl('');
          }, 300);
        }
      )
  }


  checkLength(inputId: string, maxLength: number) {
    const input = document.getElementById(inputId) as HTMLInputElement; // obtiene el input
    if (input.value.length > maxLength) {
      alert('La cantidad máxima de caracteres permitidos es ' + maxLength);
      input.value = input.value.substring(0, maxLength); // recorta el texto a la cantidad máxima permitida
    }
  }

}
