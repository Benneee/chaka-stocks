import { StocksComponent } from "./stocks/stocks.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewsComponent } from "./news/news.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "stocks",
    pathMatch: "full",
  },
  {
    path: "news",
    component: NewsComponent,
  },
  {
    path: "stocks",
    component: StocksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
