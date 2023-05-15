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

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NftComponent,
    BenefitsComponent,
    TypesComponent,
    GalleryComponent,
    RoadmapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
