import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "./loader/loader/loader.component";
import { ShortNumberPipe } from "./helpers/short-number.pipe";

@NgModule({
  declarations: [LoaderComponent, ShortNumberPipe],
  imports: [CommonModule],
  exports: [LoaderComponent, ShortNumberPipe],
})
export class SharedModule {}
