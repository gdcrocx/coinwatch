import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SQLiteService } from '../../app/services/starter.sqlite-service';

@Component({
  selector: 'page-metrics-detail',
  templateUrl: 'metrics-detail.html'
})

export class MetricsDetailPage {
  chartOptions: any;

  cdGetAllBtcUsdRecords: any;
  btcxGetAllXrpInrRecords: any;
  zpGetAllXrpInrRecords: any;
  cbGetLastTwoBtcUsdRecords: any;
  cdGetLastTwoBtcUsdRecords: any;
  btcxGetLastTwoXrpInrRecords: any;
  zpGetLastTwoXrpInrRecords: any;

  cbGraphData: any;
  cbGraphLabel: any;
  cdGraphData: any;
  cdGraphLabel: any;
  combinedBtcUsdGraphData: any;
  combinedBtcUsdGraphLabel: any;
  combinedBtcUsdGraphSeries: any;

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
    // this.loadMetricDataValues();
    // this.combinedBtcUsdRecordsForGraph();
  }

  // loadMetricDataValues() {

  //   console.log("Loading SQLite Tables...");

  //   // this.sqliteService.cbGetAllBtcUsdRecords().then(function (res) {
  //   //   cbGetAllBtcUsdRecords = res;
  //   // })

  //   // this.sqliteService.cdGetAllBtcUsdRecords().then(function (res) {
  //   //   this.cdGetAllBtcUsdRecords = res;
  //   // })

  //   // this.sqliteService.btcxGetAllXrpInrRecords().then(function (res) {
  //   //   this.btcxGetAllXrpInrRecords = res;
  //   // })

  //   // this.sqliteService.zpGetAllBtcInrRecords().then(function (res) {
  //   //   this.zpGetAllXrpInrRecords = res;
  //   // })

  //   this.sqliteService.cbGetLastTwoBtcUsdRecords().then(function (res) {
  //     if (res) {
  //       if (res.length == 2) {
  //         let newValue = res[0].current_price;
  //         let oldValue = res[1].current_price;
  //         this.cbGetLastTwoBtcUsdRecords = this.sqliteService.roundTo((newValue / oldValue), 4);
  //       }
  //       else if (res.length == 1) {
  //         this.cbGetLastTwoBtcUsdRecords = this.sqliteService.roundTo(res[0].current_price, 4);
  //       }
  //     }
  //     else {
  //       this.cbGetLastTwoBtcUsdRecords = "No Data";
  //     }
  //   })

  //   this.sqliteService.cdGetLastTwoBtcUsdRecords().then(function (res) {
  //     if (res) {
  //       if (res.length == 2) {
  //         let newValue = res[0].current_price;
  //         let oldValue = res[1].current_price;
  //         this.cdGetLastTwoBtcUsdRecords = this.sqliteService.roundTo((newValue / oldValue), 4);
  //       }
  //       else if (res.length == 1) {
  //         this.cdGetLastTwoBtcUsdRecords = this.sqliteService.roundTo(res[0].current_price, 4);
  //       }
  //     }
  //     else {
  //       this.cdGetLastTwoBtcUsdRecords = "No Data";
  //     }
  //   })

  //   this.sqliteService.btcxGetLastTwoXrpInrRecords().then(function (res) {
  //     if (res) {
  //       if (res.length == 2) {
  //         let newValue = res[0].current_price;
  //         let oldValue = res[1].current_price;
  //         this.btcxGetLastTwoXrpInrRecords = this.sqliteService.roundTo((newValue / oldValue), 4);
  //       }
  //       else if (res.length == 1) {
  //         this.btcxGetLastTwoXrpInrRecords = this.sqliteService.roundTo(res[0].current_price, 4);
  //       }
  //     }
  //     else {
  //       this.btcxGetLastTwoXrpInrRecords = "No Data";
  //     }
  //   })

  //   this.sqliteService.zpGetLastTwoXrpInrRecords().then(function (res) {
  //     if (res) {
  //       if (res.length == 2) {
  //         let newValue = res[0].current_price;
  //         let oldValue = res[1].current_price;
  //         this.zpGetLastTwoXrpInrRecords = this.sqliteService.roundTo((newValue / oldValue), 4);
  //       }
  //       else if (res.length == 1) {
  //         this.zpGetLastTwoXrpInrRecords = this.sqliteService.roundTo(res[0].current_price, 4);
  //       }
  //     }
  //     else {
  //       this.zpGetLastTwoXrpInrRecords = "No Data";
  //     }

  //   })

  //   this.sqliteService.cbGetBtcUsdRecordsForGraph().then(function (res) {
  //     let dataArr = this.sqliteService.parseDataIntoArrays(res);
  //     // console.log(dataArr);
  //     if (dataArr != undefined) {
  //       this.cbGraphData = this.sqliteService.flipData(dataArr[0]);
  //       this.cbGraphLabel = this.sqliteService.flipData(dataArr[1]);
  //     }
  //     else {
  //       this.cbGraphData = "No Data";
  //     }
  //   })

  //   this.sqliteService.cdGetBtcUsdRecordsForGraph().then(function (res) {
  //     let dataArr = this.sqliteService.parseDataIntoArrays(res);
  //     // console.log(dataArr);
  //     if (dataArr != undefined) {
  //       this.cdGraphData = this.sqliteService.flipData(dataArr[0]);
  //       this.cdGraphLabel = this.sqliteService.flipData(dataArr[1]);
  //     }
  //     else {
  //       this.cdGraphData = "No Data";
  //     }
  //   })

  //   this.sqliteService.zpGetBtcInrRecordsForGraph().then(function (res) {
  //     let dataArr = this.sqliteService.parseDataIntoArrays(res);
  //     if (dataArr !== undefined) {
  //       this.zpGraphData = this.sqliteService.flipData(dataArr[0]);
  //       this.zpGraphLabel = this.sqliteService.flipData(dataArr[1]);
  //     }
  //     else {
  //       this.zpGraphData = "No Data";
  //     }
  //   })

  //   this.sqliteService.btcxGetXrpInrRecordsForGraph().then(function (res) {
  //     let dataArr = this.sqliteService.parseDataIntoArrays(res);
  //     //console.log(dataArr);
  //     if (dataArr != undefined) {
  //       this.btcxGraphData = this.sqliteService.flipData(dataArr[0]);
  //       this.btcxGraphLabel = this.sqliteService.flipData(dataArr[1]);
  //     }
  //     else {
  //       this.btcxGraphData = "No Data";
  //     }
  //   })

  // }

  // combinedBtcUsdRecordsForGraph() {

  //   this.cdGraphData = [];
  //   this.cbGraphData = [];
  //   this.cdGraphLabel = [];
  //   this.combinedBtcUsdGraphData = []
  //   this.combinedBtcUsdGraphLabel = []

  //   this.cbGraphData = this.sqliteService.cbGetBtcUsdRecordsForGraph().then(function (res) {
  //     let dataArr = this.sqliteService.parseDataIntoArrays(res);
  //     // console.log(dataArr);
  //     if (dataArr != null) {
  //       return this.sqliteService.flipData(dataArr[0]);
  //     }
  //   });

  //   this.cdGraphData = this.sqliteService.cdGetBtcUsdRecordsForGraph().then(function (res) {
  //     let dataArr = this.sqliteService.parseDataIntoArrays(res);
  //     // console.log(dataArr);
  //     if (dataArr != null) {
  //       return this.sqliteService.flipData(dataArr[0]);
  //     }
  //   });

  //   this.sqliteService.cdGetBtcUsdRecordsForGraph().then(function (res) {
  //     let dataArr = this.sqliteService.parseDataIntoArrays(res);
  //     // console.log(dataArr);
  //     if (dataArr != null) {
  //       this.cdGraphLabel = this.sqliteService.flipData(dataArr[1]);
  //     }
  //   });

  //   this.cbGraphData.then(function (res) {
  //     if (res !== undefined) {
  //       this.combinedBtcUsdGraphData.push(res);
  //     }
  //   });

  //   this.cdGraphData.then(function (res) {
  //     if (res !== undefined) {
  //       this.combinedBtcUsdGraphData.push(res);
  //     }
  //   });

  //   // cdGraphLabel.then(function (res) {
  //   //   combinedBtcUsdGraphLabel.push(res);
  //   // });
  //   // console.log(this.cbGraphData);
  //   // console.log(this.cdGraphData);

  //   this.combinedBtcUsdGraphLabel = []
  //   if (this.combinedBtcUsdGraphData.length > 0) {
  //     this.combinedBtcUsdGraphData = this.combinedBtcUsdGraphData;
  //     this.combinedBtcUsdGraphLabel = this.cdGraphLabel; //this.combinedBtcUsdGraphLabel;
  //     this.combinedBtcUsdGraphSeries = ["Coinbase", "CoinDesk"];
  //   }
  //   else {
  //     this.combinedBtcUsdGraphData = "No Data";
  //   }
  // }
}