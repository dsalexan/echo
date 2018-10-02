// --OBS--
// INSTALAÇÃO NECESSÁRIA:
// $ ionic cordova plugin add cordova-plugin-inappbrowser
// $ npm install --save @ionic-native/in-app-browser

import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';

// const biblioteca = 'http://www.biblioteca.unifesp.br/biblioteca/index.php';
// const saldoRU = 'https://phpu.unifesp.br/ru_consulta/index.php';
// const cardapio = 'www.unifesp.br/campus/sjc/servicosnae/restaurante/1647-cardapio-semanal-do-ru.html';
// const email = 'https://www.email.unifesp.br';
// const atestado = 'https://intranet.unifesp.br/restrict/index3.php';
// const historico = 'https://intranet.unifesp.br/restrict/index3.php';

@IonicPage()
@Component({
  selector: 'page-utilidades',
  templateUrl: 'utilidades.html',
})
export class UtilidadesPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser, public storage: Storage) {
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }
  openUrl(){ window.open('https://google.com', '_system'); }
  ionViewDidLoad() {
    this.checkSession();
    console.log('ionViewDidLoad UtilidadesPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

  // clickBiblioteca(op) {

  //   var browser;
  //   switch(op){
  //     case 1:
  //       browser = this.iab.create(biblioteca);
  //       break;
  //     case 2:
  //       browser = this.iab.create(saldoRU);
  //       break;
  //     case 3:
  //       browser = this.iab.create(cardapio);
  //       break;
  //     case 4:
  //       browser = this.iab.create(email);
  //       break;
  //     case 5:
  //       browser = this.iab.create(atestado);
  //       break;
  //     case 6:
  //       browser = this.iab.create(historico);
  //       break;
  //   }
// 
//   
  // }
}

// https://ionicframework.com/docs/native/in-app-browser/
