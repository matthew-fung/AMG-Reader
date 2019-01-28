import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MagazineListPage } from './magazine-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    // MagazineListPage,
  ],
  imports: [
    IonicPageModule.forChild(MagazineListPage),
    PipesModule
  ],
})
export class MagazineListPageModule {}
