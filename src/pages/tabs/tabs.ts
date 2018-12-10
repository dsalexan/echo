import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';
import { InicialCaronaPage } from '../../pages/inicial-carona/inicial-carona';
import { InicialGradePage } from '../../pages/inicial-grade/inicial-grade';
import { InicialDivulgacaoPage } from '../../pages/inicial-divulgacao/inicial-divulgacao';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  homePage = HomePage
  gradePage = InicialGradePage
  caronasPage = InicialCaronaPage
  divulgacaoPage = InicialDivulgacaoPage

  badges = {
    grade: 0,
    caronas: 1,
    divulgacao: 37
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.setRoot(LoginPage);
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewDidLoad() {
    
  }

}
