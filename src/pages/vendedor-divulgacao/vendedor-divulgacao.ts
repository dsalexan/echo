import { Component, ComponentFactoryResolver } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ViewController,  ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { MinhasDivulgacaoPage } from '../minhas-divulgacao/minhas-divulgacao';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';


@IonicPage()
@Component({
  selector: 'page-vendedor-divulgacao',
  templateUrl: 'vendedor-divulgacao.html',
})
export class VendedorDivulgacaoPage {
  itens: any;
  reservas = []
  mensagem_exclusao: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public alertCtrl: AlertController, public popOver: PopoverController, public viewCtrl: ViewController, public modalCtrl: ModalController) {
    this.itens = this.navParams.get("item");
    this.mensagem_exclusao = ''
  }

  clickBack(){
    this.navCtrl.push(MinhasDivulgacaoPage)
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

  editarOferta() {
      const edit = this.alertCtrl.create({
        title: 'Atualizar quantidade para: ',
        inputs: [
          {
            name: 'quantidade',
            placeholder: 'Nova Quantidade'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Salvar',
            handler: data => {
              this.navCtrl.push(MinhasDivulgacaoPage)
              if (data.quantidade != null) {
                var path = 'http://localhost:3000/api/divulgacao/put/setar_quantidade?id_divulgacao=' + this.itens.id_divulgacao + '&quantidade=' + data.quantidade
                this.http.get(path, {headers: new HttpHeaders()}).subscribe(data1 => {
                // this.http.get(path).map(res => res.json()).subscribe(data1 => {
                  if(data1["success"]){
                    let alert = this.alertCtrl.create({
                      title: 'Ok!',
                      subTitle: 'Alteração realizada!',
                      buttons: ['Fechar']
                    });
                    alert.present();
                  }
                })
              }
            }
          }
        ]
      });  
    edit.present();    
  }

  

  deletarOferta(){
    var path = 'http://localhost:3000/api/reserva_divulgacao/get/reservas?id_divulgacao=' + this.itens.id_divulgacao
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      if(data["success"]) {
      console.log(data)
      console.log(data["data"])
        data["data"].forEach(element => {
          var dia = this.formatDate(new Date())
          var hora = (new Date()).toTimeString().split(' ')[0]
          hora = hora.slice(0, hora.length-3)

          var path5 = 'http://localhost:3000/api/mensagem/post/mensagem?id_destinatario=' + element.ra_aluno_comprador + '&msg=' + this.mensagem_exclusao + '&dia=' + dia + '&hora=' + hora
            console.log(path5)
            this.http.get(path5, {headers: new HttpHeaders()}).subscribe(data5 => {
            // this.http.get(path5).map(res => res.json()).subscribe(data5 => {
            })          
        });

        if(data["data"].length != 0){
          var path2 = 'http://localhost:3000/api/reserva_divulgacao/delete/todas_reservas?id_divulgacao=' + this.itens.id_divulgacao
          this.http.get(path2, {headers: new HttpHeaders()}).subscribe(data2 => {
          // this.http.get(path2).map(res => res.json()).subscribe(data2 => {
            if(data2["success"]){
              //manda mensagem pras reserva avisando que cancelou        
              var path3 = 'http://localhost:3000/api/divulgacao/delete/divulgacao?id_divulgacao=' + this.itens.id_divulgacao
              this.http.get(path3, {headers: new HttpHeaders()}).subscribe(data3 => {
              // this.http.get(path3).map(res => res.json()).subscribe(data3 => {
                if(data3["success"]){
                  let alert = this.alertCtrl.create({
                    title: 'Ok!',
                    subTitle: 'Oferta cancelada!',
                    buttons: ['Fechar']
                  });
                  alert.present();
                  this.navCtrl.push(MinhasDivulgacaoPage);
                }
              })
            }
          })
        }
        if(data["data"].length == 0){
          var path3 = 'http://localhost:3000/api/divulgacao/delete/divulgacao?id_divulgacao=' + this.itens.id_divulgacao
          this.http.get(path3, {headers: new HttpHeaders()}).subscribe(data3 => {
          // this.http.get(path3).map(res => res.json()).subscribe(data3 => {
            if(data3["success"]){
              let alert = this.alertCtrl.create({
                title: 'Ok!',
                subTitle: 'Oferta cancelada!',
                buttons: ['Fechar']
              });
              alert.present();
              this.navCtrl.push(MinhasDivulgacaoPage);
            }
          })
        }
      }
    }) 
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Excluir a oferta?',
      message: 'Tem certeza de que deseja excluir a oferta? Não será possível recuperá-la.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            console.log('Agree clicked');
            this.deletarOferta();
          }
        }
      ]
    });
    confirm.present();
  }


  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
      this.mensagem_exclusao = 'O usuário ' + usu + ' cancelou a venda de ' + this.itens.nome + ' do dia ' + this.itens.dia.slice(8,10) +'/'+this.itens.dia.slice(5,7)+'/'+this.itens.dia.slice(0,4)
    })
  }

  ionViewDidLoad() {
    this.checkSession();
    this.abrirReservas();
    console.log('ionViewDidLoad VendedorDivulgacaoPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
