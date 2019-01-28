import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SocialSharing} from '@ionic-native/social-sharing';
import {PhotoPost} from '../../providers/http/http';

/**
 * Generated class for the PhotoblogDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-photoblog-detail',
    templateUrl: 'photoblog-detail.html',
})
export class PhotoblogDetailPage {

    post: PhotoPost;

    constructor(public navCtrl: NavController, public navParams: NavParams, private social: SocialSharing) {
        this.post = navParams.get('post') as PhotoPost;
        console.log(this.post);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BlogDetailPage');
    }

    share() {
        this.social.share('', this.post.title, null, `http://amglaurier.com/photography-blogs/${this.post.slug}`);
    }

}
