import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login'
import { CadastroPage } from '../cadastro/cadastro';

<<<<<<< HEAD
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
=======
>>>>>>> eadd3953736c7aee984f4fdb0e3dd69aba862929

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

<<<<<<< HEAD
  constructor(private http: HTTP, public navCtrl: NavController, public navParams: NavParams) {
=======
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
>>>>>>> eadd3953736c7aee984f4fdb0e3dd69aba862929
  }

  ionViewDidLoad() {
    this.checkSession();
    console.log('ionViewDidLoad HomePage');
    document.getElementById("tabs").style.display = "block"
    document.getElementById("botao_menu").style.display = "block"
  }

  /*clickLogin() {
    this.navCtrl.push(LoginPage);
<<<<<<< HEAD
  }

  clickTeste() {
    this.http.get('http://localhost:3000/api/grades/get/grade/aluno?ra_aluno=112344', {}, {})
      .then(data =>
        document.getElementById("teste").textContent = String(data)
      )
  }
=======
  }*/
>>>>>>> eadd3953736c7aee984f4fdb0e3dd69aba862929
}
