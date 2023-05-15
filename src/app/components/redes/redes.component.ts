import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Redes } from 'src/app/model/redes';
import { ImageService } from 'src/app/service/image.service';
import { RedesService } from 'src/app/service/redes.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.css']
})
export class RedesComponent {
  red:Redes[]=[];
 
  

  isLogged=false;
  
  constructor(private sRedes: RedesService, private tokenService:TokenService, public imageService : ImageService){}
  
  ngOnInit():void{
    this.cargaProyecto();
 
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  cargaProyecto():void{
    this.sRedes.lista().subscribe(
      data => {
        this.red = data;
        // console.log("Elementos de la lista de redes:", this.red);
      }
      
    )
  }

  
  delete(id?: number) {
    if (id !== undefined) {
      const redes = this.red.find(redes => redes.idRed === id);
      const name = redes.urlRedImg;
      if (confirm('¿Estás seguro de que deseas eliminar esta red?')) {
        this.sRedes.delete(id)
        .pipe(
          catchError(err => {
            alert("No se pudo borrar la red");
            return of(null);
          })
        )
        .subscribe(
          dat => {
            this.cargaProyecto();         
            this.DeleteImage(name);
          }
        );
      }
    }
  }


  DeleteImage(name:string){
    const imageName = name.split('|')[1].trim();
    this.imageService.deleteImage(imageName);
  }

  public isCursorOnDeleteButton = false;

}
