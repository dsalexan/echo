import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginPage } from '../login/login';
import { ResultadoDivulgacaoPage } from '../resultado-divulgacao/resultado-divulgacao'
import { InicialDivulgacaoPage } from '../inicial-divulgacao/inicial-divulgacao';

import endpoints from '../../../constants/endpoints'

@IonicPage()
@Component({
  selector: 'page-filtrar-divulgacao',
  templateUrl: 'filtrar-divulgacao.html',
})

export class FiltrarDivulgacaoPage {
  date: String;
  item = {} // {} tipo: objetoF
  lista = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public alertCtrl: AlertController) {
    this.item["id_tipo"] = undefined;
    this.item["valor"] = undefined;
    this.item["hora_inicio"] = undefined;
    this.item["hora_fim"] = undefined;
    this.item["quantidade"] = undefined;
    this.item["dia"]=undefined;
  }

  onChange($event) {
    console.log($event);
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  clickBack(){
    this.navCtrl.push(InicialDivulgacaoPage)
  }
  
  PreencherListaTipo(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/select_tipo'
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log(data)
      data["data"].forEach(tipo => {
        this.lista.push({id_tipo:tipo.id_tipo, nome_tipo:tipo.nome_tipo})
      })
    }, (err) => {
        console.log(err)
    })
  }

  busca_divulgacao_dia_hora_inicio(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/dia/hora_inicio?dia=' + this.item["dia"] + '&hora_inicio=' + this.item["hora_inicio"]

    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log('RESULTADO', data)

      if(data["data"][0] != {}) {
        this.navCtrl.push(ResultadoDivulgacaoPage, {data: data["data"]});
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Fechar']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })

  }

  busca_divulgacao_dia_hora_fim(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/dia/hora_inicio?dia=' + this.item["dia"] + '&hora_fim=' + this.item["hora_fim"]

    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log('RESULTADO', data)

      if(data["data"].length != 0) {
        this.navCtrl.push(ResultadoDivulgacaoPage, {data: data["data"]});
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Fechar']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })
  }

  busca_divulgacao_dia_preco(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/dia/preco?dia=' + this.item["dia"] + '&preco=' + this.item["valor"]

    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log('RESULTADO', data)

      if(data["data"].length != 0) {
        this.navCtrl.push(ResultadoDivulgacaoPage, {data: data["data"]});
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Fechar']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })
  }

  busca_divulgacao_dia_quantidade(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/dia/quantidade?dia=' + this.item["dia"] + '&quantidade=' + this.item["quantidade"]

    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log('RESULTADO', data)

      if(data["data"].length != 0) {
        this.navCtrl.push(ResultadoDivulgacaoPage, {data: data["data"]});
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Fechar']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })
  }
  
  busca_divulgacao_dia(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/dia?dia=' + this.item["dia"]

    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log('RESULTADO', data)

      if(data["data"].length != 0) {
        this.navCtrl.push(ResultadoDivulgacaoPage, {data: data["data"]});
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Fechar']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })

  }

  busca_divulgacao_hora_inicio(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/hora_inicio?hora_inicio=' + this.item["hora_inicio"]
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log('RESULTADO', data["data"])

      console.log('len', data["data"].length)
      if(data["data"].length != 0) {
        this.navCtrl.push(ResultadoDivulgacaoPage, {data: data["data"]});
      } else {
        console.log('len2', data["data"].length)
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Fechar']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })
  }

  busca_divulgacao_hora_fim(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/hora_fim?hora_fim=' + this.item["hora_fim"]
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log('RESULTADO', data)

      if(data["data"].length != 0) {
        this.navCtrl.push(ResultadoDivulgacaoPage, {data: data["data"]});
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Fechar']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })
  }


  busca_divulgacao_preco(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/preco?preco=' + this.item["valor"]

    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log('RESULTADO', data)

      if(data["data"].length != 0) {
        this.navCtrl.push(ResultadoDivulgacaoPage, {data: data["data"]});
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Fechar']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })

  }

  busca_divulgacao_tipo_dia_hora(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/tipo/diahora?tipo=' + this.item["tipo"] + '&dia=' + this.item["dia"] + '&hora_inicio=' + this.item["hora_inicio"] 

    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log('RESULTADO', data)

      if(data["data"].length != 0) {
        this.navCtrl.push(ResultadoDivulgacaoPage, {data: data["data"]});
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Fechar']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })

  }

  busca_divulgacao_tipo_dia(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/tipo/dia?tipo=' + this.item["tipo"] + '&dia=' + this.item["dia"]  

    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log('RESULTADO', data)

      if(data["data"].length != 0) {
        this.navCtrl.push(ResultadoDivulgacaoPage, {data: data["data"]});
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Fechar']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })

  }

  busca_divulgacao_tipo_preco(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/tipo/preco?tipo=' + this.item["tipo"] + '&preco=' + this.item["valor"]  

    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log('RESULTADO', data)

      if(data["data"].length != 0) {
        this.navCtrl.push(ResultadoDivulgacaoPage, {data: data["data"]});
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Fechar']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })

  }
  
  busca_divulgacao_tipo_quantidade(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/tipo/quantidade?tipo=' + this.item["tipo"] + '&quantidade=' + this.item["quantidade"]  

    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log('RESULTADO', data)

      if(data["data"].length != 0) {
        this.navCtrl.push(ResultadoDivulgacaoPage, {data: data["data"]});
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Fechar']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })

  }

  busca_divulgacao_tipo(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/tipo?id_tipo=' + this.item["id_tipo"]

    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log('RESULTADO', data)

      if(data["data"].length != 0) {
        this.navCtrl.push(ResultadoDivulgacaoPage, {data: data["data"]});
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Fechar']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })
  }

  busca_divulgacao(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao'

    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log('RESULTADO', data)

      if(data["data"].length != 0) {
        this.navCtrl.push(ResultadoDivulgacaoPage, {data: data["data"]});
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Fechar']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })
  }
 
  busca_divulgacao_quantidade(){
    var path = 'http://104.248.9.4:3000/api/divulgacao/get/divulgacao/quantidade?quantidade=' + this.item["quantidade"]

    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {
      console.log('RESULTADO', data)

      if(data["data"].length != 0) {
        this.navCtrl.push(ResultadoDivulgacaoPage, {data: data["data"]});
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Tente novamente',
          buttons: ['Fechar']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err)
    })
  }


  buscar(){
    console.log(this.item)
    if(this.item["dia"] != undefined && this.item["hora_inicio"] != undefined && this.item["hora_fim"] == undefined && this.item["quantidade"] == undefined && this.item["valor"] == undefined && this.item["id_tipo"] == undefined)
      this.busca_divulgacao_dia_hora_inicio();

    else if(this.item["dia"] != undefined && this.item["hora_fim"] != undefined && this.item["hora_inicio"] == undefined && this.item["id_tipo"] == undefined && this.item["valor"] == undefined && this.item["quantidade"] == undefined)
      this.busca_divulgacao_dia_hora_fim();
    
    else if(this.item["dia"] != undefined && this.item["valor"] != undefined && this.item["hora_inicio"] == undefined && this.item["hora_fim"] == undefined && this.item["quantidade"] == undefined && this.item["id_tipo"] == undefined)
      this.busca_divulgacao_dia_preco();

    else if(this.item["dia"] != undefined && this.item["quantidade"] != undefined && this.item["hora_inicio"] == undefined && this.item["hora_fim"] == undefined && this.item["valor"] == undefined && this.item["id_tipo"] == undefined)
      this.busca_divulgacao_dia_quantidade();

    else if(this.item["dia"] != undefined && this.item["quantidade"] == undefined && this.item["hora_inicio"] == undefined && this.item["hora_fim"] == undefined && this.item["valor"] == undefined && this.item["id_tipo"] == undefined)
      this.busca_divulgacao_dia();

    else if(this.item["hora_inicio"] != undefined && this.item["quantidade"] == undefined && this.item["dia"] == undefined && this.item["hora_fim"] == undefined && this.item["valor"] == undefined && this.item["id_tipo"] == undefined)
      this.busca_divulgacao_hora_inicio();

    else if(this.item["hora_fim"] != undefined && this.item["quantidade"] == undefined && this.item["dia"] == undefined && this.item["hora_inicio"] == undefined && this.item["valor"] == undefined && this.item["id_tipo"] == undefined)
    this.busca_divulgacao_hora_fim();
    
    else if(this.item["valor"] != undefined && this.item["quantidade"] == undefined && this.item["hora_inicio"] == undefined && this.item["hora_fim"] == undefined && this.item["dia"] == undefined && this.item["id_tipo"] == undefined)
      this.busca_divulgacao_preco();
    
    else if(this.item["id_tipo"] != undefined && this.item["dia"] != undefined && this.item["hora_inicio"] != undefined && this.item["hora_fim"] == undefined && this.item["valor"] == undefined && this.item["quantidade"] == undefined)
      this.busca_divulgacao_tipo_dia_hora();
    
    else if(this.item["id_tipo"] != undefined && this.item["dia"] != undefined && this.item["hora_inicio"] == undefined && this.item["hora_fim"] == undefined && this.item["valor"] == undefined && this.item["quantidade"] == undefined)
      this.busca_divulgacao_tipo_dia();

    else if(this.item["id_tipo"] != undefined && this.item["valor"] != undefined && this.item["hora_fim"] == undefined && this.item["hora_inicio"] == undefined && this.item["dia"] == undefined && this.item["quantidade"] == undefined)
      this.busca_divulgacao_tipo_preco();

    else if(this.item["id_tipo"] != undefined && this.item["quantidade"] != undefined && this.item["hora_fim"] == undefined && this.item["hora_inicio"] == undefined && this.item["valor"] == undefined && this.item["dia"] == undefined)
      this.busca_divulgacao_tipo_quantidade();

    else if(this.item["id_tipo"] != undefined && this.item["quantidade"] == undefined && this.item["hora_inicio"] == undefined && this.item["hora_fim"] == undefined && this.item["valor"] == undefined && this.item["dia"] == undefined)
      this.busca_divulgacao_tipo();
    
    else if(this.item["quantidade"] != undefined && this.item["dia"] == undefined && this.item["hora_inicio"] == undefined && this.item["hora_fim"] == undefined && this.item["valor"] == undefined && this.item["id_tipo"] == undefined)
      this.busca_divulgacao_quantidade();

    else if(this.item["quantidade"] == undefined && this.item["hora_inicio"] == undefined && this.item["hora_fim"] == undefined && this.item["valor"] == undefined && this.item["id_tipo"] == undefined  && this.item["dia"] == undefined)
      this.busca_divulgacao();

  }




  ionViewWillEnter() {
    this.checkSession();
    this.PreencherListaTipo();
    console.log('ionViewWillEnterFiltrarDivulgacaoPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}