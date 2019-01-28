import {IssuesResponse} from './../../providers/http/http';
import {Component} from '@angular/core';
import {IonicPage, NavController, Platform} from 'ionic-angular';
import {HttpProvider, Issue, BlogPost, PhotoPost, PhotoPostsResponse, PostsResponse, Requests} from '../../providers/http/http';
import {BlogDetailPage} from '../blog-detail/blog-detail';
import {PhotoblogDetailPage} from '../photoblog-detail/photoblog-detail';
import {MagazineDetailPage} from '../magazine-detail/magazine-detail';

declare let cordova: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    model = {
        nextPage: "",
        blogPosts: {
            first: (null as BlogPost),
            rest: ([] as Array<BlogPost>)
        },
        photoPosts: {
            first: (null as PhotoPost),
            rest: ([] as Array<PhotoPost>)
        },
        issues: {
            first: (null as Issue),
            rest: ([] as Array<Issue>)
        },
        title: 'Latest Posts',
    };

    private searchQuery;

    constructor(public navCtrl: NavController, private http: HttpProvider, private platform: Platform) {
        this.searchQuery = [];

    }

    ionViewDidLoad() {
        // Get latest post from the server
        this.http.get(Requests.posts(3, this.searchQuery, null)).then(value => {
            const data = <PostsResponse>JSON.parse(value.data);
            this.model.blogPosts.first = data.results[0];
            this.model.blogPosts.rest = data.results.slice(1);
        }).catch(error => {
            alert(`Couldn't connect to the server. Please try again later.`);
            console.log(error);
        });

        this.http.get(Requests.photoPosts(3, this.searchQuery, null)).then(value => {
            const data = <PhotoPostsResponse>JSON.parse(value.data);
            this.model.photoPosts.first = data.results[0];
            this.model.photoPosts.rest = data.results.slice(1);
        }).catch(error => {
            alert(`Couldn't connect to the server. Please try again later.`);
            console.log(error);
        });

        this.http.get(Requests.issues(1, this.searchQuery, null)).then(value => {
            const data = <IssuesResponse>JSON.parse(value.data);
            this.model.issues.first = data.results[0];
            this.model.issues.rest = data.results.slice(1);
        }).catch(error => {
            alert(`Couldn't connect to the server. Please try again later.`);
            console.log(error);
        });

    }

    /*--- UI Functions ---*/

    /* Open a specific post */
    viewPost(post) {
        this.navCtrl.push(BlogDetailPage, {
            post: post
        })
    }

    /* Open a specific post */
    viewPhotoPost(post) {
        this.navCtrl.push(PhotoblogDetailPage, {
            post: post
        })
    }

    viewIssue(issue: Issue) {
        if (this.platform.is('ios')) {
            this.platform.ready().then(() => {
                cordova.InAppBrowser.open(issue.pdf_url_link, "_blank", "location=false");
            });
        } else {
            this.platform.ready().then(() => {
                cordova.InAppBrowser.open(issue.pdf_url_link, "_system", "location=false");
            });
        }

    }
}

