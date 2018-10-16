import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login'
import { HomePage } from '../home/home';



@Component({
  selector: 'page-viagem-motorista',
  template: `
    <ion-list>
      <ion-list-header>Opções</ion-list-header>
      <button ion-item (click)="excluirViagem()">
        <ion-icon name="md-trash"></ion-icon>   Excluir viagem
      </button>
      <button ion-item (click)="editarViagem()">
        <ion-icon name="md-create"></ion-icon>    Editar viagem</button>
    </ion-list>
  `
})
export class PopoverMotoristaPage {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }

  excluirViagem(){
    //mostrar popup perguntando se quer mesmo
    //excluir do banco de dados
    //enviar notificação a quem tem reserva
  }

  editarViagem(){
    // abrir outro popover pra editar
    //botar no banco
  }




}



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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController, public popOver: PopoverController) {
    this.viagem = this.navParams.get("viagem");
    this.loc = this.navParams.get("loc");
  }

  editarViagemMotorista(myEvent) {
    let popover = this.popOver.create(PopoverMotoristaPage);
    popover.present({
      ev: myEvent
    });
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
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
