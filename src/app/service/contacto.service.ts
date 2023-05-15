import { Injectable } from '@angular/core';
import { Contacto } from '../model/contacto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  contURL = environment.URL+'contacto/';

  constructor(private httpClient:HttpClient) {}
    
  public lista():Observable<Contacto[]> {
    return this.httpClient.get<Contacto[]>(this.contURL+'listar/'); 
  }

  public detail(id:number):Observable<Contacto> {
    return this.httpClient.get<Contacto>(this.contURL+ `detail/${id}`);
  }

  public save(contacto:Contacto):Observable<any> {
    return this.httpClient.post<any>(this.contURL+ 'create/',contacto);
  }

  public update(id:number, contacto:Contacto):Observable<any> {
    return this.httpClient.put<any>(this.contURL+ `update/${id}`,contacto);
  }
  
  public delete(id:number):Observable<any> {
    return this.httpClient.delete<any>(this.contURL+ `delete/${id}`);
  }

}
