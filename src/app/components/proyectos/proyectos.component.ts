import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {

  proy:Proyecto[]=[];
  proyConImg: Proyecto[];
  otherProy: Proyecto[];


  isLogged=false;
  
  constructor(private sProyecto: ProyectoService, private tokenService:TokenService, public imageService : ImageService){}
  
  ngOnInit():void{
    this.cargaProyecto();
    
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  cargaProyecto():void{
    this.sProyecto.lista().subscribe(
      data => {
        this.proy = data;
        // Filtra los proyectos que tienen una imagen y los asigna a proyConImg
        this.proyConImg = this.proy.filter(proyecto => proyecto.imgUrlProy);
        // filtra los proyectos que no tienen una imagen y los asigna a otherProy
        this.otherProy = this.proy.filter(proyecto => !proyecto.imgUrlProy);
      }
    )
  }
  
 

  delete(id?: number) {
    if (id !== undefined) {
      const proyecto = this.proy.find(proyecto => proyecto.idProy === id);
      if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
        this.sProyecto.delete(id)
        .pipe(
          catchError(err => {
            alert('No se pudo borrar el proyecto');
            return of(null);
          })
        )
        .subscribe(
          dat => {
            this.cargaProyecto();
            const name = proyecto.imgUrlProy;
            this.DeleteImage(name);
          }
        );
      }
    }
  }


  DeleteImage(name:string){
    const imageName = name.split('|')[1].trim();
    this.imageService.deleteImage(imageName);
    console.log("imagen de proyecto ", imageName, "eliminada");
  }


  public isCursorOnDeleteButton = false;
}