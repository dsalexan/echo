import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ProcurarCaronaPage } from '../procurar-carona/procurar-carona';
import { OferecerCaronaPage } from '../oferecer-carona/oferecer-carona';
import { MinhasCaronasPage } from '../minhas-caronas/minhas-caronas';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-inicial-carona',
  templateUrl: 'inicial-carona.html',
})
export class InicialCaronaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewWillEnter() {
    this.checkSession();
  }

  clickOferecerCarona() { // vai para a pagina de configurações
    this.navCtrl.push(OferecerCaronaPage);
  }

  clickProcurarCarona() { // vai para a pagina de configurações
    this.navCtrl.push(ProcurarCaronaPage);
  }

  clickMinhasCaronas(){
    this.navCtrl.push(MinhasCaronasPage);
  }
}
