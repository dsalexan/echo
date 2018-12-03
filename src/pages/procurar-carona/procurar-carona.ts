import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Navbar } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ResCaronaPage } from '../res-carona/res-carona';
import { InicialCaronaPage } from '../inicial-carona/inicial-carona';


@IonicPage()
@Component({
  selector: 'page-procurar-carona',
  templateUrl: 'procurar-carona.html',
})
export class ProcurarCaronaPage {
  @ViewChild(Navbar)navBar: Navbar;

  date: string;
  viagem = {}
  lista = []
  loc = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public alertCtrl: AlertController) {
    this.viagem["data"] = undefined;
    this.viagem["hora"] = undefined;
    this.viagem["id_origem"] = undefined;
    this.viagem["id_destino"] = undefined;
    this.viagem["qtd_vagas"] = undefined;
  }

  onChange($event) {
    //console.log($event);
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  mostrarLocalidade(){
    var path = 'http://104.248.9.4:3000/api/caronas/get/localidades'
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data["data"][0] != undefined) {
        data["data"].forEach(element => {
          this.loc[element.id_local] = element.descricao
          this.lista.push(element)
        });
      }

    }, (err) => {
        console.log(err)
    })
  }

  procura1(){
    var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/data_hora_origem_destino_vagas?data=' + this.viagem["data"]  + '&hora=' + this.viagem["hora"] + '&origem=' + this.viagem["id_origem"] + '&destino=' + this.viagem["id_destino"] + '&qtd_vagas=' + this.viagem["qtd_vagas"]
      
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data["data"][0] != {}) {
          this.navCtrl.push(ResCaronaPage, {p1: data["data"], p2:this.viagem, loc:this.loc});
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

  procura2(){
    var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/data_hora_origem_destino?data=' + this.viagem["data"]  + '&hora=' + this.viagem["hora"] + '&origem=' + this.viagem["id_origem"] + '&destino=' + this.viagem["id_destino"]
      
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data["data"][0] != {}) {
        this.navCtrl.push(ResCaronaPage, {p1: data["data"], p2:this.viagem, loc:this.loc});
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

  procura3(){
    var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/data_hora_origem?data=' + this.viagem["data"]  + '&hora=' + this.viagem["hora"] + '&origem=' + this.viagem["id_origem"]
      
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data["data"][0] != {}) {
        this.navCtrl.push(ResCaronaPage, {p1: data["data"], p2:this.viagem, loc:this.loc});
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

  procura4(){
    var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/data_hora_destino?data=' + this.viagem["data"]  + '&hora=' + this.viagem["hora"] + '&destino=' + this.viagem["id_destino"]
      
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data["data"][0] != {}) {
        this.navCtrl.push(ResCaronaPage, {p1: data["data"], p2:this.viagem, loc:this.loc});
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

  procura5(){
    var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/data_origem?data=' + this.viagem["data"] + '&origem=' + this.viagem["id_origem"]
      
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data["data"][0] != {}) {
        this.navCtrl.push(ResCaronaPage, {p1: data["data"], p2:this.viagem, loc:this.loc});
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

  procura6(){
    var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/data_destino?data=' + this.viagem["data"] + '&destino=' + this.viagem["id_destino"]
      
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data["data"][0] != {}) {
        this.navCtrl.push(ResCaronaPage, {p1: data["data"], p2:this.viagem, loc:this.loc});
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
  
  procura7(){
    var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/data_origem_destino?data=' + this.viagem["data"] + '&origem=' + this.viagem["id_origem"] + '&destino=' + this.viagem["id_destino"]
      
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data["data"][0] != {}) {
        this.navCtrl.push(ResCaronaPage, {p1: data["data"], p2:this.viagem, loc:this.loc});
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

  procura8(){
    var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/data_hora_origem_vagas?data=' + this.viagem["data"] + '&hora=' + this.viagem["hora"] + '&origem=' + this.viagem["id_origem"] + '&qtd_vagas=' + this.viagem["qtd_vagas"]
      
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data["data"][0] != {}) {
          this.navCtrl.push(ResCaronaPage, {p1: data["data"], p2:this.viagem, loc:this.loc});
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

  procura9(){
    var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/data_hora_destino_vagas?data=' + this.viagem["data"] + '&hora=' + this.viagem["hora"] + '&destino=' + this.viagem["id_destino"] + '&qtd_vagas=' + this.viagem["qtd_vagas"]
      
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data["data"][0] != {}) {
        this.navCtrl.push(ResCaronaPage, {p1: data["data"], p2:this.viagem, loc:this.loc});
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

  procura10(){
    var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/data_hora_vagas?data=' + this.viagem["data"] + '&hora=' + this.viagem["hora"] + '&qtd_vagas=' + this.viagem["qtd_vagas"]
      
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data["data"][0] != {}) {
        this.navCtrl.push(ResCaronaPage, {p1: data["data"], p2:this.viagem, loc:this.loc});
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

  procura11(){
    var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/data_vagas?data=' + this.viagem["data"] + '&qtd_vagas=' + this.viagem["qtd_vagas"]
      
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data["data"][0] != {}) {
        this.navCtrl.push(ResCaronaPage, {p1: data["data"], p2:this.viagem, loc:this.loc});
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

  procura12(){
    var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/data_hora?data=' + this.viagem["data"] + '&hora=' + this.viagem["hora"]
      
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data["data"][0] != {}) {
        this.navCtrl.push(ResCaronaPage, {p1: data["data"], p2:this.viagem, loc:this.loc});
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

  procura13(){
    var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/data?data=' + this.viagem["data"]
      
    this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
    // this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data["data"][0] != {}) {
        this.navCtrl.push(ResCaronaPage, {p1: data["data"], p2:this.viagem, loc:this.loc});
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

  procurar(){
    //console.log(this.viagem)
    if(this.viagem["data"] != undefined && this.viagem["hora"] != undefined && this.viagem["id_origem"] != undefined && this.viagem["id_destino"] != undefined && this.viagem["qtd_vagas"] != undefined)
      //console.log('dia hora origem destino vagas')
      this.procura1();
    
    else if(this.viagem["data"] != undefined && this.viagem["hora"] != undefined && this.viagem["id_origem"] != undefined && this.viagem["id_destino"] != undefined && this.viagem["qtd_vagas"] == undefined)
      //console.log('dia hora origem destino')
      this.procura2();

    else if(this.viagem["data"] != undefined && this.viagem["hora"] != undefined && this.viagem["id_origem"] != undefined && this.viagem["id_destino"] == undefined && this.viagem["qtd_vagas"] == undefined)
      //console.log('dia hora origem')
      this.procura3()
    
    else if(this.viagem["data"] != undefined && this.viagem["hora"] != undefined && this.viagem["id_origem"] == undefined && this.viagem["id_destino"] != undefined && this.viagem["qtd_vagas"] == undefined)
      //console.log('dia hora destino')
      this.procura4();
    
    else if(this.viagem["data"] != undefined && this.viagem["hora"] == undefined && this.viagem["id_origem"] != undefined && this.viagem["id_destino"] == undefined && this.viagem["qtd_vagas"] == undefined)
      //console.log('dia origem')
      this.procura5();
    
    else if(this.viagem["data"] != undefined && this.viagem["hora"] == undefined && this.viagem["id_origem"] == undefined && this.viagem["id_destino"] != undefined && this.viagem["qtd_vagas"] == undefined)
      //console.log('dia destino')
      this.procura6();
  
    else if(this.viagem["data"] != undefined && this.viagem["hora"] == undefined && this.viagem["id_origem"] != undefined && this.viagem["id_destino"] != undefined && this.viagem["qtd_vagas"] == undefined)
      //console.log('dia origem destino')
      this.procura7();

    else if(this.viagem["data"] != undefined && this.viagem["hora"] != undefined && this.viagem["id_origem"] != undefined && this.viagem["id_destino"] == undefined && this.viagem["qtd_vagas"] != undefined)
      //console.log('dia hora origem vagas')
      this.procura8();
    
    else if(this.viagem["data"] != undefined && this.viagem["hora"] != undefined && this.viagem["id_origem"] == undefined && this.viagem["id_destino"] != undefined && this.viagem["qtd_vagas"] != undefined)
      //console.log('dia hora destino vagas')
      this.procura9();

    else if(this.viagem["data"] != undefined && this.viagem["hora"] != undefined && this.viagem["id_origem"] == undefined && this.viagem["id_destino"] == undefined && this.viagem["qtd_vagas"] != undefined)
      //console.log('dia hora vagas')
      this.procura10();

    else if(this.viagem["data"] != undefined && this.viagem["hora"] == undefined && this.viagem["id_origem"] == undefined && this.viagem["id_destino"] == undefined && this.viagem["qtd_vagas"] != undefined)
      //console.log('dia vagas')
      this.procura11();

    else if(this.viagem["data"] != undefined && this.viagem["hora"] != undefined && this.viagem["id_origem"] == undefined && this.viagem["id_destino"] == undefined && this.viagem["qtd_vagas"] == undefined)
      //console.log('dia hora')
      this.procura12();
    
    else if(this.viagem["data"] != undefined && this.viagem["hora"] == undefined && this.viagem["id_origem"] == undefined && this.viagem["id_destino"] == undefined && this.viagem["qtd_vagas"] == undefined)
      //console.log('dia')
      this.procura13();

    else{
      let alert = this.alertCtrl.create({
        title: 'Ops!',
        subTitle: 'Altere os dados de sua busca!',
        buttons: ['Fechar']
      });
      alert.present();
    }
  }
  
  ionViewWillEnter() {
    this.checkSession();
    this.navBar.backButtonClick = () => {
      // you can set a full custom history here if you want 
        let pages = [
        {
      page: InicialCaronaPage
      }
      ];
      this.navCtrl.setPages(pages);
    }
    this.mostrarLocalidade();
    console.log('ionViewWillEnter OferecerCaronaPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}