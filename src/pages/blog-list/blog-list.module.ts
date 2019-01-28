import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogListPage } from './blog-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    // BlogListPage,
  ],
  imports: [
    IonicPageModule.forChild(BlogListPage),
    PipesModule
  ],
})
export class BlogListPageModule {}
