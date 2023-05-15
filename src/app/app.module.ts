import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoAPComponent } from './components/logo-ap/logo-ap.component';
import { RedesComponent } from './components/redes/redes.component';
import { NavegarComponent } from './components/navegar/navegar.component';
import { MainComponent } from './components/main/main.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HysComponent } from './components/hys/hys.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { interceptProvider } from './service/interceptor-service';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { NewExperienciaComponent } from './components/experiencia/new-experiencia.component';
import { EditExpeComponent } from './components/experiencia/edit-expe.component';
import { EditSkillComponent } from './components/hys/edit-skill.component';
import { NewSkillComponent } from './components/hys/new-skill.component';
import { EditPerfilComponent } from './components/main/edit-perfil.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { EditAcercaDeComponent } from './components/acerca-de/edit-acerca-de.component';
import { NewProyectoComponent } from './components/proyectos/new-proyecto.component';
import { EditProyectoComponent } from './components/proyectos/edit-proyecto.component';
import { NewToolComponent } from './components/acerca-de/new-tool.component';
import { EditToolComponent } from './components/acerca-de/edit-tool.component';
import { EstudioComponent } from './components/estudio/estudio.component';
import { EditEstudioComponent } from './components/estudio/edit-estudio.component';
import { NewEstudioComponent } from './components/estudio/new-estudio.component';
import { EditRedComponent } from './components/redes/edit-red.component';
import { NewRedComponent } from './components/redes/new-red.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { EditContactoComponent } from './components/contact/edit-contacto.component';





@NgModule({
  
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoAPComponent,
    RedesComponent,
    NavegarComponent,
    MainComponent,
    AcercaDeComponent,
    HysComponent,
    ProyectosComponent,
    ContactComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ExperienciaComponent,
    NewExperienciaComponent,
    EditExpeComponent,
    EditSkillComponent,
    NewSkillComponent,
    EditPerfilComponent,
    EditAcercaDeComponent,
    NewProyectoComponent,
    EditProyectoComponent,
    NewToolComponent,
    EditToolComponent,
    EstudioComponent,
    EditEstudioComponent,
    NewEstudioComponent,
    EditRedComponent,
    NewRedComponent,
    EditContactoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot({}),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ColorPickerModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
    
  ],
  
  providers: [
    interceptProvider,
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
