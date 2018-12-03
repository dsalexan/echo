import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Navbar } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginPage } from '../login/login'
import { HomePage } from '../home/home';
import { ResCaronaPage } from '../res-carona/res-carona'


@IonicPage()
@Component({
  selector: 'page-carona',
  templateUrl: 'carona.html',
})
export class CaronaPage {
  @ViewChild(Navbar)navBar: Navbar;

  viagem: any;
  loc: {};
  msg_reserva: String;
  disponiveis = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public alertCtrl: AlertController) {
    this.viagem = this.navParams.get("viagem");
    this.loc = this.navParams.get("loc");
    this.disponiveis = this.navParams.get("disponiveis")
    this.msg_reserva = ''
  }

  reservar(){
    console.log(this.viagem)

    this.storage.get("aluno_ra").then((usu) => {
      var path = 'http://104.248.9.4:3000/api/caronas/post/viagem/reserva?id_viagem='+ this.viagem["id_viagem"] + '&id_passageiro='+ usu + '&id_origem=' + this.viagem["id_origem"] + '&id_destino=' + this.viagem["id_destino"] + '&status_reserva=false'
      console.log(path)
      this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
      // this.http.get(path).map(res => res.json()).subscribe(data => {

        if(data["success"]) {

          var dia = this.formatDate(new Date())
          var hora = (new Date()).toTimeString().split(' ')[0]
          hora = hora.slice(0, hora.length-3) 

          var path2 = 'http://104.248.9.4:3000/api/mensagem/post/mensagem?id_destinatario=' + this.viagem["id_motorista"] + '&msg=' + this.msg_reserva + '&dia=' + dia + '&hora=' + hora
          this.http.get(path2, {headers: new HttpHeaders()}).subscribe(data2 => {
          // this.http.get(path2).map(res => res.json()).subscribe(data2 => {
            if(data2["success"]) {
              let alert = this.alertCtrl.create({
                title: 'Ok!',
                subTitle: 'Reserva solicitada',
                buttons: ['Fechar']
              });
              alert.present();
              this.navCtrl.push(HomePage);
            } else {
              let alert = this.alertCtrl.create({
                title: 'Ops!',
                subTitle: 'Tente novamente',
                buttons: ['Fechar']
              });
              alert.present();
            }
          }) 
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Tente novamente',
            buttons: ['Fechar']
          });
          alert.present();
        }
      }, (err) => {
        console.log(err)
      })
    })
  }
  
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
      this.msg_reserva = 'O usuário ' + usu + ' fez uma solicitação de reserva referente à viagem do dia ' + this.formatDate(this.viagem["dia"]) + /*" às " + this.viagem["hora"] + */+ ' - ' + this.loc[this.viagem.id_origem] + '->' + this.loc[this.viagem.id_destino]
    })
  }

  ionViewDidLoad() {
    this.checkSession();
    console.log('ionViewDidLoad CaronaPage');
    //console.log(this.viagem);
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
