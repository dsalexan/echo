// --OBS--
// INSTALAÇÃO NECESSÁRIA:
// $ ionic cordova plugin add cordova-plugin-inappbrowser
// $ npm install --save @ionic-native/in-app-browser

import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginPage } from '../login/login';
import { CardapioPage } from '../cardapio/cardapio';
import { Http } from '@angular/http';
import { AES, lib, PBKDF2, pad, mode } from 'crypto-js'

const biblioteca = 'http://www.biblioteca.unifesp.br/biblioteca/index.php';
const saldoRU = 'https://phpu.unifesp.br/ru_consulta/index.php';
const cardapio = 'https://www.unifesp.br/campus/sjc/servicosnae/restaurante/1647-cardapio-semanal-do-ru.html';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser, public storage: Storage, public http: HttpClient, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  clickBack() {
    this.navCtrl.pop()
  }
  
  openUrl(){ window.open('https://google.com', '_system'); }
  ionViewWillEnter() {
    this.checkSession();
    console.log('ionViewWillEnter UtilidadesPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

  clickBiblioteca() {
    const browser = this.iab.create(biblioteca,target,this.options);
    browser.show();
  }



  clicksSaldo() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();

    this.storage.get("aluno_login").then(aluno_login => {
      this.storage.get("aluno_senha").then(aluno_senha => {
        var encryptSenha = this.encrypt(aluno_senha, 'Achilles');
        var path = 'http://104.248.9.4:3000/api/utilidades/get/saldo?login='+ aluno_login + '&senha='+ encryptSenha

        this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
        // this.http.get(path).map(res => res.json()).subscribe(data => {
          loading.dismiss();
          if (data["saldo_ru"] != null) {
            let alert = this.alertCtrl.create({
              message: '<h2>Seu Saldo: ' + String(data["saldo_ru"]) + '</h2>',
              buttons: ['Ok'],
              cssClass: 'alertClass'
            });
            alert.present();
          }
          else {
            let alert = this.alertCtrl.create({
              message: '<h2>Erro</h2>',
              buttons: ['Ok'],
              cssClass: 'alertClass'
            });
            alert.present();
          }
        })
      })
    })
  }

  clickCardapio() {
    this.navCtrl.push(CardapioPage);
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

  encrypt (msg, pass) {
    var keySize = 256;
    var iterations = 100;

    var salt = lib.WordArray.random(128/8);
    
    var key = PBKDF2(pass, salt, {
        keySize: keySize/32,
        iterations: iterations
      });

    var iv = lib.WordArray.random(128/8);
    
    var encrypted = AES.encrypt(msg, key, { 
      iv: iv, 
      padding: pad.Pkcs7,
      mode: mode.CBC
      
    });
    
    // salt, iv will be hex 32 in length
    // append them to the ciphertext for use  in decryption
    var transitmessage = salt.toString()+ iv.toString() + encrypted.toString();
    return transitmessage;
  }
}


// https://ionicframework.com/docs/native/in-app-browser/
