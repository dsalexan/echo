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

  tabela = new Array(7)
  eventos = {'Domingo': [], 'Segunda': [], 'Terça': [], 'Quarta': [], 'Quinta': [], 'Sexta': [], 'Sábado': []}
  extenso = {'DOM': 'Domingo', 'SEG': 'Segunda', 'TER': 'Terça', 'QUA': 'Quarta', 'QUI': 'Quinta', 'SEX': 'Sexta', 'SAB': 'Sábado'}
  diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  
  semana = new Array(7)
  // semanaDias = new Array(7)
  // semanaMeses = new Array(7)
  // semanaAnos = new Array(7)

  createRange(n) {return new Array(n);}

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public storage: Storage) {
  }

  ionViewWillEnter() {
    this.checkSession();
    console.log('ionViewWillEnter InicialGradePage');
    document.getElementById("tabs").style.display = "block"
    document.getElementById("botao_menu").style.display = "block"
    this.carregarGrade();

    var today = new Date()

    for (var i = 0; i < 7; i++) {
      var dia = new Date()
      dia.setDate(today.getDate() + (i - today.getDay()))
      this.semana[i] = {
        dd: dia.getDate() >= 10 ? dia.getDate() : '0'+dia.getDate(),
        mm: dia.getMonth()+1 >= 10 ? dia.getMonth()+1 : '0'+dia.getMonth()+1,
        yyyy: dia.getFullYear()
      }
      // this.semanaDias[i] = dia.getDate() >= 10 ? dia.getDate() : '0'+dia.getDate()
      // this.semanaMeses[i] = dia.getMonth()+1 >= 10 ? dia.getMonth()+1 : '0'+dia.getMonth()+1
      // this.semanaAnos[i] = dia.getFullYear()
    }
  }
  
  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }
  
  carregarGrade() {
    console.log(this.storage.get("aluno_ra"))
    this.storage.get("aluno_ra").then(ra_aluno => {
      var path = 'http://localhost:3000/api/grades/get/grade/aluno?ra_aluno=' + ra_aluno
      this.http.get(path).map(res => res.json()).subscribe(data => {
        this.adicionarGradeEventos(data)
      }, (err) => {
        console.log(err)
      })
    })
  }

  adicionarGradeEventos(data) {

    data.data.forEach(aula => {
      var dia_semana = this.extenso[aula.dia_semana]
      var nome_uc = aula.nome_uc
      this.eventos[dia_semana].push({
        nome_uc: nome_uc
      })
    })
  }

  selecionarEvento(ds, e) {
    this.navCtrl.push(GradeEventoPage, {dados: this.eventos[ds][e]})
  }
}
