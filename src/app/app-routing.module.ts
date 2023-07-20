import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { IndexComponent } from './index/index.component';
import { VrkComponent } from './vrk/vrk.component';
import { NftComponent } from './nft/nft.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { TypesComponent } from './types/types.component';
import { GalleryComponent } from './gallery/gallery.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'vrk', component: VrkComponent},
  {path: 'nft', component: NftComponent},
  {path: 'benefits', component: BenefitsComponent},
  {path: 'types', component: TypesComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'roadmap', component: RoadmapComponent},
  {path: 'about', component: AboutComponent},
  {path: 'admin', outlet: 'adminOutlet', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
