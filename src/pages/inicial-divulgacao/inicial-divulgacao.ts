import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { DivulgarDivulgacaoPage } from '../divulgar-divulgacao/divulgar-divulgacao';
import { FiltrarDivulgacaoPage } from '../filtrar-divulgacao/filtrar-divulgacao';
import { LoginPage } from '../login/login';
import { MinhasDivulgacaoPage } from '../minhas-divulgacao/minhas-divulgacao';



@IonicPage()
@Component({
  selector: 'page-inicial-divulgacao',
  templateUrl: 'inicial-divulgacao.html',
})
export class InicialDivulgacaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
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
    console.log('ionViewWillEnter InicialDivulgacaoPage');
    document.getElementById("tabs").style.display = "block"
    document.getElementById("botao_menu").style.display = "block"
  }

  clickFiltrarDivulgacaoPage() { 
    this.navCtrl.push(FiltrarDivulgacaoPage);
  }

  clickDivulgarDivulgacaoPage() { 
    this.navCtrl.push(DivulgarDivulgacaoPage);
  }

  clickMinhasDivulgacaoPage() { 
    this.navCtrl.push(MinhasDivulgacaoPage);
  }
}
