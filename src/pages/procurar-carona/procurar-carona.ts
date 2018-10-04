import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ResCaronaPage } from '../res-carona/res-carona';


@IonicPage()
@Component({
  selector: 'page-procurar-carona',
  templateUrl: 'procurar-carona.html',
})
export class ProcurarCaronaPage {
  date: string;
  viagem = {}
  lista = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController) {
  }

  onChange($event) {
    console.log($event);
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  mostrarLocalidade(){
    var path = 'http://localhost:3000/api/caronas/get/localidades'
    this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data.data[0] != undefined) {
        data.data.forEach(element => {
          this.lista.push(element)
        });
      }

    }, (err) => {
        console.log(err)
    })
  }

  procurar(){
    var path = 'http://localhost:3000/api/caronas/get/viagem/datahora/local?data=' + this.viagem["data"]  + '&hora=' + this.viagem["hora"] + '&origem=' + this.viagem["id_origem"] + '&destino=' + this.viagem["id_destino"]
      
    this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data.data[0] != {}) {
          this.navCtrl.push(ResCaronaPage, {p1: data.data});
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })
  }
  
  ionViewWillEnter() {
    this.checkSession();
    this.mostrarLocalidade();
    console.log('ionViewWillEnter OferecerCaronaPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}