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
import endpoints from '../../../constants/endpoints';
import { ENV } from '../../../constants/env';

const biblioteca = 'http://www.biblioteca.unifesp.br/biblioteca/index.php';
const saldoRU = 'https://phpu.unifesp.br/ru_consulta/index.php';
const cardapio = 'https://www.unifesp.br/campus/sjc/servicosnae/restaurante/1647-cardapio-semanal-do-ru.html';
const email = 'https://email.unifesp.br/';
const bla = ENV.HOSTNAME + '/getPdf/historico';
const bla2 = ENV.HOSTNAME + '/getPdf/atestado';
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
  }

  clickBiblioteca() {
    const browser = this.iab.create(biblioteca,target,this.options);
    browser.show();
  }


  clicksSaldo(force=false) {
    let loading_text = 'Carregando...'
    if(force)
      loading_text = '<span>Carregando...</span><br/><span>Isso pode levar um tempo...</span>'

    let loading = this.loadingCtrl.create({
      content: loading_text,
      cssClass: 'loading-message'
    });
    loading.present();

    this.storage.get("aluno_ra").then(aluno => {      
      var path = endpoints.api.utilidades.saldo + '/' + aluno
      if(force)
        path += '?force=true'

      this.http.get(path, {headers: new HttpHeaders()}).subscribe((data: any) => {
        loading.dismiss();
        if (data.saldo != null) {
          let alert = this.alertCtrl.create({
            message: `<h2>Seu Saldo: ${data.saldo}</h2>` +
                      '</br>' + 
                      `<span style="color: gray">Atualizado às: </span>${data.datahora}`,
            buttons: [{
              text: 'Atualizar',
              handler: () => {
                this.clicksSaldo(true)
              }
            },{
              text: 'Ok',
            }],
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
  }

  clickCardapio() {
    this.navCtrl.push(CardapioPage);
  }

  clickEmail() {
    const browser = this.iab.create(email,target,this.options);
    browser.show();
  }

  clickAtestado() {
    // const browser = this.iab.create(atestado,target,this.options);
    // browser.show();
    // var path = 'http://104.248.9.4:3000/getPdf'
    // let headers = new HttpHeaders();
    // headers = headers.set('Accept', 'application/pdf');
    // this.http.get(path ,{responseType: 'arraybuffer', headers: headers} )
    // .subscribe(response => this.downLoadFile(response, "application/pdf"));
    this.storage.get("aluno_ra").then(ra_aluno => {
      const browser = this.iab.create(bla2 + '?ra_aluno=' + ra_aluno, target,this.options);
      browser.show();
    })
  }

  downLoadFile(data: any, type: string) {
    var blob = new Blob([data], { type: type});
    var url = window.URL.createObjectURL(blob);
    var pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
  }

  clickHistorico() {
    // const browser = this.iab.create(historico,target,this.options);
    // browser.show();\
    this.storage.get("aluno_ra").then(ra_aluno => {
      const browser = this.iab.create(bla + '?ra_aluno=' + ra_aluno, target,this.options);
      browser.show();
    })
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
