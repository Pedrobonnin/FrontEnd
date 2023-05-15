import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tool } from '../model/tool';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  toolURL = environment.URL+'tool/';

  constructor(private httpClient:HttpClient) {}
    
  public lista():Observable<Tool[]> {
    return this.httpClient.get<Tool[]>(this.toolURL+'listar/'); 
  }

  public detail(id:number):Observable<Tool> {
    return this.httpClient.get<Tool>(this.toolURL+ `detail/${id}`);
  }

  public save(proyecto:Tool):Observable<any> {
    return this.httpClient.post<any>(this.toolURL+ 'create/',proyecto);
  }

  public update(id:number, proyecto:Tool):Observable<any> {
    return this.httpClient.put<any>(this.toolURL+ `update/${id}`,proyecto);
  }
  
  public delete(id:number):Observable<any> {
    return this.httpClient.delete<any>(this.toolURL+ `delete/${id}`);
  }
}
