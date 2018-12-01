import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login'
import { Http } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-mensagem',
  templateUrl: 'mensagem.html',
})
export class MensagemPage {
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

  ionViewDidLoad() {
    this.exibirMensagens();
    console.log('ionViewDidLoad MensagemPage');
  }

}
