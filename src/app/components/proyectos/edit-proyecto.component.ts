import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { PersonaService } from 'src/app/service/persona.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class EditProyectoComponent {

  prov: Proyecto = null;


  constructor(private sProyecto: ProyectoService, private activatedRouter: ActivatedRoute,
    private router: Router, public imageService: ImageService) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sProyecto.detail(id).subscribe(
      data => {
        this.prov = data;
      }, err => {
        alert('Error al modificar "Acerca de"');
        this.router.navigate(['']);
      }
    )
  }


  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.prov.imgUrlProy = this.hasSelectedFile() ? this.imageService.url : this.prov.imgUrlProy;

    this.sProyecto.update(id, this.prov)
      .pipe(
        catchError(err => {
          alert("Error al modificar Proyecto");
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
      );
  }

  hasSelectedFile(): boolean {
    const input = document.getElementById('imgProy') as HTMLInputElement;
    return input.files && input.files.length > 0;
  }

  UploadImage($event: any) {
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "imgProy_" + id;
    this.imageService.uploadImage($event, name)

  }


  DeleteImage(name: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar la imagen del proyecto?\n(esta acción es irreversible)')) {
      this.imageService.url = null; // establece la propiedad url de imageService en null después de eliminar la imagen
      this.prov.imgUrlProy = null;
      const id = this.activatedRouter.snapshot.params['id'];
      const imageName = name && name.split('|')[1]?.trim(); // verifica que name no sea undefined y que tenga la estructura esperada
      if (imageName) {
        this.imageService.deleteImage(imageName);
        this.sProyecto.update(id, this.prov).subscribe(
          data => {
          }
        );
      }
    }

  }

  checkLength(inputId: string, maxLength: number) {
    const input = document.getElementById(inputId) as HTMLInputElement; // obtiene el input
    if (input.value.length > maxLength) {
      alert('La cantidad máxima de caracteres permitidos es ' + maxLength);
      input.value = input.value.substring(0, maxLength); // recorta el texto a la cantidad máxima permitida
    }
  }

  public isCursorOnDeleteButton = false;
}
