import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MagazineDetailPage } from './magazine-detail';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    // MagazineDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MagazineDetailPage),
    PipesModule
  ],
})
export class MagazineDetailPageModule {}
