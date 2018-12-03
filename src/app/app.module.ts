import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { File } from '@ionic-native/file';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { CalendarModule } from "ion2-calendar";
import { DatePicker } from '@ionic-native/date-picker';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { GradeCadastroEventoPageModule } from '../pages/grade-cadastro-evento/grade-cadastro-evento.module';

import { LoginPageModule } from '../pages/login/login.module';
import { CadastroPageModule } from '../pages/cadastro/cadastro.module';
import { PerfilPageModule } from '../pages/perfil/perfil.module';
import { UtilidadesPageModule } from '../pages/utilidades/utilidades.module';
import { HomePageModule } from '../pages/home/home.module';
import { InicialCaronaPageModule } from '../pages/inicial-carona/inicial-carona.module';
import { OferecerCaronaPageModule } from '../pages/oferecer-carona/oferecer-carona.module';
import { ProcurarCaronaPageModule } from '../pages/procurar-carona/procurar-carona.module';
import { InicialGradePageModule } from '../pages/inicial-grade/inicial-grade.module';
import { ResCaronaPageModule } from '../pages/res-carona/res-carona.module';
import { GradeEventoPageModule } from '../pages/grade-evento/grade-evento.module';
import { AgendaPageModule } from '../pages/agenda/agenda.module';
import { CaronaPageModule } from '../pages/carona/carona.module';
import { MinhasCaronasPageModule } from '../pages/minhas-caronas/minhas-caronas.module';
import { ViagemMotoristaPageModule } from '../pages/viagem-motorista/viagem-motorista.module';
import { ViagemPassageiroPageModule } from '../pages/viagem-passageiro/viagem-passageiro.module';
import { TurmaPageModule } from '../pages/turma/turma.module';
import { InicialDivulgacaoPageModule } from '../pages/inicial-divulgacao/inicial-divulgacao.module';
import { DivulgarDivulgacaoPageModule } from '../pages/divulgar-divulgacao/divulgar-divulgacao.module';
import { FiltrarDivulgacaoPageModule } from '../pages/filtrar-divulgacao/filtrar-divulgacao.module';
import { BugReportPageModule } from '../pages/bug-report/bug-report.module';
import { CardapioPageModule } from '../pages/cardapio/cardapio.module';
import { MensagemPageModule } from '../pages/mensagem/mensagem.module';
import { MinhasDivulgacaoPageModule } from '../pages/minhas-divulgacao/minhas-divulgacao.module';
import { ResultadoDivulgacaoPageModule } from '../pages/resultado-divulgacao/resultado-divulgacao.module';
import { VendedorDivulgacaoPageModule } from '../pages/vendedor-divulgacao/vendedor-divulgacao.module';
import { CompradorDivulgacaoPageModule } from '../pages/comprador-divulgacao/comprador-divulgacao.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CalendarModule,
    BrowserModule,
    LoginPageModule,
    CadastroPageModule,
    PerfilPageModule,
    UtilidadesPageModule,
    HomePageModule,
    InicialCaronaPageModule,
    OferecerCaronaPageModule,
    ProcurarCaronaPageModule,
    InicialGradePageModule,
    ResCaronaPageModule,
    GradeEventoPageModule,
    AgendaPageModule,
    GradeCadastroEventoPageModule,
    CaronaPageModule,
    MinhasCaronasPageModule,
    TurmaPageModule,
    ViagemMotoristaPageModule,
    ViagemPassageiroPageModule,
    InicialDivulgacaoPageModule,
    DivulgarDivulgacaoPageModule,
    FiltrarDivulgacaoPageModule,
    BugReportPageModule,
    CardapioPageModule,
    MensagemPageModule,
    MinhasDivulgacaoPageModule,
    ResultadoDivulgacaoPageModule,
    VendedorDivulgacaoPageModule,
    CompradorDivulgacaoPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    File,
    SplashScreen,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    DatePicker
  ]
})
export class AppModule {}