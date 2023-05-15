import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewExperienciaComponent } from './components/experiencia/new-experiencia.component';
import { EditExpeComponent } from './components/experiencia/edit-expe.component';
import { NewSkillComponent } from './components/hys/new-skill.component';
import { EditSkillComponent } from './components/hys/edit-skill.component';
import { EditPerfilComponent } from './components/main/edit-perfil.component';
import { EditAcercaDeComponent } from './components/acerca-de/edit-acerca-de.component';
import { NewProyectoComponent } from './components/proyectos/new-proyecto.component';
import { EditProyectoComponent } from './components/proyectos/edit-proyecto.component';
import { NewToolComponent } from './components/acerca-de/new-tool.component';
import { EditToolComponent } from './components/acerca-de/edit-tool.component';
import { NewEstudioComponent } from './components/estudio/new-estudio.component';
import { EditEstudioComponent } from './components/estudio/edit-estudio.component';
import { NewRedComponent } from './components/redes/new-red.component';
import { EditRedComponent } from './components/redes/edit-red.component';

// import { NewRedComponent } from './components/redes/new-red.component';
import { EditContactoComponent } from './components/contact/edit-contacto.component';



const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'nuevaexp', component:NewExperienciaComponent},
  {path:'editexp/:id', component:EditExpeComponent},
  {path:'newskill', component:NewSkillComponent},
  {path:'editskill/:id', component:EditSkillComponent },
  {path:'newskill', component:NewSkillComponent},
  {path:'editPerfil/:id', component:EditPerfilComponent },
  {path:'editAcercaDe/:id', component:EditAcercaDeComponent }, 
  {path:'nuevoproy', component:NewProyectoComponent  },
  {path:'editproy/:id', component:EditProyectoComponent },
  {path:'nuevatool', component:NewToolComponent  },
  {path:'editTool/:id', component:EditToolComponent },
  {path:'nuevoEstudio', component:NewEstudioComponent  },
  {path:'editestudio/:id', component:EditEstudioComponent },
  {path:'nuevared', component:NewRedComponent  },
  {path:'editred/:id', component:EditRedComponent },

  // {path:'nuevared', component:NewRedComponent  },
  {path:'editContacto/:id', component:EditContactoComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
