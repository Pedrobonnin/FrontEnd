import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent {
  proy: Proyecto = null;

  // idProy:number;
  nameProy:string;
  detailsProy:string;
  repoUrlProy:string;
  siteUrlProy:string;
  imgUrlProy:string;
  toolsProy:string;
  nextId:number = 0;
  

  constructor(private proyService:ProyectoService, private activatedRouter: ActivatedRoute,
    private router: Router, public imageService : ImageService){}

  ngOnInit():void{
    this.proyService.lista()
    .pipe(
      catchError(err => {
        alert("Error al obtener la lista de proyectos");
        return of(null);
      })
    )
    .subscribe(
      proyectos => {
        this.nextId = proyectos.length + 1;
      }
    )
  }

  onCreate(): void {
    const proyec = new Proyecto( this.nameProy, this.detailsProy, this.repoUrlProy, this.siteUrlProy, this.imgUrlProy , this.toolsProy);
    this.imgUrlProy = this.hasSelectedFile() ? this.imageService.url : this.imgUrlProy;
    console.log(proyec);
    this.proyService.save(proyec)
    .pipe(
      catchError(err => {
        alert("Falló");
        return of(null);
      })
    )
    .subscribe(data => {
      if (data) {
        alert("Proyecto añadido");
        this.router.navigate(['/'], { fragment: 'proyect' });
      }
    });
  }

  UploadImage($event:any){
    const name = "imgProy_" + this.nextId.toString();
    this.imageService.uploadImage($event, name);
  }

  DeleteImage(name:string){
    if (confirm('¿Estás seguro de que deseas quitar la imagen del proyecto?')) {
      const imageName = name.split('|')[1].trim();
      this.imageService.deleteImage(imageName);
      console.log("imagen de proyecto ", imageName, "eliminada");
      this.imageService.url = null
    }
  }


  checkLength(inputId: string, maxLength: number) {
    const input = document.getElementById(inputId) as HTMLInputElement; // obtiene el input
    if (input.value.length > maxLength) {
      alert('La cantidad máxima de caracteres permitidos es ' + maxLength);
      input.value = input.value.substring(0, maxLength); // recorta el texto a la cantidad máxima permitida
    }
  }

  hasSelectedFile(): boolean {
    const input = document.getElementById('imgProy') as HTMLInputElement;
    return input.files && input.files.length > 0;
  }

  public isCursorOnDeleteButton = false;
}
