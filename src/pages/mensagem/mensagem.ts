import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginPage } from '../login/login'
import { Http } from '@angular/http';

import endpoints from '../../../constants/endpoints'

@IonicPage()
@Component({
  selector: 'page-mensagem',
  templateUrl: 'mensagem.html',
})
export class MensagemPage {
  mensagens_lidas = []
  mensagens_naolidas = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public alertCtrl: AlertController) {
  }

  exibir(mensagem){
    
    //alterar status no banco
    console.log('mensagem', mensagem)
    if(!mensagem.lida){
      var path = endpoints.api.mensagens._ + '/' + mensagem.id_mensagem
      
      this.http.put(path, {headers: new HttpHeaders()}).subscribe((data: any) => {
          if(data.success){
            this.ionViewWillEnter()
          }
        })
    }

    let alert = this.alertCtrl.create({
      title: ' ',
      subTitle: mensagem.mensagem,
      buttons: ['Fechar']
    });
    alert.present();
  }

  exibirMensagens(){
    this.storage.get("aluno_ra"). then(usu => {
      var path = endpoints.api.mensagens.lidas + '?id_destinatario=' + usu
      
      this.http.get(path, {headers: new HttpHeaders()}).subscribe((data: any) => {
        if(data.success){
          this.mensagens_lidas = data.data
        }
      })

      var path2 = endpoints.api.mensagens.novas + '?id_destinatario=' + usu
      
      this.http.get(path2, {headers: new HttpHeaders()}).subscribe((data: any) => {
        if(data.success){
          this.mensagens_naolidas = data.data
        }
      })
    })
  }

  excluirMensagem(mensagem){
    var path = endpoints.api.mensagens._ + '/' + mensagem.id_mensagem
    
    this.http.delete(path, {headers: new HttpHeaders()}).subscribe((data: any) => {
      if(data.success){
        let alert = this.alertCtrl.create({
          title: 'Ok!',
          subTitle: 'Mensagem excluída!',
          buttons: ['Fechar']
        });
        alert.present();
        this.ionViewWillEnter()
      }
      else{
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

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  clickBack() {
    this.navCtrl.pop()
  }

  ionViewWillEnter() {
    this.exibirMensagens();
  }

}
