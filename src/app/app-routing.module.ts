import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NftComponent } from './nft/nft.component';

const routes: Routes = [
  {path: 'about-component', component: NftComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
