import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login'
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-viagem-passageiro',
  templateUrl: 'viagem-passageiro.html',
})
export class ViagemPassageiroPage {

  viagem: any;
  reservaPendente = [];
  reservaConfirmada = [];
  loc = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController) {
    this.viagem = this.navParams.get("viagem");
    this.loc = this.navParams.get("loc");
  }

  deletarReserva(){
    this.storage.get("aluno_ra").then((usu) => {
      var path = 'http://localhost:3000/api/caronas/delete/reserva?id=' + this.viagem["id_viagem"] + '&ra=' + usu
      
      this.http.get(path).map(res => res.json()).subscribe(data => {

        if(data.success) {
          var path2 = 'http://localhost:3000/api/caronas/put/viagem/aumenta_vaga?id=' + this.viagem["id_viagem"]
          this.http.get(path2).map(res => res.json()).subscribe(data => {
            if(data.success) { 
              let alert = this.alertCtrl.create({
                title: 'Ok!',
                subTitle: 'Reserva excluída',
                buttons: ['Dismiss']
              });
              alert.present();
              this.ionViewDidLoad();
            } else {
              let alert = this.alertCtrl.create({
                title: 'Ops!',
                subTitle: 'Tente novamente',
                buttons: ['Dismiss']
              });
              alert.present();
            }
          })
          //enviar mensagem de cancelamento de reserva para o motorista
          
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Tente novamente',
            buttons: ['Dismiss']
          });
          alert.present();
        }
      })
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
    console.log(this.viagem)
    console.log('ionViewDidLoad ViagemPassageiroPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
