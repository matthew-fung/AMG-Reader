import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BlogDetailPage} from './blog-detail';
// import {SocialSharing} from '@ionic-native/social-sharing';

@NgModule({
    declarations: [
        // BlogDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(BlogDetailPage),
        // SocialSharing
    ],
})
export class BlogDetailPageModule {}
