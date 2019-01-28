import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpProvider, Issue, IssuesResponse, Requests} from '../../providers/http/http';
import {Platform} from 'ionic-angular';
/**
 * Generated class for the MagazineListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare let cordova: any;

@IonicPage()
@Component({
    selector: 'page-magazine-list',
    templateUrl: 'magazine-list.html',
})

export class MagazineListPage {
    model = {
        nextPage: "",
        issues: ([] as Array<Issue>),
        title: 'Latest Posts'
    };


    constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpProvider, private platform:Platform) {
    
    }

    ionViewDidLoad() {
        console.log(localStorage);
        // Get the post data from the server
        this.http.get(Requests.issues(10, [], null)).then(value => {
            const data = <IssuesResponse>JSON.parse(value.data);
            this.model.nextPage = data.next;
            this.model.issues = data.results;
        }).catch(error => {
            alert(`Couldn't connect to the server. Please try again later.`);
            console.log(error);
        })
    }


    viewIssue(issue: Issue) {
        //BUG: both platform.is IOS, causing android magazines to not launch: change one to Android 
        if(this.platform.is('ios')) {
            this.platform.ready().then(() => {
                cordova.InAppBrowser.open(issue.pdf_url_link, "_blank", "location=false");
            });
        } else {
            this.platform.ready().then(() => {
                cordova.InAppBrowser.open(issue.pdf_url_link, "_system", "location=false");
            });
        }
        
    }


    /* Load the next 'x' blog posts */
    loadNextPosts(infiniteScroll) {
        this.http.get(Requests.issues(5, [], this.model.nextPage)).then(value => {
            const data = <IssuesResponse>JSON.parse(value.data);
            this.model.nextPage = data.next;
            this.model.issues = this.model.issues.concat(data.results);
            infiniteScroll.complete();
        }).catch(error => {
            infiniteScroll.complete();
            alert(`Couldn't connect to the server. Please try again later.`);
            console.log(error);
        })
    }

    
}
