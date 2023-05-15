import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExperienciaLB } from '../model/experiencia-lb';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SExperienciaLBService {
  expURL = environment.URL+'explab/';
  
  constructor(private httpClient:HttpClient) {}
    
 
 
  public lista():Observable<ExperienciaLB[]> {
    return this.httpClient.get<ExperienciaLB[]>(this.expURL+'listar/');
    
  }
  public detail(id:number):Observable<ExperienciaLB> {
    return this.httpClient.get<ExperienciaLB>(this.expURL+ `detail/${id}`);
  }

  public save(experiencia:ExperienciaLB):Observable<any> {
    return this.httpClient.post<any>(this.expURL+ 'create/',experiencia);
  }

  public update(id:number, experiencia:ExperienciaLB):Observable<any> {
    return this.httpClient.put<any>(this.expURL+ `update/${id}`,experiencia);
  }
  
  public delete(id:number):Observable<any> {
    return this.httpClient.delete<any>(this.expURL+ `delete/${id}`);
  }

  
}
