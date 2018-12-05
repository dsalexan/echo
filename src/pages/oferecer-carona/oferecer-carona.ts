import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ViewController, Navbar } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginPage } from '../login/login'
import { InicialCaronaPage } from '../inicial-carona/inicial-carona';

import endpoints from '../../../constants/endpoints'

@IonicPage()
@Component({
  selector: 'page-oferecer-carona',
  templateUrl: 'oferecer-carona.html',
})

export class OferecerCaronaPage {
  @ViewChild(Navbar)navBar: Navbar;

  viagem = {}
  lista = []
  loc = new Object
  origem = []
  destino = []
  horateste = {}
  c = 0

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public alertCtrl: AlertController, public popOver: PopoverController, private datePicker: DatePicker) {
    this.origem = new Array
    this.destino = new Array
  }


  criaDic() {
    for (var i = 0; i < this.origem.length; i++) {
      if (!(String(this.origem[i]) in this.horateste))
        this.horateste[String(this.origem[i])] = ''
    }
    console.log('\norigem:')
    console.log(this.origem)
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
    this.http.get(endpoints.api.caronas.localidades, {headers: new HttpHeaders()}).subscribe(data => {

      if(data["data"][0] != undefined) {
        console.log(data)
        data["data"].forEach(element => {
          this.loc[element["id_local"]] = element ["descricao"]
          this.lista.push(element)
        });
        //console.log(this.loc)
      }

    }, (err) => {
        console.log(err)
    })
  }

  oferecer(){
    //salvar no banco de dados]
    //console.log('\norigem:')
    //console.log(this.origem)
    Object.keys(this.horateste).forEach( key => {
      //se a chave nao esta na origem, deleta
      //if (){
      if (! (this.origem.includes(parseInt(key)))) {
        console.log('\ndeletando:')
        console.log(key)
        delete this.horateste[key]
      }
    })
    //console.log('\nhorateste:')
    //console.log(this.horateste)

    console.log(this.viagem)
    
    var path
    var path2

    this.storage.get("aluno_ra").then((usu) => {
      
      + '&qtd_vagas=' + this.viagem["qtd_vagas"] + '&descricao='+ this.viagem["descricao"]
      
      this.http.post(endpoints.api.caronas._, {
        id_motorista: usu,
        dia: this.viagem['data'],
        preco: this.viagem['preco'],
        qtd_vagas: this.viagem["qtd_vagas"],
        descricao: this.viagem["descricao"]
      }, {headers: new HttpHeaders()}).subscribe(data => {

        if(data["success"]) {
          var id = data["data"].id_viagem
          var erro = 0
          Object.keys(this.horateste).forEach( key => {
            path = `${endpoints.api.caronas._}/${id}/origem`
            
            this.http.put(path, {
              hora: this.horateste[key],
              origem: key
            }, {headers: new HttpHeaders()}).subscribe(data => {
              
              if(data["success"]) {
              }else {
                erro = 1
                let alert = this.alertCtrl.create({
                  title: 'Ops!',
                  subTitle: 'Tente novamente',
                  buttons: ['Fechar']
                });
                alert.present();
              }
            })
          })
        
          var i = 0
          while (i < this.destino.length) {
            path2 = `${endpoints.api.caronas._}/${id}/destino`
            i++
            this.http.put(path2, {
              destino: this.destino[i]
            }, {headers: new HttpHeaders()}).subscribe(or => {
            // this.http.get(path2).map(res => res.json()).subscribe(or => {
              if(data["success"]) {
              }else {
                erro = 1
                let alert = this.alertCtrl.create({
                  title: 'Ops!',
                  subTitle: 'Tente novamente',
                  buttons: ['Fechar']
                });
                alert.present();
              }
            })
          }

          if(!erro){
            let alert = this.alertCtrl.create({
              title: 'Ok!',
              subTitle: 'Viagem criada com sucesso',
              buttons: ['Fechar']
            });
            alert.present();
            this.navCtrl.push(InicialCaronaPage);
          }
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
    })
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