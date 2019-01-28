import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpProvider, PhotoPost, PhotoPostsResponse, Requests} from '../../providers/http/http';
import {PhotoblogDetailPage} from '../photoblog-detail/photoblog-detail';

/**
 * Generated class for the PhotoblogListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-photoblog-list',
    templateUrl: 'photoblog-list.html',
})
export class PhotoblogListPage {

    model = {
        nextPage: "",
        posts: ([] as Array<PhotoPost>),
        title: 'Latest Posts'
    };

    private searchQuery;

    /*--- Initialization ---*/

    constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpProvider) {
        this.searchQuery = navParams.get('searchQuery') || [];
        this.model.title = navParams.get('title') || 'Latest Posts'
    }

    ionViewDidLoad() {
        // Get the post data from the server
        this.http.get(Requests.photoPosts(10, this.searchQuery, null)).then(value => {
            const data = <PhotoPostsResponse>JSON.parse(value.data);
            this.model.nextPage = data.next;
            this.model.posts = data.results;
        }).catch(error => {
            alert(`Couldn't connect to the server. Please try again later.`);
            console.log(error);
        })
    }

    /*--- UI Functions ---*/

    /* Open a specific post */
    viewPost(post) {
        this.navCtrl.push(PhotoblogDetailPage, {
            post: post
        })
    }

    /* Load the next 'x' blog posts */
    loadNextPosts(infiniteScroll) {
        console.log('LOADING');
        this.http.get(Requests.photoPosts(10, this.searchQuery, this.model.nextPage)).then(value => {
            const data = <PhotoPostsResponse>JSON.parse(value.data);
            this.model.nextPage = data.next;
            console.log(data);
            this.model.posts = this.model.posts.concat(data.results);
            infiniteScroll.complete();
        }).catch(error => {
            infiniteScroll.complete();
            alert(`Couldn't connect to the server. Please try again later.`);
            console.log(error);
        })
    }

}
