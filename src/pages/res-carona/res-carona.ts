import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login'
import { CaronaPage } from '../carona/carona'


@IonicPage()
@Component({
  selector: 'page-res-carona',
  templateUrl: 'res-carona.html',
})
export class ResCaronaPage {
  dados: any;
  viagens: {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.dados = this.navParams.get("p1");
  }

  selecionar(item){
    this.navCtrl.push(CaronaPage, {viagem: item})
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
    console.log(this.dados)
    console.log(typeof(this.dados))
    console.log('ionViewDidLoad ResCaronaPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
