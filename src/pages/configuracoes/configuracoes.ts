import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, Nav } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
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
