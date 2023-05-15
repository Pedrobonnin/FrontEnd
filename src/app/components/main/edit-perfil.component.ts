import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { persona } from 'src/app/model/persona.model';
import { ImageService } from 'src/app/service/image.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.component.html',
  styleUrls: ['./edit-perfil.component.css']
})
export class EditPerfilComponent {
  persona: persona = null;

  constructor(private personaService: PersonaService, private activatedRouter: ActivatedRoute,
    private router: Router, public imageService: ImageService) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.personaService.detail(id)
    .pipe(
      catchError(err => {
        alert("Error al modificar 'Persona'");
        return of(null);
      })
    )
    .subscribe(
      data => {
        this.persona = data;
      }
    )
  }


  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.persona.imglogo = this.hasSelectedFile() ? this.imageService.url : this.persona.imglogo;
    this.personaService.update(id, this.persona)
    .pipe(
      catchError(err => {
        alert("Error al modificar 'Persona'");
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

  hasSelectedFile(): boolean {
    const input = document.getElementById('img') as HTMLInputElement;
    return input.files && input.files.length > 0;
  }


  UploadImage($event: any) {
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "logo_" + id;
    this.imageService.uploadImage($event, name)

  }


  DeleteImage(name: string | undefined) {
    if (confirm('¿Estás seguro de que deseas eliminar el Logo?\n(esta acción es irreversible)')) {
      this.persona.imglogo = null;
      this.imageService.url = null;
      const id = this.activatedRouter.snapshot.params['id'];
      const imageName = name && name.split('|')[1]?.trim();
      if (imageName) {
        this.imageService.deleteImage(imageName);
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
