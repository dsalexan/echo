import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
//import { Platform, Nav } from 'ionic-angular';
import { OferecerCaronaPage } from '../oferecer-carona/oferecer-carona'

@IonicPage()
@Component({
  selector: 'page-inicial-carona',
  templateUrl: 'inicial-carona.html',
})
export class InicialCaronaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicialCaronaPage');
    document.getElementById("tabs").style.display = "block"
    document.getElementById("botao_menu").style.display = "block"
  }

  clickOferecerCarona() { // vai para a pagina de configurações
    this.navCtrl.push(OferecerCaronaPage);
  }

}
