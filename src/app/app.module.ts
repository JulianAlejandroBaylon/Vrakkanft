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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
