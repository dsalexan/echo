import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login'
import { InicialDivulgacaoPage } from '../inicial-divulgacao/inicial-divulgacao';


export class PopoverDivulgarPage {

  data: String;
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }

}


@IonicPage()
@Component({
  selector: 'page-divulgar-divulgacao',
  templateUrl: 'divulgar-divulgacao.html',
})

export class DivulgarDivulgacaoPage {

  item = {} // {} tipo: objetoF
  lista = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController, public popOver: PopoverController) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter DivulgarDivulgacaoPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
    this.PreencherListaTipo()
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  abrirData(myEvent) {
    let popover = this.popOver.create(PopoverDivulgarPage);
    popover.present({
      ev: myEvent
    });
  }

  onChange($event) {
    console.log($event);
  }

  PreencherListaTipo(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/select_tipo'
    this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log(data)
      data.data.forEach(tipo => {
        this.lista.push({id_tipo:tipo.id_tipo, nome_tipo:tipo.nome_tipo})
      })
    }, (err) => {
        console.log(err)
    })
  }

  divulgar(){ 
    this.storage.get("aluno_ra").then((usu) => {
      var path = 'http://104.248.9.4:3000/api/divulgacao/post/divulgacao?ra_aluno='+ usu + '&id_tipo=' + this.item["categoria"] + '&nome=' + this.item["nome"]  + '&valor='+ this.item["valor"] + '&dia='+ this.item["dia"] + '&hora_inicio=' + this.item["hora_inicio"] + '&hora_fim=' + this.item["hora_fim"] + '&quantidade=' + this.item["quantidade"] + '&descricao='+ this.item["descricao"]
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {

        if(data.success){
          let alert = this.alertCtrl.create({
            title: 'Ok!',
            subTitle: 'Divulgação realizada com sucesso',
            buttons: ['Fechar']
          });
          alert.present();
          this.navCtrl.push(InicialDivulgacaoPage);
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Tente novamente',
            buttons: ['Fechar']
          });
          alert.present();
        }
      })
    })
  }
}