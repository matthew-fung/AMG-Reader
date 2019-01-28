import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CategoryInterface, CategoryResponse, HttpProvider, Requests} from '../../providers/http/http';
import {BlogListPage} from '../blog-list/blog-list';

/**
 * Generated class for the CategoryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-category-list',
    templateUrl: 'category-list.html',
})
export class CategoryListPage {
    categories: Array<CategoryInterface>;

    constructor(public navCtrl: NavController, public navParams: NavParams, public httpProvider: HttpProvider) {
        this.httpProvider.get(Requests.categories).then(value => {
            const data = <CategoryResponse>JSON.parse(value.data);
            this.categories = data.results;
        }).catch(error => {
            console.log(error);
        })
    }

    public goToBlogList(category: CategoryInterface) {
        this.navCtrl.push(BlogListPage, {
            searchQuery: [{key: 'category', value: category.slug}],
            test: '123',
            title: category.title
        })
    }
}
