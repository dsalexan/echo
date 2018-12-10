import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ViewController, Navbar } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { MinhasCaronasPage } from '../minhas-caronas/minhas-caronas';


@IonicPage()
@Component({
  selector: 'page-viagem-motorista',
  templateUrl: 'viagem-motorista.html',
})
export class ViagemMotoristaPage {
  @ViewChild(Navbar)navBar: Navbar;
  
  viagem: any;
  reservaPendente = [];
  reservaConfirmada = [];
  loc = {};
  msg_aceite: String
  msg_exclusao: String
  msg_exclusao_viagem: String

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public alertCtrl: AlertController, public popOver: PopoverController, public viewCtrl: ViewController) {
    this.viagem = this.navParams.get("viagem");
    this.loc = this.navParams.get("loc");
    this.msg_aceite = '';
    this.msg_exclusao_viagem = '';
  }

  editarViagemMotorista(myEvent) {

  }
  
  clickBack() {
    this.navCtrl.pop()
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

  showConfirm() {
    //this.close()
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
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
            
      if(data["success"]) {
        var path2 = 'http://104.248.9.4:3000/api/caronas/delete/viagem_destino?id=' + this.viagem["id_viagem"]
        console.log(path2)
        this.http.get(path2, {headers: new HttpHeaders()}).subscribe(data2 => {
        // this.http.get(path2).map(res => res.json()).subscribe(data2 => {

          if(data2["success"]) {
          var path3 = 'http://104.248.9.4:3000/api/caronas/delete/viagem_origem?id=' + this.viagem["id_viagem"]
          console.log(path3)
          this.http.get(path3, {headers: new HttpHeaders()}).subscribe(data3 => {
          // this.http.get(path3).map(res => res.json()).subscribe(data3 => {
          
            if(data3["success"]) {
            var path4 = 'http://104.248.9.4:3000/api/caronas/delete/viagem?id=' + this.viagem["id_viagem"]
            console.log(path4)
            this.http.get(path4, {headers: new HttpHeaders()}).subscribe(data4 => {
            // this.http.get(path4).map(res => res.json()).subscribe(data4 => {

              if(data4["success"]) {
                if(this.reservaConfirmada.length == 0){
                  let alert = this.alertCtrl.create({
                    title: 'Ok!',
                    subTitle: 'Viagem cancelada',
                  });
                  alert.present();
                  this.navCtrl.push(MinhasCaronasPage)
                } else{           
                  //enviar mensagem de cancelamento para o(s) passageiro(s) confirmado(s)
                  this.reservaConfirmada.forEach(reserva =>{

                    var msg = this.msg_exclusao_viagem + 'referente à viagem do dia ' + this.formatDate(this.viagem["dia"]) /*+ " às " + this.viagem["hora"] */+ ' - ' + this.loc[reserva.id_origem] + '->' + this.loc[reserva.id_destino]
                    
                    var dia = this.formatDate(new Date())
                    var hora = (new Date()).toTimeString().split(' ')[0]
                    hora = hora.slice(0, hora.length-3) 
                    
                    var path5 = 'http://104.248.9.4:3000/api/mensagem/post/mensagem?id_destinatario=' + reserva.ra_aluno + '&msg=' + msg + '&dia=' + dia + '&hora=' + hora
                    console.log(path5)
                    this.http.get(path5, {headers: new HttpHeaders()}).subscribe(data5 => {
                    // this.http.get(path5).map(res => res.json()).subscribe(data5 => {
                      
                      if(data5["success"]){
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

  editarViagem(origem, destino, horario){
    var path = 'http://104.248.9.4:3000/api/caronas/delete/viagem_reserva?id=' + this.viagem["id_viagem"]
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {

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
          placeholder: this.viagem
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

  showConfirmRejeitar(reserva) {
    //this.close()
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
    //this.close()
    const confirm = this.alertCtrl.create({
      title: 'Confirmar reserva?',
      message: 'Tem certeza de que deseja confirmar a reserva?.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
            close();
          }
        },
        {
          text: 'Confirmar',
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
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      
      if(data["success"]){
        let alert = this.alertCtrl.create({
          title: 'Ok!',
          subTitle: 'Reserva rejeitada com sucesso',
          buttons: ['Fechar']
        });
        alert.present();
        this.ionViewWillEnter();

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

  /*excluirReserva(reserva){
    console.log(reserva)
    var path = 'http://104.248.9.4:3000/api/caronas/delete/reserva?id=' + this.viagem["id_viagem"] + '&ra=' + reserva.ra_aluno
    console.log(path)
    this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data["success"]) {
        var path2 = 'http://104.248.9.4:3000/api/caronas/put/viagem/aumenta_vaga?id=' + this.viagem["id_viagem"]
        console.log(path2)
        this.http.get(path2).map(res => res.json()).subscribe(data2 => {
          
          if(data2["success"]){

            //mensagem para a carona excluida
            var msg = this.msg_exclusao + 'referente à viagem do dia ' + this.formatDate(this.viagem["dia"]) /*+ " às " + this.viagem["hora"] + ' - ' + this.loc[reserva.id_origem] + '->' + this.loc[reserva.id_destino]

            var dia = this.formatDate(new Date())
            var hora = (new Date()).toTimeString().split(' ')[0]
            hora = hora.slice(0, hora.length-3) 

            var path3 = 'http://104.248.9.4:3000/api/mensagem/post/mensagem?id_destinatario=' + reserva.ra_aluno + '&msg=' + msg + '&dia=' + dia + '&hora=' + hora
            console.log(path3)

            this.http.get(path3).map(res => res.json()).subscribe(data3 => {

              if(data3["success"]) { 
                let alert = this.alertCtrl.create({
                  title: 'Ok!',
                  subTitle: 'Reserva excluída',
                  buttons: ['Fechar']
                });
                alert.present();
                this.ionViewWillEnter();

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
  }*/

  aceitarReserva(reserva){

    if(this.viagem["qtd_vagas"] > 0){
      
      // apenas se existirem vagas disponiveis ele pode aceitar
      var path = 'http://104.248.9.4:3000/api/caronas/put/viagem/reserva?id=' + this.viagem["id_viagem"] + "&id_passageiro=" + reserva.ra_aluno
      console.log(path)
      this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
      // this.http.get(path).map(res => res.json()).subscribe(data => {

        if(data["success"]) {

          var path2 = 'http://104.248.9.4:3000/api/caronas/put/viagem/diminui_vaga?id=' + this.viagem["id_viagem"]
          this.http.get(path2, {headers: new HttpHeaders()}).subscribe(data2 => {
          // this.http.get(path2).map(res => res.json()).subscribe(data2 => {

            if(data2["success"]) {
              //mandar msg falando que foi aceito

              var msg = this.msg_aceite + 'referente à viagem do dia ' + this.formatDate(this.viagem["dia"]) /*+ " às " + this.viagem["hora"] */+ ' - ' + this.loc[reserva.id_origem] + '->' + this.loc[reserva.id_destino]

              var dia = this.formatDate(new Date())
              var hora = (new Date()).toTimeString().split(' ')[0]
              hora = hora.slice(0, hora.length-3) 

              var path3 = 'http://104.248.9.4:3000/api/mensagem/post/mensagem?id_destinatario=' + reserva.ra_aluno + '&msg=' + msg + '&dia=' + dia + '&hora=' + hora
              console.log(path3)

              this.http.get(path3, {headers: new HttpHeaders()}).subscribe(data3 => {
              // this.http.get(path3).map(res => res.json()).subscribe(data3 => {

                if(data3["success"]) { 
                  let alert = this.alertCtrl.create({
                    title: 'Ok!',
                    subTitle: 'Reserva confirmada',
                    buttons: ['Fechar']
                  });
                  alert.present();
                  this.ionViewWillEnter();

                } else {
                  let alert = this.alertCtrl.create({
                    title: 'Ops!',
                    subTitle: 'Tente novamente',
                    buttons: ['Fechar']
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
      })
    } else{
      let alert = this.alertCtrl.create({
        title: 'Ops!',
        subTitle: 'Não há vagas disponíveis!',
        buttons: ['Fechar']
      });
      alert.present();
    }
  }

  buscaReservas() {
    this.reservaPendente = []
    this.reservaConfirmada = []

    var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/reserva?id=' + this.viagem["id_viagem"]
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data["success"]) {
        //console.log(data["data"])
        if(data["data"].length == 0){
          return
        }
        data["data"].forEach(element => {
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
          buttons: ['Fechar']
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
    // this.navBar.backButtonClick = () => {
    //   // you can set a full custom history here if you want 
    //     let pages = [
    //     {
    //   page: MinhasCaronasPage
    //   }
    //   ];
    //   this.navCtrl.setPages(pages);
    // }
    this.buscaReservas();
    // PENDENCIA: buscar a qtd de vagas nesta tela
    //console.log(this.viagem)
  }

}
