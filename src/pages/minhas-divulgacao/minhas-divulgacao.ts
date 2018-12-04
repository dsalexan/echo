import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginPage } from '../login/login'
import { TitleCasePipe } from '@angular/common';
import { CompradorDivulgacaoPage } from '../comprador-divulgacao/comprador-divulgacao';
import { VendedorDivulgacaoPage } from '../vendedor-divulgacao/vendedor-divulgacao';
import { InicialDivulgacaoPage } from '../inicial-divulgacao/inicial-divulgacao';

@IonicPage()
@Component({
  selector: 'page-minhas-divulgacao',
  templateUrl: 'minhas-divulgacao.html',
})
export class MinhasDivulgacaoPage {

  itens_vendedor = [];
  itens_comprador = [];
  itens_vendedor_validos = [];
  itens_comprador_validos = [];

  
  mensagem_exclusao: String;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public alertCtrl: AlertController, public viewCtrl: ViewController) {
    this.mensagem_exclusao = ''
  }

  clickBack(){
    this.navCtrl.push(InicialDivulgacaoPage)
  }

  abrirVendedor(v){
    console.log(v)
    this.navCtrl.push(VendedorDivulgacaoPage, {item: v}); 
  }

  abrirComprador(v){
    this.navCtrl.push(CompradorDivulgacaoPage, {item: v});
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

  deletarReserva(item, usu){

    this.mensagem_exclusao = 'O usuário ' + usu + ' cancelou a reserva de ' + item.quantidade + item.nome + ' do ' + item.dia.slice(8,10) +'/'+item.dia.slice(5,7)+'/'+item.dia.slice(0,4)

    var path = 'http://104.248.9.4:3000/api/reserva_divulgacao/delete/reservas?id_reserva=' + item.id_reserva
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      if(data["success"]) {

        var dia = this.formatDate(new Date())
        var hora = (new Date()).toTimeString().split(' ')[0]
        hora = hora.slice(0, hora.length-3)

        var path5 = 'http://104.248.9.4:3000/api/mensagem/post/mensagem?id_destinatario=' + item.ra_aluno + '&msg=' + this.mensagem_exclusao + '&dia=' + dia + '&hora=' + hora
        this.http.get(path5, {headers: new HttpHeaders()}).subscribe(data5 => {
          // this.http.get(path5).map(res => res.json()).subscribe(data5 => {
          }) 

        var path2 = 'http://104.248.9.4:3000/api/divulgacao/put/quantidade?id_divulgacao=' + item.id_divulgacao + '&quantidade=' + -item.quantidade
        this.http.get(path2, {headers: new HttpHeaders()}).subscribe()
        // this.http.get(path2).map(res => res.json()).subscribe()
        
        let alert = this.alertCtrl.create({
          title: 'Ok!',
          subTitle: 'Reserva cancelada!',
          buttons: ['Fechar']
        });
        alert.present();
        this.navCtrl.push(MinhasDivulgacaoPage);
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente.',
          buttons: ['Fechar']
        });
        alert.present();
      }
    })
  }


  showConfirm(item) {
    this.storage.get("aluno_ra").then((usu) => {
      const confirm = this.alertCtrl.create({
        title: 'Excluir a reserva?',
        message: 'Tem certeza de que deseja excluir a reserva? Não será possível recuperá-la.',
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
              this.deletarReserva(item, usu);
            }
          }
        ]
      });
      confirm.present();
    })
  }


  itensVendedor(){
    
    this.storage.get("aluno_ra").then((usu) => {
      
      var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/vendedor/ra_aluno?ra_aluno='+ usu
      this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
      // this.http.get(path).map(res => res.json()).subscribe(data => {
        
        if(data["success"]) {
          console.log(data["data"])
              this.itens_vendedor = data["data"];        
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Tente novamente.',
            buttons: ['Fechar']
          });
          alert.present();
        }

        this.itens_vendedor.forEach(item =>{
          if(item.dia >= this.formatDate(new Date())){
            this.itens_vendedor_validos.push(item)
          }        
        })

      }, (err) => {
        console.log(err)
      })
    })
  }

  itensComprador(){
    
    this.storage.get("aluno_ra").then((usu) => {
      
      var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/comprador/ra_aluno?ra_aluno='+ usu
      console.log(path)

      this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
      // this.http.get(path).map(res => res.json()).subscribe(data => {
        
        if(data["success"]) {
          console.log(data["data"])
              this.itens_comprador = data["data"];        
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Tente novamente.',
            buttons: ['Fechar']
          });
          alert.present();
        }
        
        this.itens_comprador.forEach(item =>{
          if(item.dia >= this.formatDate(new Date())){
            this.itens_comprador_validos.push(item)
          }        
        })

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
    this.itensVendedor();
    this.itensComprador();
    console.log('ionViewDidLoad MinhasDivulgacaoPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
