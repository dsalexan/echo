import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams } from 'ionic-angular';

import { PerfilPage } from '../../pages/perfil/perfil';
import { LoginPage } from '../../pages/login/login';
import { UtilidadesPage } from '../../pages/utilidades/utilidades';
import { BugReportPage } from '../../pages/bug-report/bug-report';

import { HomePage } from '../../pages/home/home';
import { TurmaPage } from '../../pages/turma/turma';
import { InicialCaronaPage } from '../../pages/inicial-carona/inicial-carona';
import { InicialGradePage } from '../../pages/inicial-grade/inicial-grade';
import { InicialDivulgacaoPage } from '../../pages/inicial-divulgacao/inicial-divulgacao';
import { ViagemMotoristaPage } from '../../pages/viagem-motorista/viagem-motorista';
import { MensagemPage } from '../../pages/mensagem/mensagem';
import { AgendaPage } from '../../pages/agenda/agenda';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  
  // Basic root for our content view
  rootPage = 'HomePage';
  
  @ViewChild(Nav) nav: Nav;

  
  pages: PageInterface[] = [
    { title: 'Perfil', pageName: 'PerfilPage', tabComponent: 'Tab1Page', index: 0, icon: 'home' },
    { title: 'Utilidades', pageName: 'UtilidadesPage', tabComponent: 'Tab2Page', index: 1, icon: 'contacts' },
    { title: 'Bug', pageName: 'BugReportPage', icon: 'shuffle' },
    { title: 'Logout', pageName: 'BugReportPage', icon: 'shuffle' },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  openPage(page: PageInterface) {
    let params = {};
 
    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }
 
    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
  }
 
  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
 
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }

}
