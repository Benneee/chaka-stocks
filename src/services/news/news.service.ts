import { environment } from "./../../environments/environment.prod";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

const apiKey = environment.newsAPIKey;
const newsBaseUrl = environment.newsAPIBaseUrl;
const routes = {
  news: "BNGO/news?perpage=50&page=1",
};

export interface NewsItem {
  symbols: any;
  timestamp: string;
  title: string;
  url: string;
  source: string;
  summary: string;
  image: string;
  keywords: any;
}

@Injectable({
  providedIn: "root",
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(): Observable<any> {
    return this.http.get(`${newsBaseUrl}/${routes.news}&apiKey=${apiKey}`);
  }
}
