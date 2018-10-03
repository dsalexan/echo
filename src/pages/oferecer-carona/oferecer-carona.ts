import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login'
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-oferecer-carona',
  templateUrl: 'oferecer-carona.html',
})

export class OferecerCaronaPage {

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
        console.log(data)
        data.data.forEach(element => {
          this.lista.push(element)
        });
      }

    }, (err) => {
        console.log(err)
    })
  }


  oferecer(){
    //salvar no banco de dados]
    console.log(this.viagem)
    //document.getElementById("teste").textContent=this.viagem["data"];
    
    var path
    this.storage.get("aluno_ra").then((usu) => {
      path = 'http://localhost:3000/api/caronas/post/viagem?id_motorista='+ usu + '&id_origem='+ this.viagem["id_origem"] + '&id_destino='+  this.viagem["id_destino"] + '&dia='+ this.viagem["data"] + '&hora='+ this.viagem["hora"] + '&preco='+ this.viagem["preco"] + '&qtd_vagas=' + this.viagem["qtd_vagas"] + '&descricao='+ this.viagem["descricao"]
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {

        if(data.success) {
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
      })

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