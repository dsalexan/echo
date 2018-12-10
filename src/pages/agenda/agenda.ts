import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { GradeEventoPage } from '../grade-evento/grade-evento';
import { Storage } from '@ionic/storage';
import { GradeCadastroEventoPage } from '../grade-cadastro-evento/grade-cadastro-evento';
import { InicialGradePage } from '../inicial-grade/inicial-grade';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import endpoints from '../../../constants/endpoints'

@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})

export class AgendaPage {

  parseMesInt = (mes: string) => {
    for(let i = 0; i < this.meses.length; i++){
      if(mes == this.meses[i]){
        return i + 1
      }
    }

    return 12
  }
  meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  eventos = {'Janeiro': [], 'Fevereiro': [], 'Março': [], 'Abril': [], 'Maio': [], 'Junho': [], 'Julho': [], 'Agosto': [], 'Setembro': [], 'Outubro': [], 'Novembro': [], 'Dezembro': []}

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public storage: Storage) {
  }

  ionViewDidLoad() {
    this.adicionarEventos()
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AgendaPage');
  }

  clickBack() {
    this.navCtrl.push(InicialGradePage)
  }

  adicionarEventos() {
    // console.log(this.storage.get("aluno_ra"))

    var today = new Date()
    var inicio = today.getMonth() < 6 ? 0 : 6
    var fim = today.getMonth() < 6 ? 5 : 11
    var mes_inicio = inicio < 10 ? '0' + String(inicio+1) : String(inicio+1)
    var mes_fim = fim < 10 ? '0' + String(fim+1) : String(fim+1)

    var ultimo = new Date(today.getFullYear(), today.getMonth()+1, 0);
    var ultimo_dia = String(ultimo.getDate())

    this.storage.get("aluno_ra").then(ra_aluno => {
      var path = `${endpoints.api.grade._}/${ra_aluno}/compromissos` +
                 '?dt_inicio=' + today.getFullYear() + '-' + mes_inicio + '-' + '01' +
                 '&dt_fim=' + today.getFullYear() + '-' + mes_fim + '-' + ultimo_dia
      
      this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
        data["data"].forEach(c => {
          if (c.tipo == 'evento')
          {
            var o = {}
            // console.log(c.dia)
            var dia = new Date(c.dia)
            o["dia_mes"] = dia.getDate() < 10 ? '0' + String(dia.getDate()) : String(dia.getDate())
            o["mes"] = dia.getMonth() < 10 ? '0' + String(dia.getMonth()) : String(dia.getMonth())
            o["ano"] = String(dia.getFullYear())
            var mes:any = this.meses[dia.getMonth()]

            o["id_turma"] = c.id_turma
            o["nome_uc"] = c.nome_uc
            o["nome"] = c.nome
            if (c.nome == null)
              o["nome"] = "Aula"
            o["turma"] = c.turma
            if (c["hora"] != null) {
              var fullTime = c.hora
              o["hora"] = fullTime.split(":")[0] + 'h' + fullTime.split(":")[1]
            }
            o["tipo"] = c.tipo
            o["descricao_evento"] = c.descricao

            // console.log(c)
            this.eventos[mes].push(
              // Colocar aqui informacoes do compromisso que vao ser adicionadas no evento
              o
            )
          }
        })
      }, (err) => {
        console.log(err)
      })
    })
    console.log(this.eventos)
  }

  selecionarCompromisso(mes, e) {
    // console.log(this.eventos[mes][e])
    this.navCtrl.push(GradeEventoPage, {dados: this.eventos[mes][e]})
  }

  clickCadastrar() {
    this.navCtrl.push(GradeCadastroEventoPage)
  }

  horaInObject(object) {
    if ("hora" in object) {
      return true
    }
    else {
      return false
    }
  }
}
