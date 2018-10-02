import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login'
//import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-oferecer-carona',
  templateUrl: 'oferecer-carona.html',
})

export class OferecerCaronaPage {
  date: string;
  type: 'string';
  //type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  viagem = {}
  localidades = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController) {
  }
  
  onChange($event) {
    console.log($event);
  }

  checkSession() {
    this.storage.get("aluno_user").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  mostrarOrigem(){
    var path = 'http://localhost:3000/api/caronas/get/localidades'
    this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data.data[0] != undefined) {
        // document.getElementById("local_origem").textContent=data.data[0];
      }

    }, (err) => {
        console.log(err)
    })
  }


  oferecer(){
    //salvar no banco de dados]
    document.getElementById("teste").textContent=this.viagem["data"];
    //document.getElementById("teste").textContent=this.viagem["descricao"];
    /*
    var path = 'http://localhost:3000/api/caronas/post/viagem?id_motorista='+ this.storage.get("aluno_ra") + '&id_origem='+ this.viagem["id_origem"] + '&id_destino='+  this.viagem["id_destino"] + '&dia='+ this.viagem["dia"] + '&hora='+ this.viagem["hora"] + '&preco='+ this.viagem["preco"] + '&qtd_vagas=' this.viagem["qtd_vagas"] + '&descricao='+ this.viagem["descricao"]
    this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data.data[0] != undefined) {
        let alert = this.alertCtrl.create({
          title: 'Ok!',
          subTitle: 'Viagem criada com sucesso',
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
    })*/
  }

  ionViewDidLoad() {
    //this.checkSession();
    this.mostrarOrigem();
    console.log('ionViewDidLoad OferecerCaronaPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
