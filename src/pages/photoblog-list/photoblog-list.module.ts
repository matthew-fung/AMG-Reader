import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoblogListPage } from './photoblog-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    // PhotoblogListPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoblogListPage),
    PipesModule
  ],
})
export class PhotoblogListPageModule {}
