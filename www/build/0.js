webpackJsonp([0],{

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilidadesPageModule", function() { return UtilidadesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utilidades__ = __webpack_require__(284);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UtilidadesPageModule = /** @class */ (function () {
    function UtilidadesPageModule() {
    }
    UtilidadesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__utilidades__["a" /* UtilidadesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__utilidades__["a" /* UtilidadesPage */]),
            ],
        })
    ], UtilidadesPageModule);
    return UtilidadesPageModule;
}());

//# sourceMappingURL=utilidades.module.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilidadesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
// --OBS--
// INSTALAÇÃO NECESSÁRIA:
// $ ionic cordova plugin add cordova-plugin-inappbrowser
// $ npm install --save @ionic-native/in-app-browser
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var biblioteca = 'http://www.biblioteca.unifesp.br/biblioteca/index.php';
var saldoRU = 'https://phpu.unifesp.br/ru_consulta/index.php';
var cardapio = 'www.unifesp.br/campus/sjc/servicosnae/restaurante/1647-cardapio-semanal-do-ru.html';
var email = 'https://www.email.unifesp.br';
var atestado = 'https://intranet.unifesp.br/restrict/index3.php';
var historico = 'https://intranet.unifesp.br/restrict/index3.php';
var UtilidadesPage = /** @class */ (function () {
    function UtilidadesPage() {
    }
    UtilidadesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-utilidades',template:/*ion-inline-start:"C:\Users\acamp\Desktop\Unifesp\Eng. de Software\app\echo\src\pages\utilidades\utilidades.html"*/'<!--\n\n  Generated template for the UtilidadesPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title center>{{ \'Utilidaes\' }}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <!--\n\n  <ion-buttons (click) = "clickBilioteca()" class = "biblioteca">BIBLIOTECA</ion-buttons>\n\n  <ion-buttons (click) = "clickSaldo()" class ="saldo">CONSULTAR SALDO RU</ion-buttons>\n\n  <ion-buttons (click) = "clickCardapio()" class = "caradpio">CARDÁPIO RU</ion-buttons>\n\n  <ion-buttons (click) = "clickEmail()" class = "email">EMAIL UNIFESP</ion-buttons>\n\n  <ion-buttons (click) = "clickAtestado()" class = "atestado">ATESTADO DE MATRICULA</ion-buttons>\n\n  <ion-buttons (click) = "clickHistorico()" class = "historico">HISTORICO ESCOLAR</ion-buttons>\n\n  -->\n\n  \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\acamp\Desktop\Unifesp\Eng. de Software\app\echo\src\pages\utilidades\utilidades.html"*/,
        })
    ], UtilidadesPage);
    return UtilidadesPage;
}());

// https://ionicframework.com/docs/native/in-app-browser/
//# sourceMappingURL=utilidades.js.map

/***/ })

});
//# sourceMappingURL=0.js.map