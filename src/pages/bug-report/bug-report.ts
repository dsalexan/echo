import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';


import endpoints from '../../../constants/endpoints'

/**
 * Generated class for the BugReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bug-report',
  templateUrl: 'bug-report.html',
})
export class BugReportPage {

  descricao: string = "";
  tipo: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.checkSession();
  }

  clickBack() {
    this.navCtrl.pop()
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BugReportPage');
  }
  
  submitBugReport() {
    let alert = this.alertCtrl.create({
      title: 'Bug report enviado!',
      subTitle: 'Muito obrigado',
      buttons: ['Dismiss']
    });

    let alertError = this.alertCtrl.create({
      title: 'Problema!',
      subTitle: 'Houve algum erro na tentativa de enviar :(',
      buttons: ['Dismiss']
    });
    
    this.storage.get("aluno_ra").then((usu) => {
      var dia = this.formatDate(new Date())
      var hora = (new Date()).toTimeString().split(' ')[0]
      hora = hora.slice(0, hora.length-3) 
      var tipo = this.tipo
      var descricao = this.descricao

      this.http.post(endpoints.bug.report, {
        ra_aluno: usu,
        dia,
        hora,
        tipo,
        descricao
      }, {headers: new HttpHeaders()}).subscribe(data => {
        if(data["success"]) {
          alert.present();
          this.navCtrl.push(HomePage);
        }else {
          alertError.present();
        }
      })
    })
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
