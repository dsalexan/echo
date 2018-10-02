import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login'


@IonicPage()
@Component({
  selector: 'page-oferecer-carona',
  templateUrl: 'oferecer-carona.html',
})

export class OferecerCaronaPage {
  //type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  viagem = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }
  
  onChange($event) {
    console.log($event);
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  oferecer(){
    //salvar no banco de dados]
    //document.getElementById("teste").textContent=this.viagem["preco"];
    //document.getElementById("teste").textContent=this.viagem["descricao"];
  }

  ionViewDidLoad() {
    this.checkSession();
    console.log('ionViewDidLoad OferecerCaronaPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
