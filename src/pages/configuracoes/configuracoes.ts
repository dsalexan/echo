import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';

/* NÃO REMOVER
import { editProfile } from 'caminho editProfile';
import { editNotific } from 'caminho editNotific';
import { editArm } from 'caminho editArm';
import { ajuda } from 'caminho ajuda';
import { logout } from 'caminho logout';
*/


@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfigPage {
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewDidLoad() {
    this.checkSession();
  }
  
/* METODOS PARA NAVEGAÇÃO ENTRE AS TELAS DE CONFIGURAÇÃO --NAO REMOVER
  clickConta(){
    this.nav.push(editProfile);
  }

  clickNot(){
    this.nav.push(editNotific);
  }

  clickDados(){
    this.nav.push(editArm);
  }

  clickAjuda(){
    this.nav.push(ajuda);
  }

  clickLogout(){
    this.nav.push(logout);
  } */
}
