import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-vendedor-divulgacao',
  templateUrl: 'vendedor-divulgacao.html',
})
export class VendedorDivulgacaoPage {
  itens: any;
  reservas = []


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public alertCtrl: AlertController, public popOver: PopoverController) {
    this.itens = this.navParams.get("item");
    console.log( 'items da pag anterior', this.itens)
  }

  abrirReservas(){
    this.storage.get("aluno_ra").then((usu) => {
      
      var path = 'http://104.248.9.4:3000/api/reserva_divulgacao/get/reservas?id_divulgacao=' + this.itens.id_divulgacao
      this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
      // this.http.get(path).map(res => res.json()).subscribe(data => {
        
        if(data["success"]) {
              this.reservas = data["data"];      
              console.log('items buscados do banco', data["data"])  
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Tente novamente.',
            buttons: ['Fechar']
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
    //console.log(this.itens);
    this.abrirReservas();
    console.log('ionViewDidLoad VendedorDivulgacaoPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
