import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SQLiteService } from '../../app/services/starter.sqlite-service';

@Component({
  selector: 'page-metrics',
  templateUrl: 'metrics.html'
})
export class MetricsPage {
  chartOptions: any;

  cbDayGraphData: any;
  cbDayGraphLabel: any;
  cdDayGraphData: any;
  cdDayGraphLabel: any;
  zpDayGraphData: any;
  zpDayGraphLabel: any;
  btcxDayGraphData: any;
  btcxDayGraphLabel: any;

  constructor(public navCtrl: NavController, private sqliteService: SQLiteService) {
    this.chartOptions = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };
  }

  ngOnInit() {
    // this.loadMetricDayValues();
  }

  // loadMetricDayValues() {

  //   console.log("Loading SQLite Tables...");

  //   this.sqliteService.cbGetBtcUsdDayRecordsForGraph().then(function (res) {
  //     let dataArr = this.sqliteService.parseDataIntoArrays(res);
  //     // console.log(dataArr);
  //     if (dataArr != undefined) {
  //       this.cbDayGraphData = this.sqliteService.flipData(dataArr[0]);
  //       this.cbDayGraphLabel = this.sqliteService.flipData(dataArr[1]);
  //     }
  //     else {
  //       this.cbDayGraphData = "No Data";
  //     }
  //   })

  //   this.sqliteService.cdGetBtcUsdDayRecordsForGraph().then(function (res) {
  //     let dataArr = this.sqliteService.parseDataIntoArrays(res);
  //     // console.log(dataArr);
  //     if (dataArr != undefined) {
  //       this.cdDayGraphData = this.sqliteService.flipData(dataArr[0]);
  //       this.cdDayGraphLabel = this.sqliteService.flipData(dataArr[1]);
  //     }
  //     else {
  //       this.cdDayGraphData = "No Data";
  //     }
  //   })

  //   this.sqliteService.zpGetBtcInrDayRecordsForGraph().then(function (res) {
  //     let dataArr = this.sqliteService.parseDataIntoArrays(res);
  //     if (dataArr !== undefined) {
  //       this.zpDayGraphData = this.sqliteService.flipData(dataArr[0]);
  //       this.zpDayGraphLabel = this.sqliteService.flipData(dataArr[1]);
  //     }
  //     else {
  //       this.zpDayGraphData = "No Data";
  //     }
  //   })

  //   this.sqliteService.btcxGetXrpInrDayRecordsForGraph().then(function (res) {
  //     let dataArr = this.sqliteService.parseDataIntoArrays(res);
  //     //console.log(dataArr);
  //     if (dataArr != undefined) {
  //       this.btcxDayGraphData = this.sqliteService.flipData(dataArr[0]);
  //       this.btcxDayGraphLabel = this.sqliteService.flipData(dataArr[1]);
  //     }
  //     else {
  //       this.btcxDayGraphData = "No Data";
  //     }
  //   })
  // }  
}
