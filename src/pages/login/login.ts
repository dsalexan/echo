import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
    if (this.verificarCredenciais(this.dados["usuario"], this.dados["senha"]) == true) {
      if (this.dados["lembrar"]) {
          let alert = this.alertCtrl.create( {
            title: 'Lembrar senha',
            subTitle: 'Lembrar senha',
            buttons: ['Dismiss']
          });
          alert.present();
          // Cadastrar que ele quer ser lembrado
      }
      // this.navCtrl.push(TelaSeguinte);
    }
  }

  verificarCredenciais(usuario, senha) {
    return true;
  }

}
