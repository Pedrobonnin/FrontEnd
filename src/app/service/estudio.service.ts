import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estudio } from '../model/estudio';

@Injectable({
  providedIn: 'root'
})
export class EstudioService {

  studyURL = environment.URL+'estudios/';
  
  constructor(private httpClient:HttpClient) {}
    
 
 
  public lista():Observable<Estudio[]> {
    return this.httpClient.get<Estudio[]>(this.studyURL+'listar/');
    
  }
  public detail(id:number):Observable<Estudio> {
    return this.httpClient.get<Estudio>(this.studyURL+ `detail/${id}`);
  }

  public save(estudio:Estudio):Observable<any> {
    return this.httpClient.post<any>(this.studyURL+ 'create/',estudio);
  }

  public update(id:number, estudio:Estudio):Observable<any> {
    return this.httpClient.put<any>(this.studyURL+ `update/${id}`,estudio);
  }
  
  public delete(id:number):Observable<any> {
    return this.httpClient.delete<any>(this.studyURL+ `delete/${id}`);
  }


}
