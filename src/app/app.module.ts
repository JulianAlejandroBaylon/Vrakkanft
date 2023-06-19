import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { NftComponent } from './nft/nft.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { TypesComponent } from './types/types.component';
import { GalleryComponent } from './gallery/gallery.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { VrkComponent } from './vrk/vrk.component';
import { AboutComponent } from './about/about.component';
import { NgParticlesModule } from "ng-particles";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ConnectService, Blockchain, ObjectVrakkaNFT, ObjectICO } from './services/connect.service';

// Función para cargar archivos JSON
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NftComponent,
    BenefitsComponent,
    TypesComponent,
    GalleryComponent,
    RoadmapComponent,
    VrkComponent,
    AboutComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgParticlesModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule
  ],
  providers: [ConnectService, Blockchain, ObjectVrakkaNFT, ObjectICO],
  bootstrap: [AppComponent]
})
export class AppModule { }
