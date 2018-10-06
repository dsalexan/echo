import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login'
import { Http } from '@angular/http';
import { GradeEventoPage } from '../grade-evento/grade-evento';

@IonicPage()
@Component({
  selector: 'page-inicial-grade',
  templateUrl: 'inicial-grade.html',
})
export class InicialGradePage {

  eventos = {'Domingo': [], 'Segunda': [], 'Terça': [], 'Quarta': [], 'Quinta': [], 'Sexta': [], 'Sábado': []}

  extenso = {'DOM': 'Domingo', 'SEG': 'Segunda', 'TER': 'Terça', 'QUA': 'Quarta', 'QUI': 'Quinta', 'SEX': 'Sexta', 'SAB': 'Sábado'}
  diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  
  semana = new Array(7)

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public storage: Storage) {
  }

  ionViewDidLoad() {
    this.adicionarGrade();

    var today = new Date()

    for (var i = 0; i < 7; i++) {
      var dia = new Date()
      dia.setDate(today.getDate() + (i - today.getDay()))
      this.semana[i] = {
        dd: dia.getDate() >= 10 ? dia.getDate() : '0'+dia.getDate(),
        mm: dia.getMonth()+1 >= 10 ? dia.getMonth()+1 : '0'+(dia.getMonth()+1),
        yyyy: dia.getFullYear()
      }
    }
  }

  ionViewWillEnter() {
    this.checkSession();
    console.log('ionViewWillEnter InicialGradePage');
    document.getElementById("tabs").style.display = "block"
    document.getElementById("botao_menu").style.display = "block"
  }

  createRange(n) {return new Array(n);}
  
  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  adicionarGrade() {
    console.log(this.storage.get("aluno_ra"))
    this.storage.get("aluno_ra").then(ra_aluno => {
      var path = 'http://localhost:3000/api/grade/get/compromissos/aluno?ra_aluno=' + ra_aluno +
                 '&dt_inicio=' + this.semana[0].yyyy + '-' + this.semana[0].mm + '-' + this.semana[0].dd +
                 '&dt_fim=' + this.semana[6].yyyy + '-' + this.semana[6].mm + '-' + this.semana[6].dd
      console.log(this.semana)
      this.http.get(path).map(res => res.json()).subscribe(data => {
        console.log(data)
        data.data.forEach(c => {
          if (c.tipo == 'aula')
            var dia_semana = this.extenso[c.dia_semana]
          else
          {
            var dia = new Date(c.dia)
            var dia_semana:any = this.diasSemana[dia.getDay()]
          }

          var nome = c.nome
          this.eventos[dia_semana].push({
            // Colocar aqui informacoes do compromisso que vao ser adicionadas no evento
            nome: nome
          })
        })
      }, (err) => {
        console.log(err)
      })
    })
  }

  selecionarEvento(ds, e) {
    this.navCtrl.push(GradeEventoPage, {dados: this.eventos[ds][e]})
  }
}
