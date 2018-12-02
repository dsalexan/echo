import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login'
import { TitleCasePipe } from '@angular/common';
import { CompradorDivulgacaoPage } from '../comprador-divulgacao/comprador-divulgacao';
import { VendedorDivulgacaoPage } from '../vendedor-divulgacao/vendedor-divulgacao';

@IonicPage()
@Component({
  selector: 'page-minhas-divulgacao',
  templateUrl: 'minhas-divulgacao.html',
})
export class MinhasDivulgacaoPage {

  itens_vendedor = [];
  itens_comprador = [];
  itens_vendedor_validos = [];
  itens_comprador_validos = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController) {
  }


  abrirVendedor(v){
    console.log(v)
    this.navCtrl.push(VendedorDivulgacaoPage, {item: v}); 
  }

  abrirComprador(v){
    this.navCtrl.push(CompradorDivulgacaoPage, {item: v});
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

  itensVendedor(){
    
    this.storage.get("aluno_ra").then((usu) => {
      
      var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/vendedor/ra_aluno?ra_aluno='+ usu
      this.http.get(path).map(res => res.json()).subscribe(data => {
        
        if(data.success) {
          console.log(data.data)
              this.itens_vendedor = data.data;        
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Tente novamente.',
            buttons: ['Fechar']
          });
          alert.present();
        }

        this.itens_vendedor.forEach(item =>{
          if(item.dia >= this.formatDate(new Date())){
            this.itens_vendedor_validos.push(item)
          }        
        })

      }, (err) => {
        console.log(err)
      })
    })
  }

  itensComprador(){
    
    this.storage.get("aluno_ra").then((usu) => {
      
      var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/comprador/ra_aluno?ra_aluno='+ usu
      console.log(path)

      this.http.get(path).map(res => res.json()).subscribe(data => {
        
        if(data.success) {
          console.log(data.data)
              this.itens_comprador = data.data;        
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Tente novamente.',
            buttons: ['Fechar']
          });
          alert.present();
        }
        
        this.itens_comprador.forEach(item =>{
          if(item.dia >= this.formatDate(new Date())){
            this.itens_comprador_validos.push(item)
          }        
        })

      }, (err) => {
        console.log(err)
      })
    })
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewDidLoad() {
    this.checkSession();
    this.itensVendedor();
    this.itensComprador();
    console.log('ionViewDidLoad MinhasDivulgacaoPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
