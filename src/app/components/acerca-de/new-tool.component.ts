import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tool } from 'src/app/model/tool';
import { ToolService } from 'src/app/service/tool.service';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-new-tool',
  templateUrl: './new-tool.component.html',
  styleUrls: ['./new-tool.component.css']
})
export class NewToolComponent {

  tool:string = "";
  

  constructor(private sTool: ToolService, private router: Router) { }

  ngOnInit(): void {
  }


  onCreate(): void {
    const tl = new Tool(this.tool);
    console.log(tl);
    this.sTool.save(tl)
    .pipe(
      catchError(err => {
        alert("Falló");
        return of(null);
      })
    )
    .subscribe(data => {
      if (data) {
        alert("Tecnologia añadida");
        this.router.navigate(['/'], { fragment: 'acerca-de' });
      }
    });
  }
}
