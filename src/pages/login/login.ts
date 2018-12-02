import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage';

import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { CadastroPage } from '../cadastro/cadastro';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/map';
import { AES, lib, PBKDF2, pad, mode } from 'crypto-js'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  dados = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage, public http: HTTP, public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter LoginPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }
  
  clickLogin() {
    // document.getElementById("teste").textContent = this.dados["usuario"];
    this.verificarCredenciais(this.dados["usuario"], this.dados["senha"])
  }

  verificarCredenciais(user, senha) {
    user = (user == null || user == '') ? '' : user
    senha = (senha == null || user == '') ? '' : senha

    if(user != '' && senha != '') {
      // Loading message
      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });
      loading.present();
      
      // Encrypt
      var encryptSenha = this.encrypt(senha, 'Achilles');

<<<<<<< HEAD
      var path = 'http://104.248.9.4.4:3000/api/auth/login' //?login='+ user + '&senha='+ 
=======
      var path = 'http://localhost:3000/api/auth/login' //?login='+ user + '&senha='+ 
>>>>>>> 0365b6ba1dbe3f0e991f7dd1437b91b4feb42eae
      var params = 'login='+ user + '&senha='+ encryptSenha

      //var path = 'http://104.248.9.4.4:3000/api/auth/login?login='+ user + '&senha='+ senha
      // this.http.setDataSerializer('json');
      // this.http.post(path, {'login': user, 'senha': encryptSenha}).subscribe(result => {
      //   loading.dismiss();
      let datas = {
        'login': user, 'senha': encryptSenha
    };
    let headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };

      this.http.post(path, {'login': user, 'senha': encryptSenha}, headers).then(result => {
        loading.dismiss();
        console.log(result)
        console.log(result.data)
        console.log(JSON.parse(result.data))
        result = JSON.parse(result.data)
        console.log('A',result["data"])
        console.log('B', result.data)
        // console.log(typeof data)
        /* tslint:disable */
        if(result["auth"] && result["data"]) {
          this.storage.set("aluno_ra", result["data"].ra)
          this.storage.set("aluno_nome", result["data"].nome)
          this.storage.set("aluno_senha", senha)
          this.storage.set("aluno_login", result["data"].login)
          this.storage.set("aluno_email", result["data"].email == null ? "" : result["data"].email)
          this.storage.set("aluno_telefone", result["data"].telefone == null ? "" : result["data"].telefone)

          this.navCtrl.push(HomePage, {dados: this.dados});
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Verifique as informações inseridas',
            buttons: ['Dismiss']
          });
          alert.present();
        }
        /* tslint:enable */
      }).catch((err) => {
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

  encrypt (msg, pass) {
    var keySize = 256;
    var iterations = 100;

    var salt = lib.WordArray.random(128/8);
    
    var key = PBKDF2(pass, salt, {
        keySize: keySize/32,
        iterations: iterations
      });
  
    var iv = lib.WordArray.random(128/8);
    
    var encrypted = AES.encrypt(msg, key, { 
      iv: iv, 
      padding: pad.Pkcs7,
      mode: mode.CBC
      
    });
    
    // salt, iv will be hex 32 in length
    // append them to the ciphertext for use  in decryption
    var transitmessage = salt.toString()+ iv.toString() + encrypted.toString();
    return transitmessage;
  }
}
