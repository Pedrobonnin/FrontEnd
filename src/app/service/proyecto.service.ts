import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../model/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

    proyURL = environment.URL+'proyectos/';


  
  constructor(private httpClient:HttpClient) {}
    
 
 
  public lista():Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(this.proyURL+'listar/');
    
  }
  public detail(id:number):Observable<Proyecto> {
    return this.httpClient.get<Proyecto>(this.proyURL+ `detail/${id}`);
  }

  public save(proyecto:Proyecto):Observable<any> {
    return this.httpClient.post<any>(this.proyURL+ 'create/',proyecto);
  }

  public update(id:number, proyecto:Proyecto):Observable<any> {
    return this.httpClient.put<any>(this.proyURL+ `update/${id}`,proyecto);
  }
  
  public delete(id:number):Observable<any> {
    return this.httpClient.delete<any>(this.proyURL+ `delete/${id}`);
  }
  
}
