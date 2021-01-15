import { NewsItem, NewsService } from "./../../services/news/news.service";
import { Component, OnInit } from "@angular/core";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"],
})
export class NewsComponent implements OnInit {
  isLoading = false;
  newsArticles: NewsItem[];
  dummyImg = "assets/images/inv-obs.jpg";

  p = 1;
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getStockNews();
  }

  getStockNews() {
    this.isLoading = true;
    const news$ = this.newsService.getNews();
    news$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            this.newsArticles = res;
          } else {
            console.log("error: ", res);
          }
        },
        (error) => {
          console.log("error: ", error);
        }
      );
  }

  visitArticle(news: NewsItem) {
    window.open(news.url, "_blank");
  }
}
