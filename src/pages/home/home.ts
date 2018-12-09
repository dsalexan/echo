import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginPage } from '../login/login'
import { MensagemPage } from '../mensagem/mensagem'
import { Http } from '@angular/http';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';

import endpoints from '../../../constants/endpoints'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  tabela = new Array(7);
  mensagens = []
  nova: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient) {
    this.nova = false;
  }

  clickMensagem(){
    this.navCtrl.push(MensagemPage);
  }

  exibirMensagens(){
    let semana = new Array(7)
    var today = new Date()

    for (var i = 0; i < 7; i++) {
      var dia = new Date()
      dia.setDate(today.getDate() + (i - today.getDay()))
      semana[i] = {
        dd: dia.getDate() >= 10 ? dia.getDate() : '0'+dia.getDate(),
        mm: dia.getMonth()+1 >= 10 ? dia.getMonth()+1 : '0'+(dia.getMonth()+1),
        yyyy: dia.getFullYear()
      }
    }

    this.storage.get("aluno_ra").then(ra_aluno => {
      var path = `${endpoints.api.grade._}/${ra_aluno}/compromissos/quantidade` +
                 '?data_inicio=' + semana[0].yyyy + '-' + semana[0].mm + '-' + semana[0].dd +
                 '&data_fim=' + semana[6].yyyy + '-' + semana[6].mm + '-' + semana[6].dd
      // console.log(semana)
      this.http.get(path, {headers: new HttpHeaders()}).subscribe((data: any) => {
        if(data.success && data.data.length > 0){
          console.log('aaaaa', data.data)
          this.mensagens = data.data
          this.nova = true
        }
      })
    })
    // this.storage.get("aluno_ra"). then(usu => {
    //   var path = endpoints.api.mensagens.novas + '?id_destinatario=' + usu
    //   this.http.get(path, {headers: new HttpHeaders()}).subscribe((data: any) => {
    //     if(data.success && data.data.length > 0){
    //       this.mensagens = data.data
    //       this.nova = true
    //     }
    //   })
    // })
  }
  
  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewWillEnter() {
    this.checkSession();
    this.exibirMensagens();
    document.getElementById("tabs").style.display = "block"
    document.getElementById("botao_menu").style.display = "block"
  }

  clickLogin() {
    this.navCtrl.push(LoginPage);
  }
}
