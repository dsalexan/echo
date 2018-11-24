import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { HomePage } from '../home/home';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController) {
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
      var dia = '2018-09-03'
      var hora = '10:00'
      var tipo = this.tipo
      var descricao = this.descricao
      var path = 'http://localhost:3000/api/bugreport/put/bug?ra_aluno=' + usu + '&dia=' + dia + '&hora=' + hora + '&tipo=' + tipo + '&descricao=' + descricao

      this.http.get(path).map(res => res.json()).subscribe(data => {
        if(data.success) {
          alert.present();
        }else {
          alertError.present();
        }
      })
    })
  }
}
