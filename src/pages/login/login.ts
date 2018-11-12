import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { CadastroPage } from '../cadastro/cadastro';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  dados = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage, public http: Http) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter LoginPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }
  
  clickLogin() {
    // document.getElementById("teste").textContent = this.dados["usuario"];
    this.verificarCredenciais(this.dados["usuario"], this.dados["senha"], this.dados["lembrar"])
  }

  verificarCredenciais(user, senha, lembrar) {
    user = (user == null || user == '') ? '' : user
    senha = (senha == null || user == '') ? '' : senha

    if(user != '' && senha != '') {
      var path = 'http://localhost:3000/api/auth/login?login='+ user + '&senha='+ senha
      //var path = 'http://104.248.9.4.4:3000/api/auth/login?login='+ user + '&senha='+ senha
      this.http.get(path).map(res => res.json()).subscribe(data => {
        console.log('data', data.auth)
        console.log('data', data.data)
        if(data.auth && data.data != undefined) {

          //this.storage.set("aluno_ra", data.data[0].ra_aluno)
          this.storage.set("aluno_nome", data.data.nome)
          //this.storage.set("aluno_user", data.data[0].user)
          this.storage.set("aluno_login", data.data.login_intranet)
          //this.storage.set("aluno_email", data.data[0].email)
          //this.storage.set("aluno_telefone", data.data[0].telefone)
          
          if (lembrar) {
            //this.storage.set("aluno_senha", this.dados["senha"])
          }
          
          this.navCtrl.push(HomePage, {dados: this.dados});
          //this.navCtrl.push(CadastroPage, {dados: this.dados});
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Verifique as informações inseridas',
            buttons: ['Dismiss']
          });
          alert.present();
        }
      }, (err) => {
        console.log(err) //quando autenticacao falha, retorna erro 401, com auth false
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Verifique as informações inseridas',
          buttons: ['Dismiss']
        });
        alert.present();
      })
    } else {
      let alert = this.alertCtrl.create({
        title: 'Ops!',
        subTitle: 'Verifique as informações inseridas',
        buttons: ['Dismiss']
      });
      alert.present();
    }

    // verificar se usuario this.dados["usuario"] existe
    // verificar se a senha this.dados["senha"] esta correta
    // isso por web crawling
  }

  primeiroLogin() {
    // verificar se usuario this.dados["usuario"] já está cadastrado no postgres
    return true;
  }
}
