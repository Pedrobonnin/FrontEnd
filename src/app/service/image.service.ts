import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, list, ref, uploadBytes, deleteObject } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  selectedImageUrl: string = '';
  url: string = '';
  selectedImageName: string = '';

  constructor(private storage: Storage) { }

  public uploadImage($event: any, name: string) {
    const file = $event.target.files[0];
    this.selectedImageName = name; // Asignar valor a la propiedad
    const imgRef = ref(this.storage, `imagen/` + name);
    uploadBytes(imgRef, file)
      .then(response => { this.getImages() })
      .catch(error => console.log(error))

  }

  getImages() {
    const imagesRef = ref(this.storage, 'imagen');
    list(imagesRef)
      .then(async response => {
        const images = await Promise.all(response.items.map(async item => {
          const urla = await getDownloadURL(item);
          const name = item.name;
          const url = `${urla} | ${name}`;
          // console.log("La URL con nombre es:", url);
          if (name === this.selectedImageName) {
            this.url = url;    
          }
        }));
      })
      .catch(error => console.log(error));
  }

  deleteImage(fileName: string) {
    const fileRef = ref(this.storage, `imagen/${fileName}`);
    deleteObject(fileRef)
      .then(() => {
        console.log(`El archivo ${fileName} ha sido eliminado satisfactoriamente.`);
      })
      .catch((error) => {
        console.log(`Error al eliminar el archivo ${fileName}: ${error.message}`);
      });
  }

}