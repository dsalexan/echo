import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-oferecer-carona',
  templateUrl: 'oferecer-carona.html',
})

export class OferecerCaronaPage {
  //type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  viagem = {}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  onChange($event) {
    console.log($event);
  }

  oferecer(){
    //salvar no banco de dados]
    //document.getElementById("teste").textContent=this.viagem["preco"];
    //document.getElementById("teste").textContent=this.viagem["descricao"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OferecerCaronaPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
