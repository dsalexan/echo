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
  objectKeys = Object.keys;
  objectValues = Object.values;
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
      dia.setDate(today.getDate() + (i + 1 - today.getDay()))
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
          // console.log('aaaaa', data.data)
          // this.mensagens = data.data
          this.nova = true

          let _tipos:any = {}
          for(let mensagem of data.data){
            if(!(mensagem.tipo in _tipos)){
              _tipos[mensagem.tipo] = {
                nome: mensagem.tipo,
                lista: {}
              }
            }

            let item: any = {
              nome: mensagem.nome,
              unidade: mensagem.tipo.substring(0, mensagem.tipo.length-1)
            }

            if(!(item.nome in _tipos[mensagem.tipo].lista)){
              _tipos[mensagem.tipo].lista[item.nome] = {
                ...item,
                lista: []
              }
            }

            let _: any = {
              dia: mensagem.dia,
              hora: mensagem.hora
            }

            if(mensagem.tipo == 'caronas'){
              if(mensagem.dados[0] == 'reservadas'){
                _.motorista = mensagem.dados[1]
                _.modelo = mensagem.dados[2]
                _tipos[mensagem.tipo].lista[item.nome].tipo_carona = 'passageiro'
              }else if(mensagem.dados[0] == 'oferecidas'){
                _.lugares = `${mensagem.dados[1]}/${mensagem.dados[2]}`
                _tipos[mensagem.tipo].lista[item.nome].tipo_carona = 'motorista'
              }
            }else if(mensagem.tipo == 'eventos'){
              _.tipo = mensagem.dados[0]
              _.aula = mensagem.dados[1]
            }

            _tipos[mensagem.tipo].lista[item.nome].lista.push(_)

            _tipos[mensagem.tipo].lista[item.nome].unidade = _tipos[mensagem.tipo].lista[item.nome].lista.length == 1 ?
              _tipos[mensagem.tipo].lista[item.nome].unidade :
              _tipos[mensagem.tipo].lista[item.nome].unidade + 's'
          }

          this.mensagens = Object.values(_tipos)
        }
      })
    })
  }
  
  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.setRoot(LoginPage);
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewWillEnter() {
    this.checkSession();
    this.exibirMensagens();
    // document.getElementById("tabs").style.display = "block"
    // document.getElementById("botao_menu").style.display = "block"
  }

  clickLogin() {
    this.navCtrl.push(LoginPage);
  }
}
