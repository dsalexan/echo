import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login'

import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private http: HTTP) {
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    document.getElementById("tabs").style.display = "block"
    document.getElementById("botao_menu").style.display = "block"
  }

  clickLogin() {
    this.navCtrl.push(LoginPage);
  }
  

  clickTeste() {
    this.http.get('http://localhost:3000/api/grades/get/grade/aluno?ra_aluno=112344', {}, {})
      .then(data =>
        document.getElementById("teste").textContent = String(data)
      )
  }
}
