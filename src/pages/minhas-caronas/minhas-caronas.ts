import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login'

@IonicPage()
@Component({
  selector: 'page-minhas-caronas',
  templateUrl: 'minhas-caronas.html',
})
export class MinhasCaronasPage {

  viagens_motorista= [];
  viagens_passageiro = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController) {
  }

  caronasMotorista(){
    var path;
    this.storage.get("aluno_ra").then((usu) => {
      path = 'http://localhost:3000/api/caronas/get/viagem/motorista?id='+ usu
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {
        
        if(data.success) {
          this.viagens_passageiro = data.data;
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

  caronasPassageiro(){
    var path;
    this.storage.get("aluno_ra").then((usu) => {
      path = 'http://localhost:3000/api/caronas/get/viagem/passageiro?id='+ usu
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {
        
        if(data.success) {
          this.viagens_motorista = data.data;
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
    this.caronasMotorista();
    this.caronasPassageiro();
    console.log('ionViewDidLoad MinhasCaronasPage');
  }

}
