import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { CadastroPage } from '../cadastro/cadastro';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  dados = {}

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  clickLogin() {
    if (this.verificarCredenciais() == true) {

      if (this.primeiroLogin()) {
        this.navCtrl.push(CadastroPage, {dados: this.dados});
      }

      if (this.dados["lembrar"]) {
          // lembrar login (cadastrar senha no sqlite?)
      }

      // this.navCtrl.push(Home);
    }
    else {
      let alert = this.alertCtrl.create( {
        title: 'Dados incorretos',
        subTitle: 'Usuário e/ou senha incorretos.',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  verificarCredenciais() {
    // verificar se usuario this.dados["usuario"] existe
    // verificar se a senha this.dados["senha"] esta correta
    // isso por web crawling
    return true;
  }

  primeiroLogin() {
    // verificar se usuario this.dados["usuario"] já está cadastrado no postgres
    return true;
  }
}
