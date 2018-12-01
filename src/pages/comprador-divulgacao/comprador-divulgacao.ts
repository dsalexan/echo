import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login'
import { FiltrarDivulgacaoPage } from '../filtrar-divulgacao/filtrar-divulgacao';
import { MinhasDivulgacaoPage } from '../minhas-divulgacao/minhas-divulgacao';

@IonicPage()
@Component({
  selector: 'page-comprador-divulgacao',
  templateUrl: 'comprador-divulgacao.html',
})
export class CompradorDivulgacaoPage {
  item: any;
  qtd_desejada: any;

  valor_total = 0

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController) {
    this.item = this.navParams.get("item");
    this.qtd_desejada = 0;
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  somar() {
    if(this.item.quantidade > this.qtd_desejada) {
      this.qtd_desejada++;      
      this.valor_total = this.qtd_desejada * this.item.valor;
    }
  }

  subtrair() {
    if(this.qtd_desejada > 0) {
      this.qtd_desejada--;
      this.valor_total = this.qtd_desejada * this.item.valor;
    }
  }


  Reservar(){
    this.storage.get("aluno_ra").then((usu) => {
  
      var path = 'http://104.248.9.4:3000/api/reserva_divulgacao/post/reserva_divulgacao?id_divulgacao=' + this.item.id_divulgacao + '&ra_aluno_comprador=' + usu + '&quantidade=' + this.qtd_desejada + '&status_reserva=true' 
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {
        if(data.success) {
          var path2 = 'http://104.248.9.4:3000/api/divulgacao/put/quantidade?id_divulgacao=' + this.item.id_divulgacao + '&quantidade=' + this.qtd_desejada
          this.http.get(path2).map(res => res.json()).subscribe(data => {
          let alert = this.alertCtrl.create({
            title: 'Ok!',
            subTitle: 'Reserva confirmada!',
            buttons: ['Fechar']
          });
          alert.present();
          this.navCtrl.push(MinhasDivulgacaoPage);
          })
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Não foi possível confirmar sua reserva, tente novamente!',
            buttons: ['Fechar']
          });
          alert.present();
          this.navCtrl.push(FiltrarDivulgacaoPage);
        }


      })
    })
  }

  ionViewDidLoad() {
    this.checkSession();
    console.log('ionViewDidLoad CompradorDivulgacaoPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
