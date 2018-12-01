import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login'
import { InicialDivulgacaoPage } from '../inicial-divulgacao/inicial-divulgacao';
import { HomePage } from '../home/home';
import { ResCaronaPage } from '../res-carona/res-carona';


@IonicPage()
@Component({
  selector: 'page-filtrar-divulgacao',
  templateUrl: 'filtrar-divulgacao.html',
})


export class FiltrarDivulgacaoPage {
  item = {} // {} tipo: objetoF
  lista = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController) {
    // this.item["categoria"] = undefined;
    // this.item["valor"] = undefined;
    // this.item["hora_inicio"] = undefined;
    // this.item["hora_fim"] = undefined;
    // this.item["quantidade"] = undefined;
    // this.item["dia"]=undefined;
  }


  ionViewWillEnter() {
    this.checkSession();
    console.log('ionViewWillEnter FiltrarDivulgacaoPage');
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

  onChange($event) {
    console.log($event);
  }

  PreencherListaTipo(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/todos/tipo'
    this.http.get(path).map(res => res.json()).subscribe(data => {
      data.data.forEach(tipo => {
        this.lista.push({id_tipo:tipo.id_tipo, nome_tipo:tipo.nome_tipo})
      })
    }, (err) => {
        console.log(err)
    })
  }



  buscar(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/tipo?id_tipo=' + document.getElementById('categoria').getAttribute("ng-reflect-model")
      
    this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log('RESULTADO', data)

      if(data.data.length != 0) {
          console.log(data)//this.navCtrl.push(ResCaronaPage, {p1: data.data, p2:this.viagem, loc:this.loc});
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Desfazer']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })
  }

}