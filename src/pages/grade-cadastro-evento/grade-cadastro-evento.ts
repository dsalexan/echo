import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { AgendaPage } from '../agenda/agenda';

/**
 * Generated class for the GradeCadastroEventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grade-cadastro-evento',
  templateUrl: 'grade-cadastro-evento.html',
})
export class GradeCadastroEventoPage {

  evento = {}
  lista_tipos_evento = []
  lista_turmas_aluno = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private http: Http, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.preencherDropDown()
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter GradeCadastroEventoPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

  preencherDropDown() {
    this.storage.get("aluno_ra").then(ra_aluno => {
      var path = 'http://104.248.9.4:3000/api/grades/get/turma/aluno?ra_aluno=' + ra_aluno
      this.http.get(path).map(res => res.json()).subscribe(data => {
        // console.log(data)
        data.data.forEach(t => {
          this.lista_turmas_aluno.push({
            id_turma: t.id_turma,
            nome_uc: t.nome_uc,
            nome_turma: t.nome_turma
          })
        })
      }, (err) => {
        console.log(err)
      })
    })

    var path2 = 'http://104.248.9.4:3000/api/grades/get/eventos'
    this.http.get(path2).map(res => res.json()).subscribe(data => {
      // console.log(data)
      data.data.forEach(e => {
        this.lista_tipos_evento.push({
          id_evento: e.id_evento,
          descricao: e.descricao
        })
      })
    }, (err) => {
      console.log(err)
    })
  }

  cadastrar() {
    var hora = ('hora' in this.evento) ? '&hora=' + this.evento["hora"] : ''
    var sala = ('sala' in this.evento) ? '&sala=' + this.evento["sala"] : ''
    var descricao = ('descricao' in this.evento) ? '&descricao=' + this.evento["descricao"] : ''
    console.log(this.evento)
    this.storage.get("aluno_ra").then((ra_aluno) => {
      var path = 'http://104.248.9.4:3000/api/grades/post/evento_turma?' +
      'id_evento=' + this.evento["id_evento"] + '&' +
      'id_turma=' + this.evento["id_turma"] + '&' +
      'ra_aluno=' + ra_aluno + '&' +
      'data=' + this.evento["data"] +
      hora + sala + descricao
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {

        if(data.success) {
          let alert = this.alertCtrl.create({
            title: 'Ok!',
            subTitle: 'Evento criado com sucesso',
            buttons: ['Dismiss']
          });
          alert.present();
          this.navCtrl.push(AgendaPage);
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Tente novamente',
            buttons: ['Dismiss']
          });
          alert.present();
        }
      }, (err) => {
        console.log(err)
      })
    })
  }
}
