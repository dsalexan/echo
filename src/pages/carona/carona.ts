import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login'
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-carona',
  templateUrl: 'carona.html',
})
export class CaronaPage {
  viagem: any;
  loc: {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController) {
    this.viagem = this.navParams.get("viagem");
    this.loc = this.navParams.get("loc");
  }

  reservar(){
    //criar reserva no banco
    console.log(this.viagem)

    var path
    console.log(this.viagem["id_origem"])
    console.log(this.viagem["id_destino"])

    this.storage.get("aluno_ra").then((usu) => {
      path = 'http://localhost:3000/api/caronas/post/viagem/reserva?id_viagem='+ this.viagem["id_viagem"] + '&id_passageiro='+ usu + '&id_origem=' + this.viagem["id_origem"] + '&id_destino=' + this.viagem["id_destino"] + '&status_reserva=false'
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {

        if(data.success) {
          let alert = this.alertCtrl.create({
            title: 'Ok!',
            subTitle: 'Reserva solicitada',
            buttons: ['Dismiss']
          });
          alert.present();
          this.navCtrl.push(HomePage);
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
    console.log('ionViewDidLoad CaronaPage');
    console.log(this.viagem);
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
