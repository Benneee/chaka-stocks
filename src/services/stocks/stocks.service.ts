import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";

const alphaAPIKey = environment.alphaAPIKey;
const stocksAPIBaseUrl = environment.stocksAPIBaseUrl;
const routes = {
  stocks: "&symbol=BNGO&outputsize=compact",
  stocksForIntraDay: "&symbol=BNGO&interval=5min&outputsize=compact",
  companyProfile: "OVERVIEW&symbol=BNGO",
  stockQuotes: "GLOBAL_QUOTE&symbol=BNGO",
};
@Injectable({
  providedIn: "root",
})
export class StocksService {
  constructor(private http: HttpClient) {}

  getStockReport(type: string): Observable<any> {
    return this.http.get(
      `${stocksAPIBaseUrl}${type}${routes.stocks}&apikey=${alphaAPIKey}`
    );
  }

  getStockReportCSV(type: string): Observable<any> {
    return this.http.get(
      `${stocksAPIBaseUrl}${type}${routes.stocks}&apikey=${alphaAPIKey}&datatype=csv`,
      { observe: "response", responseType: "arraybuffer" }
    );
  }

  getStockReportForIntraDay(type: string): Observable<any> {
    return this.http.get(
      `${stocksAPIBaseUrl}${type}${routes.stocksForIntraDay}&apikey=${alphaAPIKey}`
    );
  }

  getStockReportForIntraDayCSV(type: string): Observable<any> {
    return this.http.get(
      `${stocksAPIBaseUrl}${type}${routes.stocksForIntraDay}&apikey=${alphaAPIKey}&datatype=csv`,
      { observe: "response", responseType: "arraybuffer" }
    );
  }

  getCompanyProfile(): Observable<any> {
    return this.http.get(
      `${stocksAPIBaseUrl}${routes.companyProfile}&apikey=${alphaAPIKey}`
    );
  }

  getQuotes(): Observable<any> {
    return this.http.get(
      `${stocksAPIBaseUrl}${routes.stockQuotes}&apikey=${alphaAPIKey}`
    );
  }
}
