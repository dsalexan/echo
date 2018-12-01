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
  mensagens = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http) {
  }


  exibirMensagens(){
    this.storage.get("aluno_ra"). then(usu => {
      var path = 'http://localhost:3000/api/mensagem/get/all?id_destinatario=' + usu
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {
        if(data.success){
          this.mensagens = data.data
          console.log('jisdjoasi', this.mensagens)
        }
      })
    })
  }
  
  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewWillEnter() {
    this.checkSession();

    document.getElementById("tabs").style.display = "block"
    document.getElementById("botao_menu").style.display = "block"
  }

  clickLogin() {
    this.navCtrl.push(LoginPage);
  }
}
