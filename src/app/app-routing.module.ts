import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { VrkComponent } from './vrk/vrk.component';
import { NftComponent } from './nft/nft.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { GalleryComponent } from './gallery/gallery.component';
import { TypesComponent } from './types/types.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
