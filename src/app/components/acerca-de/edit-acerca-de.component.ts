import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AcercaDe } from 'src/app/model/acerca-de';
import { AcercaDeService } from 'src/app/service/acerca-de.service';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-edit-acerca-de',
  templateUrl: './edit-acerca-de.component.html',
  styleUrls: ['./edit-acerca-de.component.css']
})
export class EditAcercaDeComponent {
  acercaDe: AcercaDe = null;


  constructor(private acercaDeService: AcercaDeService, private activatedRouter: ActivatedRoute,
    private router: Router, public imageService: ImageService) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.acercaDeService.detail(id).subscribe(
      data => {
        this.acercaDe = data;
      }, err => {
        alert('Error al modificar "Acerca de"');
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.updateAcercaDe(id);
    this.router.navigate(['']);
    setTimeout(() => {
      this.router.navigateByUrl('');
    }, 300);
  }


  updateAcercaDe(id: number): void {
    this.acercaDe.imgPerfil = this.hasSelectedFile() ? this.imageService.url : this.acercaDe.imgPerfil;
    this.acercaDeService.update(id, this.acercaDe)
      .pipe(
        catchError(err => {
          alert("Error al modificar 'Acerca de'");
          return of(null);
        })
      )
      .subscribe(
        (data) => {
          // Manejar la respuesta de la llamada a update()
        }
      );
  }


  DeleteImage(name: string | undefined) {
    if (confirm('¿Estás seguro de que deseas eliminar La Foto de Perfil?\n(esta acción es irreversible)')) {
      this.acercaDe.imgPerfil = null;
      this.imageService.url = null;
      const id = this.activatedRouter.snapshot.params['id'];
      const imageName = name && name.split('|')[1]?.trim(); // verifica que name no sea undefined y que tenga la estructura esperada
      if (imageName) {
        this.imageService.deleteImage(imageName);
        const id = this.activatedRouter.snapshot.params['id'];
        this.updateAcercaDe(id);
      }
    }
  }


  hasSelectedFile(): boolean {
    const input = document.getElementById('img') as HTMLInputElement;
    return input.files && input.files.length > 0;
  }

  UploadImage($event: any) {
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "img-perfil_" + id;
    this.imageService.uploadImage($event, name)
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
