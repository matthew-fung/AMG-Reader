import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BlogPost} from '../../providers/http/http';
import {SocialSharing} from '@ionic-native/social-sharing';
/**
 * Generated class for the BlogDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-blog-detail',
    templateUrl: 'blog-detail.html',
})
export class BlogDetailPage {

    post: BlogPost;

    constructor(public navCtrl: NavController, public navParams: NavParams, private social: SocialSharing) {
        this.post = navParams.get('post') as BlogPost;
    }

    ionViewDidLoad() {
    }

    share() {
        this.social.share('', this.post.title, null, `http://amglaurier.com/blogs/${this.post.slug}`);
    }

}


