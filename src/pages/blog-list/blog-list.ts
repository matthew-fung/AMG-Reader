import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BlogPost, HttpProvider, PostsResponse, Requests} from '../../providers/http/http';
import {BlogDetailPage} from '../blog-detail/blog-detail';

/**
 * Generated class for the BlogListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-blog-list',
    templateUrl: 'blog-list.html',
})
export class BlogListPage {

    model = {
        nextPage: "",
        posts: ([] as Array<BlogPost>),
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
        this.http.get(Requests.posts(10, this.searchQuery, null)).then(value => {
            const data = <PostsResponse>JSON.parse(value.data);
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
        this.navCtrl.push(BlogDetailPage, {
            post: post
        })
    }

    /* Load the next 'x' blog posts */
    loadNextPosts(infiniteScroll) {
        this.http.get(Requests.posts(10, this.searchQuery, this.model.nextPage)).then(value => {
            const data = <PostsResponse>JSON.parse(value.data);
            this.model.nextPage = data.next;
            this.model.posts = this.model.posts.concat(data.results);
            infiniteScroll.complete();
        }).catch(error => {
            infiniteScroll.complete();
            alert(`Could'nt connect to the server. Please try again later.`);
            console.log(error);
        })
    }

}
