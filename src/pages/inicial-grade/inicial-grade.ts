import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login'
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-inicial-grade',
  templateUrl: 'inicial-grade.html',
})
export class InicialGradePage {

  tabela = new Array(7);

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public storage: Storage) {
  }
  
  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewWillEnter() {
    this.checkSession();
    console.log('ionViewWillEnter InicialGradePage');
    document.getElementById("tabs").style.display = "block"
    document.getElementById("botao_menu").style.display = "block"
    this.carregarGrade();
  }
  
  carregarGrade() {
    console.log(this.storage.get("aluno_ra"))
    this.storage.get("aluno_ra").then(ra_aluno => {
      var path = 'http://localhost:3000/api/grades/get/grade/aluno?ra_aluno=' + ra_aluno
      this.http.get(path).map(res => res.json()).subscribe(data => {
        this.gradeParaMatriz(data)
      }, (err) => {
        document.getElementById("teste").textContent = err;
        console.log(err)
      })
    })
  }
  
  gradeParaMatriz(data) {
    for (var i = 0; i < this.tabela.length; i++) {
      this.tabela[i] = new Array(6);
    }

    this.tabela[0][1] = 'SEG'
    this.tabela[0][2] = 'TER'
    this.tabela[0][3] = 'QUA'
    this.tabela[0][4] = 'QUI'
    this.tabela[0][5] = 'SEX'

    this.tabela[1][0] = '8h'
    this.tabela[2][0] = '10h'
    this.tabela[3][0] = '13h30'
    this.tabela[4][0] = '15h30'
    this.tabela[5][0] = '19h'
    this.tabela[6][0] = '21h'


    var ds = {'SEG': 1, 'TER': 2, 'QUA': 3, 'QUI': 4, 'SEX': 5}
    var hd = {'8:00:00': 1, '10:00:00': 2, '13:30:00': 3, '15:30:00': 4, '19:00:00': 5, '21:00:00': 6}


    data.data.forEach(aula =>
      this.tabela[hd[aula.hora]][ds[aula.dia_semana]] = aula.nome_uc
    )
  }
}
