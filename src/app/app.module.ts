import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { CalendarModule } from "ion2-calendar";
import { DatePicker } from '@ionic-native/date-picker';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { GradeCadastroEventoPage } from '../pages/grade-cadastro-evento/grade-cadastro-evento';

import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { PerfilPage } from '../pages/perfil/perfil';
import { ConfigPage } from '../pages/configuracoes/configuracoes';
import { UtilidadesPage} from '../pages/utilidades/utilidades';
import { HomePage } from '../pages/home/home';
import { InicialCaronaPage } from '../pages/inicial-carona/inicial-carona';
import { OferecerCaronaPage } from '../pages/oferecer-carona/oferecer-carona';
import { ProcurarCaronaPage } from '../pages/procurar-carona/procurar-carona';
import { InicialGradePage } from '../pages/inicial-grade/inicial-grade';
import { ResCaronaPage } from '../pages/res-carona/res-carona';
import { GradeEventoPage } from '../pages/grade-evento/grade-evento';
import { AgendaPage } from '../pages/agenda/agenda';
import { CaronaPage } from '../pages/carona/carona';
import { MinhasCaronasPage } from '../pages/minhas-caronas/minhas-caronas';
import { ViagemMotoristaPage } from '../pages/viagem-motorista/viagem-motorista';
import { ViagemPassageiroPage } from '../pages/viagem-passageiro/viagem-passageiro';
import { TurmaPage } from '../pages/turma/turma';
import { InicialDivulgacaoPage } from '../pages/inicial-divulgacao/inicial-divulgacao';
import { DivulgarDivulgacaoPage } from '../pages/divulgar-divulgacao/divulgar-divulgacao';
import { FiltrarDivulgacaoPage } from '../pages/filtrar-divulgacao/filtrar-divulgacao';
import { BugReportPage } from '../pages/bug-report/bug-report';
import { CardapioPage } from '../pages/cardapio/cardapio';
import { MensagemPage } from '../pages/mensagem/mensagem';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CadastroPage,
    PerfilPage,
    ConfigPage,
    UtilidadesPage,
    HomePage,
    InicialCaronaPage,
    OferecerCaronaPage,
    ProcurarCaronaPage,
    InicialGradePage,
    ResCaronaPage,
    GradeEventoPage,
    AgendaPage,
    GradeCadastroEventoPage,
    CaronaPage,
    MinhasCaronasPage,
    TurmaPage,
    ViagemMotoristaPage,
    ViagemPassageiroPage,
    InicialDivulgacaoPage,
    DivulgarDivulgacaoPage,
    FiltrarDivulgacaoPage,
    BugReportPage,
    CardapioPage,
    MensagemPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CalendarModule,
    BrowserModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CadastroPage,
    PerfilPage,
    ConfigPage,
    UtilidadesPage,
    HomePage,
    InicialCaronaPage,
    OferecerCaronaPage,
    ProcurarCaronaPage,
    InicialGradePage,
    ResCaronaPage,
    GradeEventoPage,
    AgendaPage,
    GradeCadastroEventoPage,
    CaronaPage,
    MinhasCaronasPage,
    TurmaPage,
    ViagemMotoristaPage,
    ViagemPassageiroPage,
    InicialDivulgacaoPage,
    DivulgarDivulgacaoPage,
    FiltrarDivulgacaoPage,
    BugReportPage,
    CardapioPage,
    MensagemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    DatePicker
  ]
})
export class AppModule {}