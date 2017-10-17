import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SQLiteService } from '../../app/services/starter.sqlite-service';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})

export class HistoryPage {

  cbGetDayHighBtcUsdRecords: any;
  cbGetDayLowBtcUsdRecords: any;
  cdGetDayHighBtcUsdRecords: any;
  cdGetDayLowBtcUsdRecords: any;
  btcxGetDayHighXrpInrRecords: any;
  btcxGetDayLowXrpInrRecords: any;
  zpGetDayHighXrpInrRecords: any;
  zpGetDayLowXrpInrRecords: any;

  constructor(public navCtrl: NavController, private sqliteService: SQLiteService) {

  }

  ngOnInit() {
    // this.loadHistoryValues();
  }

  // loadHistoryValues() {

  //   console.log("Loading SQLite Tables...");

  //   this.sqliteService.cbGetDayHighBtcUsdRecords().then(function (res) {
  //     this.cbGetDayHighBtcUsdRecords = this.sqliteService.roundTo(res[0]["max(current_price)"], 4);
  //   })

  //   this.sqliteService.cbGetDayLowBtcUsdRecords().then(function (res) {
  //     this.cbGetDayLowBtcUsdRecords = this.sqliteService.roundTo(res[0]["min(current_price)"], 4);
  //   })

  //   this.sqliteService.cdGetDayHighBtcUsdRecords().then(function (res) {
  //     this.cdGetDayHighBtcUsdRecords = this.sqliteService.roundTo(res[0]["max(current_price)"], 4);
  //   })

  //   this.sqliteService.cdGetDayLowBtcUsdRecords().then(function (res) {
  //     this.cdGetDayLowBtcUsdRecords = this.sqliteService.roundTo(res[0]["min(current_price)"], 4);
  //   })

  //   this.sqliteService.btcxGetDayHighXrpInrRecords().then(function (res) {
  //     this.btcxGetDayHighXrpInrRecords = this.sqliteService.roundTo(res[0]["max(current_price)"], 4);
  //   })

  //   this.sqliteService.btcxGetDayLowXrpInrRecords().then(function (res) {
  //     this.btcxGetDayLowXrpInrRecords = this.sqliteService.roundTo(res[0]["min(current_price)"], 4);
  //   })

  //   this.sqliteService.zpGetDayHighXrpInrRecords().then(function (res) {
  //     this.zpGetDayHighXrpInrRecords = this.sqliteService.roundTo(res[0]["max(current_price)"], 4);
  //   })

  //   this.sqliteService.zpGetDayLowXrpInrRecords().then(function (res) {
  //     this.zpGetDayLowXrpInrRecords = this.sqliteService.roundTo(res[0]["min(current_price)"], 4);
  //   })
  // }
}
