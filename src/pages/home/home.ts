import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { CoinbaseService } from '../../app/services/starter.coinbase-service';
import { CoinDeskService } from '../../app/services/starter.coindesk-service';
import { BTCXIndiaService } from '../../app/services/starter.btcxindia-service';
import { ZebpayService } from '../../app/services/starter.zebpay-service';

import { SQLiteService } from '../../app/services/starter.sqlite-service';
import { ToastService } from '../../app/services/starter.toast-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cbBTCUSDBuyPriceValue: any;
  cbLTCUSDBuyPriceValue: any;
  cbETHUSDBuyPriceValue: any;
  cbBTCUSDSellPriceValue: any;
  cbLTCUSDSellPriceValue: any;
  cbETHUSDSellPriceValue: any;
  cdBTCUSDCurrentPriceValue: any;
  cdBTCINRCurrentPriceValue: any;
  cdETHUSDCurrentPriceValue: any;
  XRPUSDCurrentPriceValue: any;
  btcxXRPINRCurrentPriceValue: any;
  zpBTCINRBuyPriceValue: any;
  zpBTCINRSellPriceValue: any;

  cdGetAllBtcUsdRecords: any;
  btcxGetAllXrpInrRecords: any;
  zpGetAllBtcInrRecords: any;

  constructor(public navCtrl: NavController, public coinbaseService: CoinbaseService, private coindeskService: CoinDeskService, private btcxindiaService: BTCXIndiaService, private zebpayService: ZebpayService, private sqliteService: SQLiteService, private toastService: ToastService, private platform: Platform) {
    this.platform = platform;
    this.platform.ready().then((res) => {
      this.toastService.showToast('Hey', null, null);
      //this.toastService.hideToast();
    }, (error) => {
      console.log("ToastError: " + JSON.stringify(error.err));
    })
  }

  ngOnInit() {
    this.loadCoinbaseValues();
    this.loadCoinDeskValues();
    this.loadZebpayValues();
    this.loadbtcxIndiaValues();
  }

  loadCoinbaseValues() {

    console.log(this.coinbaseService.getBTCUSDBuyPrice());
    // .map(res => res.json())
      // .subscribe(data => {
      //   console.log(data);
      //   //Promise.resolve(data);
      // });

    // .then(function (data) {
    //   if (data !== null) {
    //     this.cbBTCUSDBuyPriceValue = this.sqliteService.cleanNumbers(data);
    //     console.log("Log: " + this.cbBTCUSDBuyPriceValue)
    //     this.sqliteService.addBtcRecord(Date.now(), 'USD', this.cbBTCUSDBuyPriceValue, 'CB');
    //   }
    //   else {
    //     console.log("Invalid Credentials. Please try again.");
    //     this.cbBTCUSDBuyPriceValue = "null";
    //   }
    // })

    this.coinbaseService.getLTCUSDBuyPrice().then(function (data) {
      if (data !== null) {
        this.cbLTCUSDBuyPriceValue = this.sqliteService.cleanNumbers(data);
      }
      else {
        console.log("Invalid Credentials. Please try again.");
        this.cbLTCUSDBuyPriceValue = "null";
      }
    })

    this.coinbaseService.getETHUSDBuyPrice().then(function (data) {
      if (data !== null) {
        this.cbETHUSDBuyPriceValue = this.sqliteService.cleanNumbers(data);
      }
      else {
        console.log("Invalid Credentials. Please try again.");
        this.cbETHUSDBuyPriceValue = "null";
      }
    })

    this.coinbaseService.getBTCUSDSellPrice().then(function (data) {
      if (data !== null) {
        this.cbBTCUSDSellPriceValue = this.sqliteService.cleanNumbers(data);
      }
      else {
        console.log("Invalid Credentials. Please try again.");
        this.cbBTCUSDSellPriceValue = "null";
      }
    })

    this.coinbaseService.getLTCUSDSellPrice().then(function (data) {
      if (data !== null) {
        this.cbLTCUSDSellPriceValue = this.sqliteService.cleanNumbers(data);
      }
      else {
        console.log("Invalid Credentials. Please try again.");
        this.cbLTCUSDSellPriceValue = "null";
      }
    })

    this.coinbaseService.getETHUSDSellPrice().then(function (data) {
      if (data !== null) {
        this.cbETHUSDSellPriceValue = this.sqliteService.cleanNumbers(data);
      }
      else {
        console.log("Invalid Credentials. Please try again.");
        this.cbETHUSDSellPriceValue = "null";
      }
    })

  }

  loadCoinDeskValues() {

    this.coindeskService.getBTCUSDCurrentPrice().then(function (data) {
      if (data !== null) {
        this.cdBTCUSDCurrentPriceValue = this.sqliteService.cleanNumbers(data.bpi.USD.rate);
        this.sqliteService.addBtcRecord(Date.now(), 'USD', this.cdBTCUSDCurrentPriceValue, 'CD')
      }
      else {
        console.log("Invalid Credentials. Please try again.");
        this.cdBTCUSDCurrentPriceValue = "null";
      }
      this.sqliteService.cdGetAllBtcUsdRecords().then(function (res) {
        // console.log(res);
        this.cdGetAllBtcUsdRecords = res;
      })
    })

    this.coindeskService.getBTCINRCurrentPrice().then(function (data) {
      if (data !== null) {
        this.cdBTCINRCurrentPriceValue = this.sqliteService.cleanNumbers(data.bpi.INR.rate);
      }
      else {
        console.log("Invalid Credentials. Please try again.");
        this.cdBTCINRCurrentPriceValue = "null";
      }
    })

    this.coindeskService.getETHUSDCurrentPrice().then(function (data) {
      if (data !== null) {
        this.cdETHUSDCurrentPriceValue = this.sqliteService.cleanNumbers(data.bpi.USD.rate_float);
      }
      else {
        console.log("Invalid Credentials. Please try again.");
        this.cdETHUSDCurrentPriceValue = "null";
      }
    })

    // this.coindeskService.getXRPUSDCurrentPrice().then(function (data) {
    //   if (data !== null) {
    //     this.XRPUSDCurrentPriceValue = data.bpi.INR.rate;
    //   }
    //   else {
    //     console.log("Invalid Credentials. Please try again.");
    //     this.XRPUSDCurrentPriceValue = "null";
    //   }
    // })

  }

  loadbtcxIndiaValues() {
    this.btcxindiaService.getXRPINRCurrentPrice().then(function (data) {
      if (data !== null) {
        this.btcxXRPINRCurrentPriceValue = this.sqliteService.cleanNumbers(data.avg);
        this.sqliteService.addXrpRecord(Date.now(), 'XRP', this.btcxXRPINRCurrentPriceValue, 'BTCX');
      }
      else {
        console.log("Invalid Credentials. Please try again.");
        this.btcxXRPINRCurrentPriceValue = "null";
      }
      this.sqliteService.btcxGetAllXrpInrRecords().then(function (res) {
        this.btcxGetAllXrpInrRecords = res;
      })
    })
  }

  loadZebpayValues() {
    this.zebpayService.getBTCINRCurrentPrice().then(function (data) {
      if (data !== null) {
        this.zpBTCINRBuyPriceValue = this.sqliteService.cleanNumbers(data.buy);
        this.zpBTCINRSellPriceValue = this.sqliteService.cleanNumbers(data.sell);
        this.sqliteService.addBtcRecord(Date.now(), 'INR', this.zpBTCINRBuyPriceValue, 'ZP');
        //Looks like we need a time delay here
        //this.sqliteService.addBtcRecord(Date.now(), 'INR', this.zpBTCINRSellPriceValue, 'ZP');
      }
      else {
        console.log("Invalid Credentials. Please try again.");
        this.zpBTCINRBuyPriceValue = "null";
        this.zpBTCINRSellPriceValue = "null";
      }
      this.sqliteService.zpGetAllBtcInrRecords().then(function (res) {
        this.zpGetAllBtcInrRecords = res;
      })
    })
  }
}
