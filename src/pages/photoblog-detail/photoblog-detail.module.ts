import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoblogDetailPage } from './photoblog-detail';
import {SocialSharing} from '@ionic-native/social-sharing';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    // PhotoblogDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoblogDetailPage),
      // SocialSharing
    PipesModule
  ],
})
export class PhotoblogDetailPageModule {}
