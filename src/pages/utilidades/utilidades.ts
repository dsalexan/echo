// --OBS--
// INSTALAÇÃO NECESSÁRIA:
// $ ionic cordova plugin add cordova-plugin-inappbrowser
// $ npm install --save @ionic-native/in-app-browser

import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

const biblioteca = 'http://www.biblioteca.unifesp.br/biblioteca/index.php';
const saldoRU = 'https://phpu.unifesp.br/ru_consulta/index.php';
const cardapio = 'url do cardapio';
const email = 'https://www.email.unifesp.br';
const atestado = 'https://intranet.unifesp.br/restrict/index3.php';
const historico = 'https://intranet.unifesp.br/restrict/index3.php';

@IonicPage()
@Component({
  selector: 'page-utilidades',
  templateUrl: 'utilidades.html',
})
export class UtilidadesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
  }

  clickBiblioteca() {
    console.log('ionViewDidLoad UtilidadesPage');
    const browser = this.iab.create(biblioteca);

    browser.executeScript();

    browser.insertCSS();
    browser.on('loadstop').subscribe(event => {
       browser.insertCSS({ code: "body{color: red;" });
   });

    browser.close();
  }

  clicksSaldo() {
    console.log('ionViewDidLoad UtilidadesPage');
    const browser = this.iab.create(saldoRU);

    browser.executeScript();

    browser.insertCSS();
    browser.on('loadstop').subscribe(event => {
       browser.insertCSS({ code: "body{color: red;" });
   });

    browser.close();
  }

  clickCardapio() {
    console.log('ionViewDidLoad UtilidadesPage');
    const browser = this.iab.create(cardapio);

    browser.executeScript();

    browser.insertCSS();
    browser.on('loadstop').subscribe(event => {
       browser.insertCSS({ code: "body{color: red;" });
   });

    browser.close();
  }

  clickEmail() {
    console.log('ionViewDidLoad UtilidadesPage');
    const browser = this.iab.create(email);

    browser.executeScript();

    browser.insertCSS();
    browser.on('loadstop').subscribe(event => {
       browser.insertCSS({ code: "body{color: red;" });
   });

    browser.close();
  }

  clickAtestado() {
    console.log('ionViewDidLoad UtilidadesPage');
    const browser = this.iab.create(atestado);

    browser.executeScript();

    browser.insertCSS();
    browser.on('loadstop').subscribe(event => {
       browser.insertCSS({ code: "body{color: red;" });
   });

    browser.close();
  }

  clickHistorico() {
    console.log('ionViewDidLoad UtilidadesPage');
    const browser = this.iab.create(historico);

    browser.executeScript();

    browser.insertCSS();
    browser.on('loadstop').subscribe(event => {
       browser.insertCSS({ code: "body{color: red;" });
   });

    browser.close();
  }


}

// https://ionicframework.com/docs/native/in-app-browser/
