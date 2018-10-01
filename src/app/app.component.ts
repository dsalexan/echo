import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { PerfilPage } from '../pages/perfil/perfil';
import { LoginPage } from '../pages/login/login';
import { ConfigPage } from '../pages/configuracoes/configuracoes';
import { UtilidadesPage } from '../pages/utilidades/utilidades';

import { HomePage } from '../pages/home/home';
// import { GradePage } from '../pages/grade/grade';
// import { CaronaPage } from '../pages/carona/carona';
import { InicialCaronaPage } from '../pages/inicial-carona/inicial-carona';


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
    // this.nav.push(GradePage)
  }

  clickCarona() {
    // this.nav.push(CaronaPage)
  }

  clickPerfil() {
    this.nav.push(PerfilPage);
  }

  clickConfiguracoes() {
    this.nav.push(ConfigPage);
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
}
