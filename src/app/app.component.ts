import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { PerfilPage } from '../pages/perfil/perfil';
import { LoginPage } from '../pages/login/login';
import { ConfigPage } from '../pages/configuracoes/configuracoes';
import { InicialCaronaPage } from '../pages/inicial-carona/inicial-carona';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
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

  clickCaronas() {
    this.nav.push(InicialCaronaPage);
  }
}
