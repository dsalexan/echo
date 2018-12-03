import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Navbar } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginPage } from '../login/login'
import { HomePage } from '../home/home';
import { MinhasCaronasPage } from '../minhas-caronas/minhas-caronas';
import { ResCaronaPage } from '../res-carona/res-carona';


@IonicPage()
@Component({
  selector: 'page-viagem-passageiro',
  templateUrl: 'viagem-passageiro.html',
})
export class ViagemPassageiroPage {
  @ViewChild(Navbar)navBar: Navbar;

  viagem: any;
  loc = {};
  mensagem_exclusao: String

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public alertCtrl: AlertController) {
    this.viagem = this.navParams.get("viagem");
    this.loc = this.navParams.get("loc");
    this.mensagem_exclusao = '';
  }

  deletarReserva(){
    console.log(this.mensagem_exclusao)

    this.storage.get("aluno_ra").then((usu) => {
      var path = 'http://104.248.9.4:3000/api/caronas/delete/reserva?id=' + this.viagem["id_viagem"] + '&ra=' + usu
      
      this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
      // this.http.get(path).map(res => res.json()).subscribe(data => {

        if(data["success"]) {
          var path2 = 'http://104.248.9.4:3000/api/caronas/put/viagem/aumenta_vaga?id=' + this.viagem["id_viagem"]
          this.http.get(path2, {headers: new HttpHeaders()}).subscribe(data2 => {
          // this.http.get(path2).map(res => res.json()).subscribe(data2 => {
            if(data2["success"]) { 

              var msg = this.mensagem_exclusao + 'referente à viagem do dia ' + this.formatDate(this.viagem["dia"]) + " às " + this.viagem["hora"] + ' - ' + this.loc[this.viagem.id_origem] + '->' + this.loc[this.viagem.id_destino]

              var dia = this.formatDate(new Date())
              var hora = (new Date()).toTimeString().split(' ')[0]
              hora = hora.slice(0, hora.length-3) 

              var path3 = 'http://104.248.9.4:3000/api/mensagem/post/mensagem?id_destinatario=' + this.viagem["id_motorista"] + '&msg=' + msg + '&dia=' + dia + '&hora=' + hora
              console.log(path3)

              this.http.get(path3, {headers: new HttpHeaders()}).subscribe(data3 => {
              // this.http.get(path3).map(res => res.json()).subscribe(data3 => {

                if(data3["success"]) { 
                  let alert = this.alertCtrl.create({
                    title: 'Ok!',
                    subTitle: 'Reserva confirmada',
                    buttons: ['Fechar']
                  });
                  alert.present();
                  this.ionViewDidLoad();

                } else {
                  let alert = this.alertCtrl.create({
                    title: 'Ops!',
                    subTitle: 'Tente novamente',
                    buttons: ['Fechar']
                  });
                  alert.present();
                }
              })

            } else {
              let alert = this.alertCtrl.create({
                title: 'Ops!',
                subTitle: 'Tente novamente',
                buttons: ['Fechar']
              });
              alert.present();
            }
          })
          
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Tente novamente',
            buttons: ['Fechar']
          });
          alert.present();
        }
      })
    })
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
      this.mensagem_exclusao = "O usuário " + usu + " excluiu a reserva "
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

  ionViewDidLoad() {
    this.checkSession();
    this.navBar.backButtonClick = () => {
      // you can set a full custom history here if you want 
        let pages = [
        {
        page: MinhasCaronasPage, ResCaronaPage
        }
      ];
      this.navCtrl.setPages(pages);
    }
    //console.log(this.viagem)
    console.log('ionViewDidLoad ViagemPassageiroPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
