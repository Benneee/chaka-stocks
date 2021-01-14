import { NewsItem, NewsService } from "./../../services/news/news.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"],
})
export class NewsComponent implements OnInit {
  isLoading = false;
  newsArticles: NewsItem[];

  p = 1;
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getStockNews();
  }

  getStockNews() {
    this.isLoading = true;
    const news$ = this.newsService.getNews();
    news$.subscribe(
      (res: any) => {
        if (res) {
          this.newsArticles = res;
          this.isLoading = false;
        } else {
          console.log("error: ", res);
        }
      },
      (error) => console.log("error: ", error)
    );
  }

  visitArticle(news: NewsItem) {
    window.open(news.url, "_blank");
  }
}
