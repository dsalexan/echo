import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login'
import { Http } from '@angular/http';
import { GradeEventoPage } from '../grade-evento/grade-evento';
import { AgendaPage } from '../agenda/agenda';

@IonicPage()
@Component({
  selector: 'page-inicial-grade',
  templateUrl: 'inicial-grade.html',
})
export class InicialGradePage {

  compromissos = {'Domingo': [], 'Segunda': [], 'Terça': [], 'Quarta': [], 'Quinta': [], 'Sexta': [], 'Sábado': []}

  extenso = {'DOM': 'Domingo', 'SEG': 'Segunda', 'TER': 'Terça', 'QUA': 'Quarta', 'QUI': 'Quinta', 'SEX': 'Sexta', 'SAB': 'Sábado'}
  diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  
  semana = new Array(7)

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private http: Http, public storage: Storage) {
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

  novaTurma(){
    var nome;
    var prof;
    var sala;
    var hora;

    const confirm = this.alertCtrl.create({
      title: 'Nova Turma',
      message: 'Deseja adicionar uma nova turma?',
      
      buttons: [
        {
          text: 'Cancelar',
          handler: values => {
            console.log('Cancelado!');
          }
        },
        {
          text: 'Adicionar',
          handler: values => {
            console.log('Adicionar');
            newTurma.present();
          }
        }
      ]
    });

    const newTurma = this.alertCtrl.create({
      title: 'Nova Turma',
      message: 'Insira os dados da turma:',
      inputs: [
        {
          name: 'nomeT',
          placeholder: 'Nome da Turma',
        },
        {
          name: 'nomeP',
          placeholder: 'Nome do Professor',
        },
        {
          name: 'salaT',
          placeholder: 'Número da Sala'
        },
        {
          name: "horario",
          placeholder: "Horário",
          type: "time"
        }
      ],
      
      buttons: [
        {
          text: 'Cancel',
          handler: values => {
            console.log('Cancelado!');
          }
        },
        {
          text: 'Adicionar',
          handler: values => {
            console.log('Salvo! Valor: ' + values);
            nome = values.nomeT;
            prof = values.nomeP;
            sala = values.salaT;
            hora = values.horario;

            this.upToBD(nome,prof,sala,hora);
          }
        }
      ]
    });
    
    confirm.present();
  }

  upToBD(nome, prof, sala, hora){
    
  }

  adicionarGrade() {
    // console.log(this.storage.get("aluno_ra"))
    this.storage.get("aluno_ra").then(ra_aluno => {
      var path = 'http://104.248.9.4:3000/api/grades/get/compromissos/aluno?ra_aluno=' + ra_aluno +
                 '&dt_inicio=' + this.semana[0].yyyy + '-' + this.semana[0].mm + '-' + this.semana[0].dd +
                 '&dt_fim=' + this.semana[6].yyyy + '-' + this.semana[6].mm + '-' + this.semana[6].dd
      // console.log(this.semana)
      this.http.get(path).map(res => res.json()).subscribe(data => {
        console.log(data)
        data.data.forEach(c => {
          var o = {}

          if (c.tipo == 'aula')
          {
            var dia_semana = this.extenso[c.dia_semana]
            o["dia_mes"] = ""
          }
          else
          {
            var dia = new Date(c.dia)
            o["dia_mes"] = dia.getDate() < 10 ? '0' + String(dia.getDate()) : String(dia.getDate())
            o["mes"] = dia.getMonth() < 10 ? '0' + String(dia.getMonth()) : String(dia.getMonth())
            o["ano"] = String(dia.getFullYear())
            var dia_semana:any = this.diasSemana[dia.getDay()]
          }

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

          this.compromissos[dia_semana].push(
            // Colocar aqui informacoes do compromisso que vao ser adicionadas no evento
            o
          )
        })
      }, (err) => {
        console.log(err)
      })
    })
    console.log(this.compromissos)
  }

  selecionarCompromisso(ds, c) {
    // console.log(this.compromissos[ds][e])
    // console.log(ds, c)
    this.navCtrl.push(GradeEventoPage, {dados: this.compromissos[ds][c]})
  }

  eventoOuNao(compromisso) {
    // console.log(compromisso)
    if (compromisso.tipo == 'evento')
      return true
    return false
  }

  clickAgenda() {
    this.navCtrl.push(AgendaPage)
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
