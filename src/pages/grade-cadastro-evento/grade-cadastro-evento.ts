import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { AgendaPage } from '../agenda/agenda';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import endpoints from '../../../constants/endpoints';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private http: HttpClient, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.preencherDropDown()
  }

  ionViewWillEnter() {
  }

  clickBack() {
    this.navCtrl.push(AgendaPage)
  }

  preencherDropDown() {
    this.storage.get("aluno_ra").then(ra_aluno => {
      var path = `${endpoints.api.grade._}/${ra_aluno}/turmas`
      this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
        data["data"].forEach(t => {
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

    var path2 = `${endpoints.api.grade.eventos}`
    this.http.get(path2, {headers: new HttpHeaders()}).subscribe(data => {
      data["data"].forEach(e => {
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
    this.storage.get("aluno_ra").then((ra_aluno) => {

      var path = `${endpoints.api.grade._}/${ra_aluno}/turmas/${this.evento['id_turma']}/eventos`
      
      this.http.post(path, {
        ...this.evento
      }, {headers: new HttpHeaders()}).subscribe(data => {
        if(data["success"]) {
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
