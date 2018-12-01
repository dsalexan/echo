import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { PerfilPage } from '../pages/perfil/perfil';
import { LoginPage } from '../pages/login/login';
import { UtilidadesPage } from '../pages/utilidades/utilidades';
import { BugReportPage } from '../pages/bug-report/bug-report';

import { HomePage } from '../pages/home/home';
import { TurmaPage } from '../pages/turma/turma';
import { InicialCaronaPage } from '../pages/inicial-carona/inicial-carona';
import { InicialGradePage } from '../pages/inicial-grade/inicial-grade';
import { InicialDivulgacaoPage } from '../pages/inicial-divulgacao/inicial-divulgacao';
import { MensagemPage } from '../pages/mensagem/mensagem';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  clickHome() {
    this.nav.push(HomePage)
  }

  clickGrade() {
    this.nav.push(InicialGradePage)
  }

  clickPerfil() {
    this.nav.push(PerfilPage);
  }

  clickMensagens(){
    this.nav.push(MensagemPage);
  }

  clickBugReport() {
    this.nav.push(BugReportPage);
  }

  clickLogout() {
    this.storage.clear();
    this.nav.push(LoginPage);
  }

  clickUtilidade(){
    this.nav.push(UtilidadesPage);
  }
  clickCaronas() {
    this.nav.push(InicialCaronaPage);
  }

  clickDivulgacao() {
    this.nav.push(InicialDivulgacaoPage);
  }

  clickTurma(){
    this.nav.push(TurmaPage)
  }

}
