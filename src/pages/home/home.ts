import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login'
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  tabela = new Array(7);

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http) {
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
    console.log('ionViewDidLoad HomePage');
    document.getElementById("tabs").style.display = "inline-block"
    document.getElementById("botao_menu").style.display = "inline-block"
  }

  clickLogin() {
    this.navCtrl.push(LoginPage);
  }
}
