import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SQLiteService {
    db: any;
    query: String;

    constructor(private sqlite: SQLite, public platform: Platform) {
        this.platform.ready().then((res) => {
            console.log("Device Ready...");
            this.initDB();
        })
    }

    initDB() {
        this.sqlite.create({
            name: 'catchacoinDb.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            // console.log("Created Object: " + JSON.stringify(db));
            this.db = db;
            // console.log("Local DB Object: " + JSON.stringify(this.db));        
        }).catch(e => console.log(e));

        // if (window.cordova) {
        //     this.db = this.db.openDB({ name: "catchacoinDb.db" }); //device
        //     console.log("DB Location: Android");
        // }
        // else {
        //     this.db = window.openDB("catchacoinDb.db", '1', 'catchacoinDb', 1024 * 1024 * 100); // browser
        //     console.log("DB Location: Browser");
        // }

        this.query = "CREATE TABLE IF NOT EXISTS tblBTC (epoch_timestamp TIMESTAMP primary key, date_time TEXT, currency_code TEXT, current_price TEXT, exchange_code TEXT);";
        this.runQuery(this.query, [], function (res) {
            // console.log("BTC Table created ");
        }, function (error) {
            console.log("DB Error: " + error.err);
        });

        this.query = "CREATE TABLE IF NOT EXISTS tblLTC (epoch_timestamp TIMESTAMP primary key, date_time TEXT, currency_code TEXT, current_price TEXT, exchange_code TEXT);";
        this.runQuery(this.query, [], function (res) {
            // console.log("LTC Table created ");
        }, function (error) {
            console.log("DB Error: " + error.err);
        });

        this.query = "CREATE TABLE IF NOT EXISTS tblETH (epoch_timestamp TIMESTAMP primary key, date_time TEXT, currency_code TEXT, current_price TEXT, exchange_code TEXT);";
        this.runQuery(this.query, [], function (res) {
            // console.log("ETH Table created ");
        }, function (error) {
            console.log("DB Error: " + error.err);
        });

        this.query = "CREATE TABLE IF NOT EXISTS tblXRP (epoch_timestamp TIMESTAMP primary key, date_time TEXT, currency_code TEXT, current_price TEXT, exchange_code TEXT);";
        this.runQuery(this.query, [], function (res) {
            // console.log("XRP Table created ");
        }, function (error) {
            console.log("DB Error: " + error.err);
        });
    }

    runQuery(query, dataParams, successCb, errorCb) {
        this.platform.ready().then((res) => {
            // console.log("Run Query - " + JSON.stringify(this.db));
            if (this.db != undefined) {
                this.db.executeSql(this.db, query, dataParams).then(function (res) {
                    successCb(res);
                    // console.log("SQL Query successful");
                }, function (error) {
                    errorCb(error);
                    console.log("SQL Query failure" + error.err);
                });
            }
            else {
                // console.log("Run Query - " + query + " - SQL DB unreachable or does not exist.")
            }
        })
    }

    todayAsDDMMYYYY() {
        var now = new Date();
        var now_utc = ("0" + now.getUTCDate()).slice(-2) + "-" + ("0" + (now.getUTCMonth() + 1)).slice(-2) + "-" + now.getUTCFullYear();
        return now_utc;
    }

    returnObjFromSqlResultSet(sqlResultSet) {
        var objArr = [];
        if (sqlResultSet.rows.length > 0) {
            var objKeys = Object.keys(sqlResultSet.rows.item(0));
            for (var i = 0; i < sqlResultSet.rows.length; i++) {
                var jsonObj = {}; // Object
                for (var j = 0; j < objKeys.length; j++) {
                    jsonObj[objKeys[j]] = sqlResultSet.rows.item(i)[objKeys[j]];
                }
                objArr.push(jsonObj);
            }
            return objArr;
        }
    }

    cleanNumbers(num) {
        if (typeof num == "string" && num != null) {
            num = num.replace(",", "");
            num = parseFloat(num);
        }
        return num;
    }

    roundTo(n, digits) {
        if (n !== undefined) {
            if (digits === undefined) {
                digits = 0;
            }
            if (n == null) {
                return n;
            }
            var multiplicator = Math.pow(10, digits);
            n = parseFloat((n * multiplicator).toFixed(11));
            var test = (Math.round(n) / multiplicator);
            return +(test.toFixed(digits));
        }
    }

    parseDataIntoArrays(res) {
        if (res != null) {
            var keyIndex = [];
            for (let name in res[0]) {
                keyIndex.push(name);
            }
            var dataArrays = [];
            for (var index = 0; index < keyIndex.length; index++) {
                var Arr = []
                for (var i = 0; i < res.length; i++) {
                    for (let val in res[i]) {
                        if (val == keyIndex[index]) {
                            Arr.push(res[i][val]);
                        }
                    }
                }
                dataArrays.push(Arr);
            }
            return dataArrays
        }
    }

    flipData(arr) {
        arr = arr.reverse();
        return arr;
    }

    threadDataArrays(arr1, arr2) {
        console.log("Array1");
        console.log(arr1);
        console.log("Array2");
        console.log(arr2);
        let arrayOfArrays = [];
        arrayOfArrays.push(arr1);
        arrayOfArrays.push(arr2);
        console.log(arrayOfArrays);
        return arrayOfArrays;
    }

    //Add Cryptocurrency Records
    addBtcRecord(epoch_timestamp, currency_code, current_price, exchange_code) {
        this.query = "INSERT INTO tblBTC (epoch_timestamp, date_time, currency_code, current_price, exchange_code) VALUES (?,'" + this.todayAsDDMMYYYY() + "',?,?,?);";
        this.runQuery(this.query, [epoch_timestamp, currency_code, this.cleanNumbers(current_price), exchange_code], function (response) {
            //Success Callback
            //console.log(response);
            return response;
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    addLtcRecord(epoch_timestamp, currency_code, current_price, exchange_code) {
        this.query = "INSERT INTO tblLTC (epoch_timestamp, date_time, currency_code, current_price, exchange_code) VALUES (?,'" + this.todayAsDDMMYYYY() + "',?,?,?);";
        this.runQuery(this.query, [epoch_timestamp, currency_code, this.cleanNumbers(current_price), exchange_code], function (response) {
            //Success Callback
            //console.log(response);
            return response;
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    addEthRecord(epoch_timestamp, currency_code, current_price, exchange_code) {
        this.query = "INSERT INTO tblETH (epoch_timestamp, date_time, currency_code, current_price, exchange_code) VALUES (?,'" + this.todayAsDDMMYYYY() + "',?,?,?);";
        this.runQuery(this.query, [epoch_timestamp, currency_code, this.cleanNumbers(current_price), exchange_code], function (response) {
            //Success Callback
            //console.log(response);
            return response;
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    addXrpRecord(epoch_timestamp, currency_code, current_price, exchange_code) {
        this.query = "INSERT INTO tblXRP (epoch_timestamp, date_time, currency_code, current_price, exchange_code) VALUES (?,'" + this.todayAsDDMMYYYY() + "',?,?,?);";
        this.runQuery(this.query, [epoch_timestamp, currency_code, this.cleanNumbers(current_price), exchange_code], function (response) {
            //Success Callback
            //console.log(response);
            return response;
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    //Get All BTC Records By USD and Exchange Codes
    cbGetAllBtcUsdRecords() {
        this.query = "SELECT DISTINCT current_price, date_time, currency_code, exchange_code FROM tblBTC WHERE currency_code = 'USD' AND exchange_code = 'CB' ORDER BY epoch_timestamp DESC LIMIT 5;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            // console.log(response);                  
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    cdGetAllBtcUsdRecords() {
        this.query = "SELECT DISTINCT current_price, date_time, exchange_code FROM tblBTC WHERE currency_code = 'USD' AND exchange_code = 'CD' ORDER BY epoch_timestamp DESC LIMIT 5;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    //Get All LTC Records By USD and Exchange Codes
    getAllLtcUsdRecords() {
        this.query = "SELECT DISTINCT current_price, date_time, currency_code, exchange_code FROM tblLTC WHERE currency_code = 'USD' ORDER BY epoch_timestamp DESC LIMIT 5;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    //Get All ETH Records By USD and Exchange Codes
    getAllEthUsdRecords() {
        this.query = "SELECT DISTINCT current_price, date_time, currency_code, exchange_code FROM tblETH WHERE currency_code = 'USD' ORDER BY epoch_timestamp DESC LIMIT 5;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    //Get All XRP Records By USD and Exchange Codes
    btcxGetAllXrpInrRecords() {
        this.query = "SELECT DISTINCT current_price, date_time, currency_code, exchange_code FROM tblXRP WHERE currency_code = 'INR' AND exchange_code = 'BTCX' ORDER BY epoch_timestamp DESC LIMIT 5;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    zpGetAllBtcInrRecords() {
        this.query = "SELECT DISTINCT current_price, date_time, currency_code, exchange_code FROM tblBTC WHERE currency_code = 'INR' AND exchange_code = 'ZP' ORDER BY epoch_timestamp DESC LIMIT 5;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    //Delete Cryptocurrency Records By Timestamp and USD
    deleteBtcUsdRecord(epoch_timestamp) {
        this.query = "DELETE FROM tblBTC WHERE currency_code = 'USD' AND epoch_timestamp = ?;";
        this.runQuery(this.query, [epoch_timestamp], function (response) {
            //Success Callback
            console.log(response);
            return response;
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    deleteLtcUsdRecord(epoch_timestamp) {
        this.query = "DELETE FROM tblLTC WHERE currency_code = 'USD' AND epoch_timestamp = ?;";
        this.runQuery(this.query, [epoch_timestamp], function (response) {
            //Success Callback
            console.log(response);
            return response;
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    deleteEthUsdRecord(epoch_timestamp) {
        this.query = "DELETE FROM tblETH WHERE currency_code = 'USD' AND epoch_timestamp = ?;";
        this.runQuery(this.query, [epoch_timestamp], function (response) {
            //Success Callback
            console.log(response);
            return response;
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    deleteXrpUsdRecord(epoch_timestamp) {
        this.query = "DELETE FROM tblXRP WHERE currency_code = 'USD' AND epoch_timestamp = ?;";
        this.runQuery(this.query, [epoch_timestamp], function (response) {
            //Success Callback
            console.log(response);
            return response;
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    //Get High and Low for the day By USD and Datetime
    cbGetDayHighBtcUsdRecords() {
        this.query = "SELECT max(current_price) FROM tblBTC WHERE currency_code = 'USD' AND exchange_code = 'CB' AND date_time = '" + this.todayAsDDMMYYYY() + "';"
        this.runQuery(this.query, [], function (response) {
            //Success Callback          
            // console.log(response);
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    cbGetDayLowBtcUsdRecords() {
        this.query = "SELECT min(current_price) FROM tblBTC WHERE currency_code = 'USD' AND exchange_code = 'CB' AND date_time = '" + this.todayAsDDMMYYYY() + "';"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    cdGetDayHighBtcUsdRecords() {
        this.query = "SELECT max(current_price) FROM tblBTC WHERE currency_code = 'USD' AND exchange_code = 'CD' AND date_time = '" + this.todayAsDDMMYYYY() + "';"
        this.runQuery(this.query, [], function (response) {
            //Success Callback          
            // console.log(response);
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    cdGetDayLowBtcUsdRecords() {
        this.query = "SELECT min(current_price) FROM tblBTC WHERE currency_code = 'USD' AND exchange_code = 'CD' AND date_time = '" + this.todayAsDDMMYYYY() + "';"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    btcxGetDayHighXrpInrRecords() {
        this.query = "SELECT max(current_price) FROM tblXRP WHERE currency_code = 'INR' AND exchange_code = 'BTCX' AND date_time = '" + this.todayAsDDMMYYYY() + "';"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    btcxGetDayLowXrpInrRecords() {
        this.query = "SELECT min(current_price) FROM tblXRP WHERE currency_code = 'INR' AND exchange_code = 'BTCX' AND date_time = '" + this.todayAsDDMMYYYY() + "';"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    zpGetDayHighXrpInrRecords() {
        this.query = "SELECT max(current_price) FROM tblXRP WHERE currency_code = 'INR' AND exchange_code = 'ZP' AND date_time = '" + this.todayAsDDMMYYYY() + "';"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    zpGetDayLowXrpInrRecords() {
        this.query = "SELECT min(current_price) FROM tblXRP WHERE currency_code = 'INR' AND exchange_code = 'ZP' AND date_time = '" + this.todayAsDDMMYYYY() + "';"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    //Get Last Two Price Records By USD and Timestamp
    cbGetLastTwoBtcUsdRecords() {
        this.query = "SELECT DISTINCT current_price FROM tblBTC WHERE currency_code = 'USD' AND exchange_code = 'CB' ORDER BY epoch_timestamp DESC LIMIT 2;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    cdGetLastTwoBtcUsdRecords() {
        this.query = "SELECT DISTINCT current_price FROM tblBTC WHERE currency_code = 'USD' AND exchange_code = 'CD' ORDER BY epoch_timestamp DESC LIMIT 2;"
        this.runQuery(this.query, [], function (response) {
            // console.log(response);
            //Success Callback
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    btcxGetLastTwoXrpInrRecords() {
        this.query = "SELECT DISTINCT current_price FROM tblXRP WHERE currency_code = 'INR' AND exchange_code = 'BTCX' ORDER BY epoch_timestamp DESC LIMIT 2;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    zpGetLastTwoXrpInrRecords() {
        this.query = "SELECT DISTINCT current_price FROM tblXRP WHERE currency_code = 'INR' AND exchange_code = 'ZP' ORDER BY epoch_timestamp DESC LIMIT 2;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    //Get Last 5 Distinct Current Price BTC Records By USD and Exchange Codes for Graph 
    cbGetBtcUsdRecordsForGraph() {
        this.query = "SELECT DISTINCT current_price, date_time FROM tblBTC WHERE currency_code = 'USD' AND exchange_code = 'CB' ORDER BY epoch_timestamp DESC LIMIT 5;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            // console.log(response);                  
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    cdGetBtcUsdRecordsForGraph() {
        this.query = "SELECT DISTINCT current_price, date_time FROM tblBTC WHERE currency_code = 'USD' AND exchange_code = 'CD' ORDER BY epoch_timestamp DESC LIMIT 5;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            // console.log(response);                  
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    zpGetBtcInrRecordsForGraph() {
        this.query = "SELECT DISTINCT current_price, date_time FROM tblBTC WHERE currency_code = 'INR' AND exchange_code = 'ZP' ORDER BY epoch_timestamp DESC LIMIT 5;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            // console.log(response);                  
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    btcxGetXrpInrRecordsForGraph() {
        this.query = "SELECT DISTINCT current_price, date_time FROM tblXRP WHERE currency_code = 'INR' AND exchange_code = 'BTCX' ORDER BY epoch_timestamp DESC LIMIT 5;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            // console.log(response);                  
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    combinedBtcUsdRecordsForGraph() {
        this.query = "SELECT DISTINCT current_price, date_time FROM tblBTC WHERE currency_code = 'USD' AND (exchange_code = 'CB' OR exchange_code = 'CD') ORDER BY epoch_timestamp DESC LIMIT 10;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            // console.log(response);                  
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    cbGetBtcUsdDayRecordsForGraph() {
        this.query = "SELECT DISTINCT current_price, date_time FROM tblBTC WHERE currency_code = 'USD' AND exchange_code = 'CB' AND date_time = '" + this.todayAsDDMMYYYY() + "' ORDER BY epoch_timestamp;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            // console.log(response);                  
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    cdGetBtcUsdDayRecordsForGraph() {
        this.query = "SELECT DISTINCT current_price, date_time FROM tblBTC WHERE currency_code = 'USD' AND exchange_code = 'CD' AND date_time = '" + this.todayAsDDMMYYYY() + "' ORDER BY epoch_timestamp;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            // console.log(response);                  
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    zpGetBtcInrDayRecordsForGraph() {
        this.query = "SELECT DISTINCT current_price, date_time FROM tblBTC WHERE currency_code = 'INR' AND exchange_code = 'ZP' AND date_time = '" + this.todayAsDDMMYYYY() + "' ORDER BY epoch_timestamp;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            // console.log(response);                  
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }

    btcxGetXrpInrDayRecordsForGraph() {
        this.query = "SELECT DISTINCT current_price, date_time FROM tblXRP WHERE currency_code = 'INR' AND exchange_code = 'BTCX' AND date_time = '" + this.todayAsDDMMYYYY() + "' ORDER BY epoch_timestamp;"
        this.runQuery(this.query, [], function (response) {
            //Success Callback
            // console.log(response);                  
            return Promise.resolve(this.returnObjFromSqlResultSet(response));
        }, function (error) {
            //Error Callback
            console.log("Error: " + error.err);
            return error;
        });
    }
}