import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { GradeEventoPage } from '../grade-evento/grade-evento';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {

  meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  eventos = {'Janeiro': [], 'Fevereiro': [], 'Março': [], 'Abril': [], 'Maio': [], 'Junho': [], 'Julho': [], 'Agosto': [], 'Setembro': [], 'Outubro': [], 'Novembro': [], 'Dezembro': []}

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public storage: Storage) {
  }

  ionViewWillEnter() {
    this.adicionarEventos()
    console.log('ionViewWillEnter AgendaPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
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
      var path = 'http://localhost:3000/api/grade/get/compromissos/aluno?ra_aluno=' + ra_aluno +
                 '&dt_inicio=' + today.getFullYear() + '-' + mes_inicio + '-' + '01' +
                 '&dt_fim=' + today.getFullYear() + '-' + mes_fim + '-' + ultimo_dia
      // console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {
        // console.log(data)
        data.data.forEach(c => {
          if (c.tipo == 'evento')
          {
            // console.log(c.dia)
            var dia = new Date(c.dia)
            var dia_mes = dia.getDate() < 10 ? '0' + String(dia.getDate()) : String(dia.getDate())
            var mes:any = this.meses[dia.getMonth()]

            var nome_uc = c.nome_uc
            var nome = c.nome
            var turma = c.turma
            var fullTime = c.hora
            var hora = fullTime.split(":")[0] + 'h' + fullTime.split(":")[1]
            var tipo = c.tipo

            // console.log(c)
            this.eventos[mes].push({
              // Colocar aqui informacoes do compromisso que vao ser adicionadas no evento
              nome_uc: nome_uc,
              nome: nome,
              turma: turma,
              hora: hora,
              dia_mes: dia_mes,
              tipo: tipo
            })
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
}
