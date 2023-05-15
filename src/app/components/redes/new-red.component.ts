import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Redes } from 'src/app/model/redes';
import { ImageService } from 'src/app/service/image.service';
import { RedesService } from 'src/app/service/redes.service';

@Component({
  selector: 'app-new-red',
  templateUrl: './new-red.component.html',
  styleUrls: ['./new-red.component.css']
})
export class NewRedComponent {
  red: Redes = null;

  // idProy:number;
  urlRed:string;
  urlRedImg:string;
 
  nextId:number = 0;
  

  constructor(private sRed:RedesService, private activatedRouter: ActivatedRoute,
    private router: Router, public imageService : ImageService){}

  ngOnInit():void{
    this.sRed.lista().subscribe(
      red => {
        this.nextId = red.length + 1;
      }, err =>{
        alert("Error al obtener la lista de redes");
        this.router.navigate(['']);
      }
    )
  }

  onCreate(): void {
    const red = new Redes( this.urlRed, this.urlRedImg = this.imageService.url);
    console.log(red);
    this.sRed.save(red)
    .pipe(
      catchError(err => {
        alert("Falló");
        return of(null);
      })
    )
    .subscribe(data => {
      if (data) {
        alert("Red añadida");
        this.router.navigate(['/'], { fragment: '' });
      }
    });
  }

  UploadImage($event:any){
    const name = "imgLogoRed_" + this.nextId.toString();
    this.imageService.uploadImage($event, name);
  }

}
