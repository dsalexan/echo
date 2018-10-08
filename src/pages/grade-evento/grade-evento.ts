import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dados = navParams.get('dados');
    console.log(this.dados)
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter GradeEventoPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

  eventoOuNao(compromisso) {
    console.log(compromisso)
    if (compromisso.tipo == 'evento')
      return true
    return false
  }
}
