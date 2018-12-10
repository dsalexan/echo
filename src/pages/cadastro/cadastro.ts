import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';


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
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewWillEnter() {
    this.checkSession()
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
