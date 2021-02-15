import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt-PT";

registerLocaleData(localePt);

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgxGaugeModule } from "ngx-gauge";

import { MaterialModule } from "./material/material.module";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LoadingComponent } from "./loading/loading.component";
import { ErrorComponent } from "./error/error.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

import { HomeModule } from "./home/home.module";
import { ObservatoryNumbersModule } from "./observatory-numbers/observatory-numbers.module";
import { DirectoryModule } from "./directory/directory.module";
import { WebsiteModule } from "./website/website.module";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoadingComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxGaugeModule,
    FlexLayoutModule,
    HttpClientModule,
    HomeModule,
    ObservatoryNumbersModule,
    DirectoryModule,
    WebsiteModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pt-PT" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
