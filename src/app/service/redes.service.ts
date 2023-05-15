import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Redes } from '../model/redes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedesService {

  redesURL = environment.URL+'redes/';


  
  constructor(private httpClient:HttpClient) {}
    
 
 
  public lista():Observable<Redes[]> {
    return this.httpClient.get<Redes[]>(this.redesURL+'listar/');    
  }

  public detail(id:number):Observable<Redes> {
    return this.httpClient.get<Redes>(this.redesURL+ `detail/${id}`);
  }

  public save(redes:Redes):Observable<any> {
    return this.httpClient.post<any>(this.redesURL+ 'create/',redes);
  }

  public update(id:number, redes:Redes):Observable<any> {
    return this.httpClient.put<any>(this.redesURL+ `update/${id}`,redes);
  }
  
  public delete(id:number):Observable<any> {
    return this.httpClient.delete<any>(this.redesURL+ `delete/${id}`);
  }
}
