import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login'
import { MensagemPage } from '../mensagem/mensagem'
import { Http } from '@angular/http';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  tabela = new Array(7);
  mensagens = []
  nova: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http) {
    this.nova = false;
  }

  clickMensagem(){
    this.navCtrl.push(MensagemPage);
  }


  exibirMensagens(){
    this.storage.get("aluno_ra"). then(usu => {
      var path = 'http://104.248.9.4:3000/api/mensagem/get/novas?id_destinatario=' + usu
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {
        if(data.success && data.data.length > 0){
          this.mensagens = data.data
          this.nova = true
        }
        console.log(this.nova)
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
    this.exibirMensagens();
    document.getElementById("tabs").style.display = "block"
    document.getElementById("botao_menu").style.display = "block"
  }
}
