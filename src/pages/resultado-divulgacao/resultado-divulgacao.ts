import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http'; 

import { LoginPage } from '../login/login'
import { FiltrarDivulgacaoPage } from '../filtrar-divulgacao/filtrar-divulgacao'
import { DivulgacaoPage } from '../divulgacao/divulgacao'
import { CompradorDivulgacaoPage } from '../comprador-divulgacao/comprador-divulgacao';

// import { ViagemMotoristaPage } from '../viagem-motorista/viagem-motorista';
// import { ProcurarCaronaPage } from '../procurar-carona/procurar-carona';

@IonicPage()
@Component({
  selector: 'page-resultado-divulgacao',
  templateUrl: 'resultado-divulgacao.html',
})
export class ResultadoDivulgacaoPage {

    resultados = []
    resultados_validos = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController) {
    this.resultados = navParams.get("data")
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  validarResultados(){
    var total = 0
    this.resultados.forEach(item=> {
      this.storage.get("aluno_ra").then((ra) => {
        if(item.dia >= this.formatDate(new Date()) && item.ra_aluno != ra && item.quantidade > 0){
          this.resultados_validos.push(item)
        }
        total ++
        if(total == this.resultados.length){
          if(this.resultados_validos.length == 0) {
            let alert = this.alertCtrl.create({
              title: 'Ops!',
              subTitle: 'Não há ofertas para esta busca!',
              buttons: ['Fechar']
            });
            alert.present();
            this.navCtrl.push(FiltrarDivulgacaoPage);
          }
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

  Redirecionar(item){
    this.navCtrl.push(CompradorDivulgacaoPage, {item: item});
  }



  ionViewDidLoad() {
    this.checkSession();
    this.validarResultados();
    console.log('ionViewDidLoad ResultadoDivulgacaoPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }


}




