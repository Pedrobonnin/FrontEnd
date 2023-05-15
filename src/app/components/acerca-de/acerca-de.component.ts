import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { AcercaDe } from 'src/app/model/acerca-de';
import { persona } from 'src/app/model/persona.model';
import { Tool } from 'src/app/model/tool';
import { AcercaDeService } from 'src/app/service/acerca-de.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
import { ToolService } from 'src/app/service/tool.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent {
  acercaDe: AcercaDe = null;
  tl: Tool[] = [];

  isLogged = false;

  constructor(public s_acercaDe: AcercaDeService, public sTool: ToolService, private tokenService: TokenService) { }



  ngOnInit(): void {
    this.cargaAcercaDe();
    this.cargaTool();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }


  cargaAcercaDe(): void {
    this.s_acercaDe.detail(1).subscribe(
      data => { this.acercaDe = data; }
    )

  }

  cargaTool(): void {
    this.sTool.lista().subscribe(
      data => { this.tl = data; }
    )
  }

 


  delete(id?: number) {
    if (id != undefined) {
      if(confirm("¿Está seguro de que desea eliminar esta herramienta?")) {
        this.sTool.delete(id)
        .pipe(
          catchError(err => {
            alert("Falló la Eliminacion");
            return of(null);
          })
        )
        .subscribe(
          dat => {
            this.cargaTool();
          }
          
        )
      }
    }
  }

  public isCursorOnDeleteButton = false;


}
