import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login'
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http) {
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewDidLoad() {
    // this.checkSession();
    console.log('ionViewDidLoad HomePage');
    document.getElementById("tabs").style.display = "block"
    document.getElementById("botao_menu").style.display = "block"
  }

  clickLogin() {
    this.navCtrl.push(LoginPage);
  }
  

  clickTeste() {

    var path = 'http://localhost:3000/api/grades/get/grade/aluno?ra_aluno=112344'
    this.http.get(path).map(res => res.json()).subscribe(data => {
      // let data: any[];
      // data = res as any[];
      // document.getElementById("teste").textContent = res.data[0].id_uc;
      console.log(data)
    }, (err) => {
      document.getElementById("teste").textContent = err;
      console.log(err)
    })
    // const req = this.http.get('http://localhost:3000/api/grades/get/grade/aluno?ra_aluno=112344', {}).subscribe(
    //   res => {
    //     document.getElementById("teste").textContent = 'oi';
    //     // let data: any[];
    //     // data = res as any[];
    //     // data.forEach(element =>
    //     //   this.
    //     // )
    //   }
    // )
  }
}
