import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Contacto } from 'src/app/model/contacto';
import { ContactoService } from 'src/app/service/contacto.service';

@Component({
  selector: 'app-edit-contacto',
  templateUrl: './edit-contacto.component.html',
  styleUrls: ['./edit-contacto.component.css']
})
export class EditContactoComponent {
  contacto: Contacto = null; // inicializar con un objeto vacío


  constructor(private sContacto: ContactoService, private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sContacto.detail(id)
      .pipe(
        catchError(err => {
          alert("Error al modificar 'Contacto'");
          return of(null);
        })
      )
      .subscribe(
        data => {
          this.contacto = data;
        }
      )
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sContacto.update(id, this.contacto)
      .pipe(
        catchError(err => {
          alert("Error al modificar 'Contacto'");
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
