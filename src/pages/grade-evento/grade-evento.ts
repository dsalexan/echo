import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the GradeEventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grade-evento',
  templateUrl: 'grade-evento.html',
})
export class GradeEventoPage {

  dados = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.dados = navParams.get('dados');
    // console.log(this.dados)
  }

  ionViewWillEnter() {
    this.carregarDadosTurma()
    console.log('ionViewWillEnter GradeEventoPage');
    console.log(this.dados)
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

  carregarDadosTurma() {
    var id_turma = this.dados["id_turma"];

    var path = 'http://localhost:3000/api/grades/get/turma/id?id_turma=' + id_turma
    this.http.get(path).map(res => res.json()).subscribe(info => {
      // console.log(info)
      this.dados["nome_turma"] = info.data.nome_turma
      this.dados["nome_uc"] = info.data.nome_uc
      this.dados["nome_prof"] = info.data.nome_prof
    })

    this.dados["alunos"] = []

    var path2 = 'http://localhost:3000/api/grades/get/aluno/turma?id_turma=' + id_turma
    this.http.get(path2).map(res => res.json()).subscribe(data => {
      // console.log(data)
      data.data.forEach(aluno => {
        var a = {nome: aluno.nome, ra: aluno.ra_aluno}
        this.dados["alunos"].push(a)
      })
    })

    this.dados["eventos"] = []

    var path3 = 'http://localhost:3000/api/grades/get/evento/turma?id_turma=' + id_turma
    this.http.get(path3).map(res => res.json()).subscribe(data => {
      // console.log(data)
      data.data.forEach(evento => {
        var o = {
          descricao_evento: evento.descricao_evento,
          data: evento.data,
          hora: evento.hora,
          sala: evento.sala
        }
        this.dados["eventos"].push(o)
      })
    })
  }

  eventoOuNao(compromisso) {
    // console.log(compromisso)
    if (compromisso.tipo == 'evento')
      return true
    return false
  }
}
