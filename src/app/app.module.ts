import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { PerfilPage } from '../pages/perfil/perfil';
import { ConfigPage } from '../pages/configuracoes/configuracoes';
import { UtilidadesPage} from '../pages/utilidades/utilidades';
import { HomePage } from '../pages/home/home';
import { InicialCaronaPage } from '../pages/inicial-carona/inicial-carona';
import { OferecerCaronaPage } from '../pages/oferecer-carona/oferecer-carona';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { CalendarModule } from "ion2-calendar";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CadastroPage,
    PerfilPage,
    ConfigPage,
    UtilidadesPage,
    HomePage,
    InicialCaronaPage,
    OferecerCaronaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CadastroPage,
    PerfilPage,
    ConfigPage,
    UtilidadesPage,
    HomePage,
    InicialCaronaPage,
    OferecerCaronaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}