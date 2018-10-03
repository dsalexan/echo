// --OBS--
// INSTALAÇÃO NECESSÁRIA:
// $ ionic cordova plugin add cordova-plugin-inappbrowser
// $ npm install --save @ionic-native/in-app-browser

import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';

const biblioteca = 'http://www.biblioteca.unifesp.br/biblioteca/index.php';
const saldoRU = 'https://phpu.unifesp.br/ru_consulta/index.php';
const cardapio = 'www.unifesp.br/campus/sjc/servicosnae/restaurante/1647-cardapio-semanal-do-ru.html';
const email = 'https://email.unifesp.br/';
const atestado = 'https://intranet.unifesp.br/restrict/index3.php';
const historico = 'https://intranet.unifesp.br/restrict/index3.php';
const target = '_blank';

@IonicPage()
@Component({
  selector: 'page-utilidades',
  templateUrl: 'utilidades.html',
})
export class UtilidadesPage {

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only  
};

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

  clickBiblioteca() {
    const browser = this.iab.create(biblioteca,target,this.options);
    browser.show();
  }



  clicksSaldo() {
    const browser = this.iab.create(saldoRU,target,this.options);
    browser.show();
  }



  clickCardapio() {
    const browser = this.iab.create(cardapio,target,this.options);
    browser.show();
  }



  clickEmail() {
    const browser = this.iab.create(email,target,this.options);
    browser.show();
  }

  clickAtestado() {
    const browser = this.iab.create(atestado,target,this.options);
    browser.show();
  }

 clickHistorico() {
    const browser = this.iab.create(historico,target,this.options);
    browser.show();
  }

}


// https://ionicframework.com/docs/native/in-app-browser/
