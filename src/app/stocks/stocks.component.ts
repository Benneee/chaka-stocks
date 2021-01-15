import { NewsService } from "./../../services/news/news.service";
import { StocksService } from "./../../services/stocks/stocks.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { finalize } from "rxjs/operators";
import { ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { saveAs } from "file-saver";

@Component({
  selector: "app-stocks",
  templateUrl: "./stocks.component.html",
  styleUrls: ["./stocks.component.scss"],
})
export class StocksComponent implements OnInit {
  @ViewChild("stocksChart", { static: true }) stocksChartRef: ElementRef;

  daily = "TIME_SERIES_DAILY";
  monthly = "TIME_SERIES_MONTHLY";
  intraDay = "TIME_SERIES_INTRADAY";
  isLoading = false;
  coyProfile: any = null;
  coyQuotes: any = null;
  coyVolume: any;
  coyOpen: any;
  coyPreviousClose: any;
  stocksDataChart: any[] = [];
  coyPrice: any;
  coyChange: any;
  coyChangePercent: any;
  currentChart: any;
  latestFileName = "stock-report";

  constructor(
    private stockService: StocksService,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.getStockQuotes();
    this.getCompanyProfile();
    // this.getStocksReport(this.daily);
    this.getStocksReportForIntraDay("TIME_SERIES_INTRADAY");
  }

  getCompanyProfile() {
    this.isLoading = true;
    const companyProfile$ = this.stockService.getCompanyProfile();
    companyProfile$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            console.log("BNGO: ", res);
            this.coyProfile = res;
          } else {
            console.log("error: ", res);
          }
        },
        (error) => console.log("error: ", error)
      );
  }

  getStocksReportForThreeMonths(type: string) {
    this.isLoading = true;
    this.currentChart = "three-monthly";
    const stockReport$ = this.stockService.getStockReport(type);
    stockReport$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            const dateHeads = Object.keys(res["Monthly Time Series"]);
            const dates = dateHeads.slice(0, 3);
            const timeHeads = [];
            for (let val in res["Monthly Time Series"]) {
              for (const x in res["Monthly Time Series"][val]) {
                if (res["Monthly Time Series"][val][x]) {
                  timeHeads.push(res["Monthly Time Series"][val]["2. high"]);
                }
              }
            }
            const highValues = timeHeads.slice(0, 3);
            this.createStockChart(dates, highValues);
          } else {
            console.log("error: ", res);
          }
        },
        (error) => console.log("error: ", error)
      );
  }

  getStocksReportForSixMonths(type: string) {
    this.isLoading = true;
    this.currentChart = "six-monthly";
    const stockReport$ = this.stockService.getStockReport(type);
    stockReport$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            const dateHeads = Object.keys(res["Monthly Time Series"]);
            const dates = dateHeads.slice(0, 6);
            const timeHeads = [];
            for (let val in res["Monthly Time Series"]) {
              for (const x in res["Monthly Time Series"][val]) {
                if (res["Monthly Time Series"][val][x]) {
                  timeHeads.push(res["Monthly Time Series"][val]["2. high"]);
                }
              }
            }
            const highValues = timeHeads.slice(0, 6);
            this.createStockChart(dates, highValues);
          } else {
            console.log("error: ", res);
          }
        },
        (error) => console.log("error: ", error)
      );
  }

  getStocksReportForTwelveMonths(type: string) {
    this.isLoading = true;
    this.currentChart = "twelve-monthly";
    const stockReport$ = this.stockService.getStockReport(type);
    stockReport$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            const dateHeads = Object.keys(res["Monthly Time Series"]);
            const dates = dateHeads.slice(0, 12);
            const timeHeads = [];
            for (let val in res["Monthly Time Series"]) {
              for (const x in res["Monthly Time Series"][val]) {
                if (res["Monthly Time Series"][val][x]) {
                  timeHeads.push(res["Monthly Time Series"][val]["2. high"]);
                }
              }
            }
            const highValues = timeHeads.slice(0, 12);
            this.createStockChart(dates, highValues);
          } else {
            console.log("error: ", res);
          }
        },
        (error) => console.log("error: ", error)
      );
  }

  getStocksReportForTwoYears(type: string) {
    this.isLoading = true;
    this.currentChart = "two-yearly";
    const stockReport$ = this.stockService.getStockReport(type);
    stockReport$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            const dateHeads = Object.keys(res["Monthly Time Series"]);
            const dates = dateHeads.slice(0, 24);
            const timeHeads = [];
            for (let val in res["Monthly Time Series"]) {
              for (const x in res["Monthly Time Series"][val]) {
                if (res["Monthly Time Series"][val][x]) {
                  timeHeads.push(res["Monthly Time Series"][val]["2. high"]);
                }
              }
            }
            const highValues = timeHeads.slice(0, 24);
            this.createStockChart(dates, highValues);
          } else {
            console.log("error: ", res);
          }
        },
        (error) => console.log("error: ", error)
      );
  }

  getStocksReportForFiveYears(type: string) {
    this.isLoading = true;
    this.currentChart = "five-yearly";
    const stockReport$ = this.stockService.getStockReport(type);
    stockReport$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            const dateHeads = Object.keys(res["Monthly Time Series"]);
            const dates = dateHeads.slice(0, 60);
            const timeHeads = [];
            for (let val in res["Monthly Time Series"]) {
              for (const x in res["Monthly Time Series"][val]) {
                if (res["Monthly Time Series"][val][x]) {
                  timeHeads.push(res["Monthly Time Series"][val]["2. high"]);
                }
              }
            }
            const highValues = timeHeads.slice(0, 60);
            this.createStockChart(dates, highValues);
          } else {
            console.log("error: ", res);
          }
        },
        (error) => console.log("error: ", error)
      );
  }

  getStocksReportForIntraDay(type: string) {
    this.isLoading = true;
    this.currentChart = "intraDay";
    const stockReport$ = this.stockService.getStockReportForIntraDay(type);
    stockReport$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            const dateHeads = Object.keys(res["Time Series (5min)"]);
            const dates = dateHeads.slice(0, 100);
            const timeHeads = [];
            for (let val in res["Time Series (5min)"]) {
              for (const x in res["Time Series (5min)"][val]) {
                if (res["Time Series (5min)"][val][x]) {
                  timeHeads.push(res["Time Series (5min)"][val]["2. high"]);
                }
              }
            }
            const highValues = timeHeads.slice(0, 100);
            this.createStockChart(dates, highValues);
          } else {
            console.log("error: ", res);
          }
        },
        (error) => console.log("error: ", error)
      );
  }

  // Call Daily on this one
  getStocksReportForThirtyDays(type: string) {
    this.isLoading = true;
    this.currentChart = "thirty-days";
    const stockReport$ = this.stockService.getStockReport(type);
    stockReport$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            const dateHeads = Object.keys(res["Time Series (Daily)"]);
            const dates = dateHeads.slice(0, 30);
            const timeHeads = [];
            for (let val in res["Time Series (5min)"]) {
              for (const x in res["Time Series (5min)"][val]) {
                if (res["Time Series (5min)"][val][x]) {
                  timeHeads.push(res["Time Series (5min)"][val]["2. high"]);
                }
              }
            }
            const highValues = timeHeads.slice(0, 30);
            this.createStockChart(dates, highValues);
          } else {
            console.log("error: ", res);
          }
        },
        (error) => console.log("error: ", error)
      );
  }

  getCSVData() {
    if (this.currentChart === "intraDay") {
      // call CSV for intraDay
      this.getIntraDayCSV();
    } else if (this.currentChart === "thirty-days") {
      // CSV for stockReport with type
      this.getDailyCSV();
    } else {
      this.getMonthlyCSV();
    }
  }

  getIntraDayCSV() {
    this.isLoading = true;
    const csv$ = this.stockService.getStockReportForIntraDayCSV(
      "TIME_SERIES_INTRADAY"
    );
    csv$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            const blob = new Blob([res.body]);
            const file = new File([blob], this.latestFileName + ".csv");
            saveAs(file);
          } else {
            console.log("error: ", res);
          }
        },
        (error) => {
          console.log("error: ", error);
        }
      );
  }

  getDailyCSV() {
    this.isLoading = true;
    const csv$ = this.stockService.getStockReportForIntraDayCSV(
      "TIME_SERIES_DAILY"
    );
    csv$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            const blob = new Blob([res.body]);
            const file = new File([blob], this.latestFileName + ".csv");
            saveAs(file);
          } else {
            console.log("error: ", res);
          }
        },
        (error) => {
          console.log("error: ", error);
        }
      );
  }

  getMonthlyCSV() {
    this.isLoading = true;
    const csv$ = this.stockService.getStockReportForIntraDayCSV(
      "TIME_SERIES_MONTHLY"
    );
    csv$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            const blob = new Blob([res.body]);
            const file = new File([blob], this.latestFileName + ".csv");
            saveAs(file);
          } else {
            console.log("error: ", res);
          }
        },
        (error) => {
          console.log("error: ", error);
        }
      );
  }

  getStockQuotes() {
    this.isLoading = true;
    const companyProfile$ = this.stockService.getQuotes();
    companyProfile$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            // console.log("BNGO Quotes: ", res);
            this.coyQuotes = res["Global Quote"];
            this.coyVolume = this.coyQuotes["06. volume"];
            this.coyOpen = this.coyQuotes["02. open"];
            this.coyPrice = this.coyQuotes["05. price"];
            this.coyChange = this.coyQuotes["09. change"];
            this.coyChangePercent = this.coyQuotes["10. change percent"];
            this.coyPreviousClose = this.coyQuotes["08. previous close"];
          } else {
            console.log("error: ", res);
          }
        },
        (error) => console.log("error: ", error)
      );
  }

  openInNewTab() {
    window.open("https://bionanogenomics.com", "_blank");
  }

  createStockChart(dates: any, highs: any) {
    this.stocksDataChart = new Chart(this.stocksChartRef.nativeElement, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            data: highs,
            backgroundColor: "#FFFFFF",
            borderColor: "#ADFF2F",
            // hoverBorderColor: "#000",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        elements: {
          point: {
            radius: 0,
          },
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: false,
              },

              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              display: false,
              scaleLabel: {
                display: false,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });
  }
}
