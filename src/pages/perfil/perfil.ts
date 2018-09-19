import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
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
    console.log('ionViewDidLoad PerfilPage');
  }

}
