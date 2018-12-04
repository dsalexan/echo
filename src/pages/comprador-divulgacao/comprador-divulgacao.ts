import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginPage } from '../login/login'
import { FiltrarDivulgacaoPage } from '../filtrar-divulgacao/filtrar-divulgacao';
import { MinhasDivulgacaoPage } from '../minhas-divulgacao/minhas-divulgacao';
import { HomePage } from '../home/home';
import { ResultadoDivulgacaoPage } from '../resultado-divulgacao/resultado-divulgacao';

@IonicPage()
@Component({
  selector: 'page-comprador-divulgacao',
  templateUrl: 'comprador-divulgacao.html',
})
export class CompradorDivulgacaoPage {
  item: any;
  qtd_desejada: any;
  resultados: any;

  valor_total = 0  
  msg_reserva: String;
  aluno_nome: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public alertCtrl: AlertController) {
    this.item = this.navParams.get("item");
    this.resultados = this.navParams.get("resultados");
    console.log(this.item)
    this.qtd_desejada = 0;    
    this.msg_reserva = ''

  }
  
  clickBack() {
    this.navCtrl.push(ResultadoDivulgacaoPage, {data: this.resultados})
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
      
      this.msg_reserva = 'O usuário ' + this.aluno_nome + ' reservou ' + this.qtd_desejada + ' unidades de ' + this.item.nome + ' para o dia ' + this.item.dia.slice(8,10) +'/'+this.item.dia.slice(5,7)+'/'+this.item.dia.slice(0,4)
    
  
      var path = 'http://104.248.9.4:3000/api/reserva_divulgacao/post/reserva_divulgacao?id_divulgacao=' + this.item.id_divulgacao + '&ra_aluno_comprador=' + usu + '&quantidade=' + this.qtd_desejada + '&status_reserva=true' 
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {
        if(data.success) {
          var path2 = 'http://localhost:3000/api/divulgacao/put/quantidade?id_divulgacao=' + this.item.id_divulgacao + '&quantidade=' + this.qtd_desejada
          this.http.get(path2).map(res => res.json()).subscribe(data2 => {
            if(data2.success){
              var dia = this.formatDate(new Date())
              var hora = (new Date()).toTimeString().split(' ')[0]
              hora = hora.slice(0, hora.length-3) 

              var path3 = 'http://localhost:3000/api/mensagem/post/mensagem?id_destinatario=' + this.item.ra_aluno + '&msg=' + this.msg_reserva + '&dia=' + dia + '&hora=' + hora
              this.http.get(path3).map(res => res.json()).subscribe(data3 => {
                if(data3.success) {
                  let alert = this.alertCtrl.create({
                    title: 'Ok!',
                    subTitle: 'Reserva confirmada',
                    buttons: ['Fechar']
                  });
                  alert.present();
                  this.navCtrl.push(MinhasDivulgacaoPage);
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

  checkSession() {
    this.storage.get("aluno_nome").then((usu2) => {
      if(usu2 == null) {
        this.navCtrl.push(LoginPage);
        this.aluno_nome = usu2
      }})
  }

  ionViewDidLoad() {
    this.checkSession();
    console.log('ionViewDidLoad CompradorDivulgacaoPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
