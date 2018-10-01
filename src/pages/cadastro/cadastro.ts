import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  dados = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.dados = navParams.get('dados');
  }

  checkSession() {
    this.storage.get("usuario").then((usu) => {
      this.storage.get("senha").then((sen) => {
        if(usu == null && sen == null){
          this.navCtrl.push(LoginPage);
        }
      })
    })
  }

  ionViewDidLoad() {
    this.checkSession()
    console.log('ionViewDidLoad CadastroPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

  storeEmail(email) {
    this.storage.set("email", email)
  }

  clickCadastrar() {
    this.storeEmail(this.dados["email"])

    // if (this.dados["email"]) {
    //   this.storage.get("usuario").then((usuario) => {
    //     console.log('nomeee', usuario)
    //   });
    // }

    // enviar requisicao do tipo /api/auth/login com usuario, senha e email

    // cadastrar usuário no banco usando this.dados["usuario/senha/email"]
    // criar sessão como se o usuário tivesse logado
    // this.navCtrl.push(Home);
  }
}
