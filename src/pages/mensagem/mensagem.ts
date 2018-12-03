import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login'
import { Http } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-mensagem',
  templateUrl: 'mensagem.html',
})
export class MensagemPage {
  mensagens_lidas = []
  mensagens_naolidas = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController) {
  }

  exibir(mensagem){
    
    //alterar status no banco
    console.log('mensagem', mensagem)
    if(!mensagem.lida){
      var path = 'http://localhost:3000/api/mensagem/put/mensagem?id_mensagem=' + mensagem.id_mensagem
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {
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
      var path = 'http://localhost:3000/api/mensagem/get/lidas?id_destinatario=' + usu
      console.log(path)
      
      this.http.get(path).map(res => res.json()).subscribe(data => {
        if(data.success){
          this.mensagens_lidas = data.data
          //console.log('jisdjoasi', this.mensagens)
        }
      })

      var path2 = 'http://localhost:3000/api/mensagem/get/novas?id_destinatario=' + usu
      console.log(path2)
      
      this.http.get(path2).map(res => res.json()).subscribe(data2 => {
        if(data2.success){
          this.mensagens_naolidas = data2.data
          //console.log('jisdjoasi', this.mensagens)
        }
      })


    })
  }

  excluirMensagem(mensagem){
    var path = 'http://localhost:3000/api/mensagem/delete/mensagem?id_mensagem=' + mensagem.id_mensagem
    console.log(path)
    
    this.http.get(path).map(res => res.json()).subscribe(data => {
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
    console.log('ionViewWillEnter MensagemPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
