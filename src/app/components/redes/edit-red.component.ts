import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Redes } from 'src/app/model/redes';
import { ImageService } from 'src/app/service/image.service';
import { RedesService } from 'src/app/service/redes.service';

@Component({
  selector: 'app-edit-red',
  templateUrl: './edit-red.component.html',
  styleUrls: ['./new-red.component.css']
})
export class EditRedComponent {
  
  red: Redes = null;
 

  constructor(private sRed:RedesService, private activatedRouter: ActivatedRoute,
    private router: Router, public imageService : ImageService){}

  ngOnInit():void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.sRed.detail(id).subscribe(
      data =>{
        this.red = data;
      }, err =>{
        alert('Error al modificar "Acerca de"');
        this.router.navigate(['']);
      }
    )
  }


  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.red.urlRedImg = this.hasSelectedFile() ? this.imageService.url : this.red.urlRedImg;
  
    this.sRed.update(id, this.red).subscribe(
      data => {
        this.router.navigate(['']);
        setTimeout(() => {
          this.router.navigateByUrl('');
        }, 300);
      }, err => {
        alert("Error al modificar Red");     
      }
    );
  }

  hasSelectedFile(): boolean {
    const input = document.getElementById('imgRed') as HTMLInputElement;
    return input.files && input.files.length > 0;
  }

  UploadImage($event:any){
     const id = this.activatedRouter.snapshot.params['id'];
     const name = "imgLogoRed_" + id;
     this.imageService.uploadImage($event, name)
  
  }
}
