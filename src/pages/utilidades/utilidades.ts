import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UtilidadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-utilidades',
  templateUrl: 'utilidades.html',
})
export class UtilidadesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  biblioteca() {
    console.log('ionViewDidLoad UtilidadesPage');
    const browser = this.iab.create('https://ionicframework.com/');

    browser.executeScript();

    browser.insertCSS();
    browser.on('loadstop').subscribe(event => {
       browser.insertCSS({ code: "body{color: red;" });
   });

    browser.close();
  }

}

// https://ionicframework.com/docs/native/in-app-browser/
