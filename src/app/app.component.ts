import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { PerfilPage } from '../pages/perfil/perfil';
import { LoginPage } from '../pages/login/login';
import { UtilidadesPage } from '../pages/utilidades/utilidades';
import { BugReportPage } from '../pages/bug-report/bug-report';

import { HomePage } from '../pages/home/home';
import { TurmaPage } from '../pages/turma/turma';
import { InicialCaronaPage } from '../pages/inicial-carona/inicial-carona';
import { InicialGradePage } from '../pages/inicial-grade/inicial-grade';
import { InicialDivulgacaoPage } from '../pages/inicial-divulgacao/inicial-divulgacao';
import { ViagemMotoristaPage } from '../pages/viagem-motorista/viagem-motorista';
import { MensagemPage } from '../pages/mensagem/mensagem';
import { AgendaPage } from '../pages/agenda/agenda';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import endpoints from '../../constants/endpoints'

export interface PageInterface {
  title: string;
  pageName: string;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  nome: string

  pages: PageInterface[] = [
    { title: 'Perfil', pageName: 'PerfilPage', icon: 'person' },
    { title: 'Utilidades', pageName: 'UtilidadesPage', icon: 'albums' },
    { title: 'Bug', pageName: 'BugReportPage', icon: 'bug' },
  ];

  notifications = 1

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, public http: HttpClient) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault(); 
      splashScreen.hide(); 
    });
  }
  
  menuOpened(){
    this.storage.get("aluno_nome").then((usu) => {
      this.nome = usu.toLowerCase()
    })

    this.storage.get("aluno_ra"). then(usu => {
      var path2 = endpoints.api.mensagens.novas + '?id_destinatario=' + usu
      this.http.get(path2, {headers: new HttpHeaders()}).subscribe((data: any) => {
        if(data.success){
          this.notifications = data.data.length
        }
      })
    })
  }

  openPage(page: string){
    if(page == 'PerfilPage'){
      this.nav.push(PerfilPage)
    }else if(page == 'UtilidadesPage'){
      this.nav.push(UtilidadesPage)
    }else if(page == 'BugReportPage'){
      this.nav.push(BugReportPage)
    }else if(page == 'MensagemPage'){
      this.nav.push(MensagemPage)
    }
  }

  clickHome() {
    this.nav.push(HomePage)
  }

  clickGrade() {
    this.nav.push(InicialGradePage)
  }

  clickPerfil() {
    this.nav.push(PerfilPage);
  }

  clickMensagens(){
    this.nav.push(MensagemPage);
  }

  clickBugReport() {
    this.nav.push(BugReportPage);
  }

  clickLogout() {
    this.storage.clear();
    this.nav.setRoot(LoginPage);
    this.nav.push(LoginPage);
  }

  clickUtilidade(){
    this.nav.push(UtilidadesPage);
  }
  clickCaronas() {
    this.nav.push(InicialCaronaPage);
  }

  clickDivulgacao() {
    this.nav.push(InicialDivulgacaoPage);
  }

  clickTurma(){
    this.nav.push(TurmaPage)
  }

}
