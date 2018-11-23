import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { MinhasCaronasPage } from '../minhas-caronas/minhas-caronas';


/*
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
export class PopoverMotoristaExclusaoViagemPage {
  constructor(public viewCtrl: ViewController) {}

  cancelar() {
    this.viewCtrl.dismiss();
  }

  excluir(){
    //excluir do banco de dados
    //enviar notificação a quem tem reserva
  }

}
*/









/*CLASSE POPOVER DE EXCLUIR/EDITAR VIAGEM*/

@Component({
  selector: 'page-viagem-motorista',
  template: `
    <ion-list>
      <ion-list-header>Opções</ion-list-header>
      <button ion-item (click)="showConfirm()">
        <ion-icon name="md-trash"></ion-icon>   Excluir viagem
      </button>
      <button ion-item (click)="editarViagem()">
        <ion-icon name="md-create"></ion-icon>    Editar viagem</button>
    </ion-list>
  `
})
export class PopoverMotoristaPage {
  viagem: any;
  passageiros: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, public http: Http) {
    this.viagem = navParams.get('v');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  showConfirm() {
    this.close()
    const confirm = this.alertCtrl.create({
      title: 'Excluir a viagem?',
      message: 'Tem certeza de que deseja excluir a viagem? Não será possível recuperá-la.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
            close();
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            console.log('Agree clicked');
            this.excluirViagem();
          }
        }
      ]
    });
    confirm.present();
  }

  getPassageiros(){
    var path = 'http://localhost:3000/api/caronas/delete/passageiros?id=' + this.viagem["id_viagem"]
    this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data.success) {
        this.passageiros = data.data
        //console.log(this.passageiros)
        
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Fechar']
        });
        alert.present();
      }
    })
  }

  excluirViagem(){
    this.getPassageiros()

    var path = 'http://localhost:3000/api/caronas/delete/viagem_reserva?id=' + this.viagem["id_viagem"]
    this.http.get(path).map(res => res.json()).subscribe(data => {
      
      
      if(data.success) {
        var path2 = 'http://localhost:3000/api/caronas/delete/viagem_destino?id=' + this.viagem["id_viagem"]
        this.http.get(path2).map(res => res.json()).subscribe(data2 => {

        
          if(data2.success) {
          var path3 = 'http://localhost:3000/api/caronas/delete/viagem_origem?id=' + this.viagem["id_viagem"]
          this.http.get(path3).map(res => res.json()).subscribe(data3 => {
          
            if(data3.success) {
            var path4 = 'http://localhost:3000/api/caronas/delete/viagem?id=' + this.viagem["id_viagem"]
            this.http.get(path4).map(res => res.json()).subscribe(data4 => {

              if(data4.success) {
                let alert = this.alertCtrl.create({
                  title: 'Ok!',
                  subTitle: 'Viagem cancelada',
                });
                alert.present();
                this.navCtrl.push(MinhasCaronasPage)
      
                //enviar mensagem de cancelamento para o(s) passageiro(s)
          
              } else {
                let alert = this.alertCtrl.create({
                  title: 'Ops!',
                  subTitle: 'Tente novamente',
                  buttons: ['Fechar']
                });
                alert.present();
                return
              }
              })
            } else {
              let alert = this.alertCtrl.create({
                title: 'Ops!',
                subTitle: 'Tente novamente',
                buttons: ['Fechar']
              });
              alert.present();
              return
            }
          })
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Tente novamente',
            buttons: ['Fechar']
          });
          alert.present();
          return
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
    })


  }

  editarViagem(origem, destino, horario){
    var path = 'http://localhost:3000/api/caronas/delete/viagem_reserva?id=' + this.viagem["id_viagem"]
    this.http.get(path).map(res => res.json()).subscribe(data => {

    })
  }

  showEdit(){
    var origem = String;
    var destino = String;
    var horario = String;

    const edit = this.alertCtrl.create({
      title: 'Edite sua viagem.',
      message: 'Coloque os novos dado da viagem',
      inputs:[
        {
          name: 'origem',
          placeholder: 'origem'
        },
        {
          name: 'destino',
          placeholder: 'destino'
        },
        {
          name: 'horario',
          placeholder: 'horario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
            close();
          }
        },
        {
          text: 'Salvar',
          handler: () => {
            console.log('Save clicked');
            this.editarViagem(origem, destino, horario);
          }
        }
      ]
    });

    edit.present();
  }

}




/*CLASSE VIAGEM MOTORISTA*/

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
    let popover = this.popOver.create(PopoverMotoristaPage, {v: this.viagem});
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
    console.log(this.viagem)
    console.log('ionViewDidLoad ViagemMotoristaPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
