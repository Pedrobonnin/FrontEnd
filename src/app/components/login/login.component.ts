import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { persona } from 'src/app/model/persona.model';
import { AuthService } from 'src/app/service/auth.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  persona: persona = null;
  
  

  isLogged = false;
  isLoggedFail = false;
  loginUsuario!:LoginUsuario;
  nombreUsuario!:string;
  password!:string;
  roles:string[]=[];
  errMsj!:string;


  constructor(public personaService: PersonaService, private tokenService:TokenService, private authService: AuthService, private  router: Router){
  }
  ngOnInit():void{
    this.cargarPersona()
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoggedFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }
  onLogin():void{
    
    this.loginUsuario = new LoginUsuario(this.nombreUsuario,this.password); 
    this.authService.login(this.loginUsuario)
    .pipe(
      catchError(err => {
        this.isLogged = false;
        this.isLoggedFail = true;
        this.errMsj = err.error.mensaje;
        console.log(this.errMsj); 
        return of(null);
      })
    )
    .subscribe(data=>{
        this.isLogged = true;
        this.isLoggedFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate([''])
      }
    )
  }

  cargarPersona(){
    this.personaService.detail(1).subscribe(data => 
      {this.persona = data}
      )
  }
}
