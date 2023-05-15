import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';



@Component({
  selector: 'app-navegar',
  templateUrl: './navegar.component.html',
  styleUrls: ['./navegar.component.css']
})

export class NavegarComponent {
   
    persona: persona = null;
    isLogged = false;

    constructor(public personaService: PersonaService, private router:Router, private tokenService:TokenService){}

    ngOnInit():void{
      this.cargarPersona();
      this.menuBtn = document.querySelector('.hamburger');
      this.menuBar = document.querySelector('.menu-bar');
      this.menuList = document.querySelector('.nav-menu');
      this.menuBtn.addEventListener('click', this.showMenu);

    

      if(this.tokenService.getToken()){
        this.isLogged = true;
      }else{
        this.isLogged = false;
      }
    }

    onLogOut():void{
      this.tokenService.logOut();
      window.location.reload();
    }


    cargarPersona(){
      this.personaService.detail(1).subscribe(data => 
        {this.persona = data}
        )
    }
    
    
  

    menuBtn: any;
    menuBar: any;
    menuList: any;
  
    
    showMenu = () => {
      this.menuBtn.classList.toggle('is-active');
      this.menuBar.classList.toggle('is-active');
      this.menuList.classList.toggle('is-active');
    }
}

