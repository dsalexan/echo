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
  confirmadas = [];
  mensagem_exclusao: String;
  loc: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, public http: Http) {
    this.viagem = navParams.get('v');
    this.confirmadas = navParams.get('c');
    this.mensagem_exclusao = navParams.get('msg');
    this.loc = navParams.get('loc');
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

  excluirViagem(){

    var path = 'http://104.248.9.4:3000/api/caronas/delete/viagem_reserva?id=' + this.viagem["id_viagem"]
    console.log(path)
    this.http.get(path).map(res => res.json()).subscribe(data => {
            
      if(data.success) {
        var path2 = 'http://104.248.9.4:3000/api/caronas/delete/viagem_destino?id=' + this.viagem["id_viagem"]
        console.log(path2)
        this.http.get(path2).map(res => res.json()).subscribe(data2 => {

          if(data2.success) {
          var path3 = 'http://104.248.9.4:3000/api/caronas/delete/viagem_origem?id=' + this.viagem["id_viagem"]
          console.log(path3)
          this.http.get(path3).map(res => res.json()).subscribe(data3 => {
          
            if(data3.success) {
            var path4 = 'http://104.248.9.4:3000/api/caronas/delete/viagem?id=' + this.viagem["id_viagem"]
            console.log(path4)
            this.http.get(path4).map(res => res.json()).subscribe(data4 => {

              if(data4.success) {
                if(this.confirmadas.length == 0){
                  let alert = this.alertCtrl.create({
                    title: 'Ok!',
                    subTitle: 'Viagem cancelada',
                  });
                  alert.present();
                  this.navCtrl.push(MinhasCaronasPage)
                } else{           
                  //enviar mensagem de cancelamento para o(s) passageiro(s) confirmado(s)
                  this.confirmadas.forEach(reserva =>{

                    var msg = this.mensagem_exclusao + 'referente à viagem do dia ' + this.formatDate(this.viagem["dia"]) /*+ " às " + this.viagem["hora"] */+ ' - ' + this.loc[reserva.id_origem] + '->' + this.loc[reserva.id_destino]
                    
                    var dia = this.formatDate(new Date())
                    var hora = (new Date()).toTimeString().split(' ')[0]
                    hora = hora.slice(0, hora.length-3) 
                    
                    var path5 = 'http://104.248.9.4:3000/api/mensagem/post/mensagem?id_destinatario=' + reserva.ra_aluno + '&msg=' + msg + '&dia=' + dia + '&hora=' + hora
                    console.log(path5)
                    this.http.get(path5).map(res => res.json()).subscribe(data5 => {
                      
                      if(data5.success){
                        let alert = this.alertCtrl.create({
                          title: 'Ok!',
                          subTitle: 'Viagem cancelada',
                        });
                        alert.present();
                        this.navCtrl.push(MinhasCaronasPage)
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
                  })  
                }                  
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

  editarViagem(){
    // abrir outro popover pra editar
    //botar no banco
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
  msg_aceite: String
  msg_exclusao: String
  msg_exclusao_viagem: String

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController, public popOver: PopoverController, public viewCtrl: ViewController) {
    this.viagem = this.navParams.get("viagem");
    this.loc = this.navParams.get("loc");
    this.msg_aceite = '';
    this.msg_exclusao_viagem = '';
  }

  editarViagemMotorista(myEvent) {
    let popover = this.popOver.create(PopoverMotoristaPage, {v: this.viagem, c: this.reservaConfirmada, msg: this.msg_exclusao_viagem, loc: this.loc});
    popover.present({
      ev: myEvent
    });
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
      this.msg_aceite = "O usuário " + usu + " confirmou a sua reserva "
      this.msg_exclusao = "O usuário " + usu + " excluiu a sua reserva "
      this.msg_exclusao_viagem = "O usuário " + usu + " excluiu a viagem "
    })
  }

  close() {
    this.viewCtrl.dismiss();
  }

  showConfirmRejeitar(reserva) {
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
            this.rejeitarReserva(reserva);
          }
        }
      ]
    });
    confirm.present();
  }

  showConfirmAceitar(reserva) {
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
            this.aceitarReserva(reserva);
          }
        }
      ]
    });
    confirm.present();
  }


  rejeitarReserva(reserva){
    var path = 'http://104.248.9.4:3000/api/caronas/delete/reserva?id=' + this.viagem["id_viagem"] + '&ra=' + reserva.ra_aluno
    console.log(path)
    this.http.get(path).map(res => res.json()).subscribe(data => {
      
      if(data.success){
        let alert = this.alertCtrl.create({
          title: 'Ok!',
          subTitle: 'Reserva rejeitada com sucesso',
          buttons: ['Dismiss']
        });
        alert.present();
        this.ionViewWillEnter();

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

  /*excluirReserva(reserva){
    console.log(reserva)
    var path = 'http://104.248.9.4:3000/api/caronas/delete/reserva?id=' + this.viagem["id_viagem"] + '&ra=' + reserva.ra_aluno
    console.log(path)
    this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data.success) {
        var path2 = 'http://104.248.9.4:3000/api/caronas/put/viagem/aumenta_vaga?id=' + this.viagem["id_viagem"]
        console.log(path2)
        this.http.get(path2).map(res => res.json()).subscribe(data2 => {
          
          if(data2.success){

            //mensagem para a carona excluida
            var msg = this.msg_exclusao + 'referente à viagem do dia ' + this.formatDate(this.viagem["dia"]) /*+ " às " + this.viagem["hora"] + ' - ' + this.loc[reserva.id_origem] + '->' + this.loc[reserva.id_destino]

            var dia = this.formatDate(new Date())
            var hora = (new Date()).toTimeString().split(' ')[0]
            hora = hora.slice(0, hora.length-3) 

            var path3 = 'http://104.248.9.4:3000/api/mensagem/post/mensagem?id_destinatario=' + reserva.ra_aluno + '&msg=' + msg + '&dia=' + dia + '&hora=' + hora
            console.log(path3)

            this.http.get(path3).map(res => res.json()).subscribe(data3 => {

              if(data3.success) { 
                let alert = this.alertCtrl.create({
                  title: 'Ok!',
                  subTitle: 'Reserva excluída',
                  buttons: ['Dismiss']
                });
                alert.present();
                this.ionViewWillEnter();

              } else {
                let alert = this.alertCtrl.create({
                  title: 'Ops!',
                  subTitle: 'Tente novamente',
                  buttons: ['Dismiss']
                });
                alert.present();
              }
            })

          } else {
            let alert = this.alertCtrl.create({
              title: 'Ops!',
              subTitle: 'Tente novamente',
              buttons: ['Dismiss']
            });
            alert.present();
          }
        })

      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    })
  }*/

  aceitarReserva(reserva){

    if(this.viagem["qtd_vagas"] > 0){
      
      // apenas se existirem vagas disponiveis ele pode aceitar
      var path = 'http://104.248.9.4:3000/api/caronas/put/viagem/reserva?id=' + this.viagem["id_viagem"] + "&id_passageiro=" + reserva.ra_aluno
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {

        if(data.success) {

          var path2 = 'http://104.248.9.4:3000/api/caronas/put/viagem/diminui_vaga?id=' + this.viagem["id_viagem"]
          this.http.get(path2).map(res => res.json()).subscribe(data2 => {

            if(data2.success) {
              //mandar msg falando que foi aceito

              var msg = this.msg_aceite + 'referente à viagem do dia ' + this.formatDate(this.viagem["dia"]) /*+ " às " + this.viagem["hora"] */+ ' - ' + this.loc[reserva.id_origem] + '->' + this.loc[reserva.id_destino]

              var dia = this.formatDate(new Date())
              var hora = (new Date()).toTimeString().split(' ')[0]
              hora = hora.slice(0, hora.length-3) 

              var path3 = 'http://104.248.9.4:3000/api/mensagem/post/mensagem?id_destinatario=' + reserva.ra_aluno + '&msg=' + msg + '&dia=' + dia + '&hora=' + hora
              console.log(path3)

              this.http.get(path3).map(res => res.json()).subscribe(data3 => {

                if(data3.success) { 
                  let alert = this.alertCtrl.create({
                    title: 'Ok!',
                    subTitle: 'Reserva confirmada',
                    buttons: ['Dismiss']
                  });
                  alert.present();
                  this.ionViewWillEnter();

                } else {
                  let alert = this.alertCtrl.create({
                    title: 'Ops!',
                    subTitle: 'Tente novamente',
                    buttons: ['Dismiss']
                  });
                  alert.present();
                }
              })

              // deletar reservas de vagas em horarios proximos
              
              if(reserva.id_destino == 1){
                var path4 = 'http://104.248.9.4:3000/api/caronas/delete/reserva/ida?id_passageiro=' + reserva.ra_aluno + '&dia=' + this.formatDate(this.viagem["dia"]) + '&hora=' + this.viagem["hora"]
              }
              else if(reserva.id_origem == 1){
                var path4 = 'http://104.248.9.4:3000/api/caronas/delete/reserva/volta?id_passageiro=' + reserva.ra_aluno + '&dia=' + this.formatDate(this.viagem["dia"]) + '&hora=' + this.viagem["hora"]
              }

            }else {
              let alert = this.alertCtrl.create({
                title: 'Ops!',
                subTitle: 'Tente novamente',
                buttons: ['Dismiss']
              });
              alert.present();
            }
          })
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Tente novamente',
            buttons: ['Dismiss']
          });
          alert.present();
        }
      })
    } else{
      let alert = this.alertCtrl.create({
        title: 'Ops!',
        subTitle: 'Não há vagas disponíveis!',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  buscaReservas() {
    this.reservaPendente = []
    this.reservaConfirmada = []

    var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/reserva?id=' + this.viagem["id_viagem"]
    this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data.success) {
        //console.log(data.data)
        if(data.data.length == 0){
          return
        }
        data.data.forEach(element => {
          //console.log(element)
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

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  ionViewWillEnter() {
    this.checkSession();
    this.buscaReservas();
    // PENDENCIA: buscar a qtd de vagas nesta tela
    //console.log(this.viagem)
    console.log('ionViewWillEnter ViagemMotoristaPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
