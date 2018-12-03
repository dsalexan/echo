import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage, public http: HttpClient, public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter LoginPage');
    var he = new Headers()
    he.append('Content-Type', 'application/json')
    let sr = '104.248.9.4'
    // let sr = 'localhost'
    // this.http.post('https://webhook.site/47b7ba5c-0fd0-487c-a161-f83921024e02', {'bla': '1'}, {headers: he}).map(res => res.json()).subscribe(result => {
    // this.http.post('http://' + sr + ':3000/teste', {'login': user, 'senha': encryptSenha}, {headers: new HttpHeaders()}).subscribe(result => {
    
    // this.http.put('http://' + sr + ':3000/teste', {'bla': '1'}, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(result => {
    // this.http.get('http://' + sr + ':3000/teste', {responseType: 'text'}).subscribe(result => {
    //   console.log(result)
    //   let alert = this.alertCtrl.create({
    //     title: 'Ops!',
    //     subTitle: 'Verifique as informações inseridas',
    //     buttons: ['Dismiss']
    //   });
    //   alert.present();
    // }, err => {
    //   console.log(err)
    //   console.log(Object.keys(err))
    //   console.log(Object.values(err))
    //   let alert = this.alertCtrl.create({
    //     title: err.name,
    //     subTitle: err.message,
    //     buttons: ['Dismiss']
    //   });
    //   alert.present();
    // })

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

      var path = 'http://104.248.9.4:3000/api/auth/login' //?login='+ user + '&senha='+ 
      var params = 'login='+ user + '&senha='+ encryptSenha

      //var path = 'http://104.248.9.4.4:3000/api/auth/login?login='+ user + '&senha='+ senha
      // this.http.setDataSerializer('json');
      // this.http.post(path, {'login': user, 'senha': encryptSenha}).subscribe(result => {
      //   loading.dismiss();
      let datas = {
        'login': user, 'senha': encryptSenha
    };
    let headers = {
        'Content-Type': 'text/plain'
    };
    var he = new Headers()
    he.append('Content-Type', 'application/json')
    // , ...headers

    this.http.post(path, {'login': user, 'senha': encryptSenha}, {headers: new HttpHeaders()}).subscribe(result => {
      loading.dismiss();
      // console.log(result.data)
      // console.log(JSON.parse(result.data))
      // result = JSON.parse(result.data)
      // console.log('A',result["data"])
      // console.log('B', result.data)
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
    },(err) => {
      console.log(err) //quando autenticacao falha, retorna erro 401, com auth false
      let alert = this.alertCtrl.create({
        title: 'Ops!',
        subTitle: 'Verifique as informações inseridas',
        buttons: ['Dismiss']
      });
      alert.present();
})
    // this.http.post(path, datas, {headers: he}).map(res => res.json()).subscribe(result => {
      // this.http.post(path, {'login': user, 'senha': encryptSenha}, headers).then(result => {
      //   loading.dismiss();
      //   console.log(result)
      //   console.log(result.data)
      //   // console.log(JSON.parse(result.data))
      //   // result = JSON.parse(result.data)
      //   // console.log('A',result["data"])
      //   console.log('B', result.data)
      //   // console.log(typeof data)
      //   /* tslint:disable */
      //   if(result.data && result.data) {
      //     this.storage.set("aluno_ra", result.data.ra)
      //     this.storage.set("aluno_nome", result.data.nome)
      //     this.storage.set("aluno_senha", senha)
      //     this.storage.set("aluno_login", result.data.login)
      //     this.storage.set("aluno_email", result.data.email == null ? "" : result.data.email)
      //     this.storage.set("aluno_telefone", result.data.telefone == null ? "" : result.data.telefone)

      //     this.navCtrl.push(HomePage, {dados: this.dados});
      //   } else {
      //     let alert = this.alertCtrl.create({
      //       title: 'Ops!',
      //       subTitle: 'Verifique as informações inseridas',
      //       buttons: ['Dismiss']
      //     });
      //     alert.present();
      //   }
      //   /* tslint:enable */
      // },(err) => {
      //   loading.dismiss();
      //   console.log(err) //quando autenticacao falha, retorna erro 401, com auth false
      //   let alert = this.alertCtrl.create({
      //     title: 'Ops!',
      //     subTitle: 'Verifique as informações inseridas',
      //     buttons: ['Dismiss']
      //   });
      //   alert.present();
      // })
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
