import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login'
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-viagem-motorista',
  templateUrl: 'viagem-motorista.html',
})
export class ViagemMotoristaPage {

  viagem: any;
  reservaPendente = [];
  reservaConfirmada = [];
  loc = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController) {
    this.viagem = this.navParams.get("viagem");
    this.loc = this.navParams.get("loc");
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  editar(){
    
  }

  rejeitarReserva(){
    var path = 'http://localhost:3000/api/caronas/delete/reserva?id=' + this.viagem["id_viagem"]
    this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data.success) {
        let alert = this.alertCtrl.create({
          title: 'Ok!',
          subTitle: 'Reserva excluída',
          buttons: ['Dismiss']
        });
        alert.present();
        this.ionViewDidLoad();

        //enviar mensagem de rejeição para o passageiro
        
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    })

  }

  aceitarReserva(){
    var path = 'http://localhost:3000/api/caronas/put/viagem/reserva?id=' + this.viagem["id_viagem"]
    this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data.success) {
        let alert = this.alertCtrl.create({
          title: 'Ok!',
          subTitle: 'Reserva confirmada',
          buttons: ['Dismiss']
        });
        alert.present();
        this.ionViewDidLoad();

        //enviar mensagem de confirmação para o passageiro
        
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    })
  }

  buscaReservas() {
    this.reservaPendente = []
    this.reservaConfirmada = []

    var path = 'http://localhost:3000/api/caronas/get/reserva?id=' + this.viagem["id_viagem"]
    this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data.success) {
        console.log(data.data)
        if(data.data.length == 0){
          return
        }
        data.data.forEach(element => {
          console.log(element)
          if(element["status_reserva"])
            this.reservaConfirmada.push(element)
          else
            this.reservaPendente.push(element)
        });
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    })
  }

  ionViewDidLoad() {
    this.checkSession();
    this.buscaReservas();
    console.log('ionViewDidLoad ViagemMotoristaPage');
  }

}
