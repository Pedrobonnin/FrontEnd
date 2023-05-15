import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AcercaDe } from '../model/acerca-de';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcercaDeService {

  URL = environment.URL+'sobremi/';
  constructor(private httpClient : HttpClient) { }

  public getPersona():Observable<AcercaDe>{
    return this.httpClient.get<AcercaDe>(this.URL+'listar/');
  }

  
  public detail(id:number):Observable<AcercaDe> {
    return this.httpClient.get<AcercaDe>(this.URL+ `detail/${id}`);
  }

  // public save(acercaDe:AcercaDe):Observable<any> {
  //   return this.httpClient.post<any>(this.URL+ 'create/',acercaDe);
  // }

  public update(id : number, acercaDe: AcercaDe): Observable<any> {
    return this.httpClient.put<any>(this.URL + `update/${id}`, acercaDe);
  }
  
  public delete(id:number):Observable<any> {
    return this.httpClient.delete<any>(this.URL+ `delete/${id}`);
  }

  
}
