import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dados = navParams.get('dados');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  clickCadastrar() {
    if (this.dados["lembrar"]) {
      // lembrar login
    }
    // cadastrar usuário no banco usando this.dados["usuario/senha/email"]
    // criar sessão como se o usuário tivesse logado
    // this.navCtrl.push(Home);
  }
}
