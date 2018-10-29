import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login'
import { CaronaPage } from '../carona/carona'
import { ViagemMotoristaPage } from '../viagem-motorista/viagem-motorista';


@IonicPage()
@Component({
  selector: 'page-res-carona',
  templateUrl: 'res-carona.html',
})
export class ResCaronaPage {
  dados: any;
  viagens: {}
  loc: {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.dados = this.navParams.get("p1");
    this.loc = this.navParams.get("loc");
    this.viagens = this.navParams.get("p2")
  }

  selecionar(item){
    this.storage.get("aluno_ra").then((usu) => {
      if(item["id_motorista"]==usu) this.navCtrl.push(ViagemMotoristaPage, {viagem: item, loc:this.loc})
      else this.navCtrl.push(CaronaPage, {viagem: item, loc:this.loc})
      //falta verificar se ele ja ta reservado na viagem
    })
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewDidLoad() {
    this.checkSession();
    console.log(this.dados)
    console.log(this.loc)
    console.log('ionViewDidLoad ResCaronaPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
