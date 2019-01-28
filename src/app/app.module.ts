import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {BlogDetailPage} from '../pages/blog-detail/blog-detail';
import {BlogListPage} from '../pages/blog-list/blog-list';
import {CategoryListPage} from '../pages/category-list/category-list';
import {MagazineListPage} from '../pages/magazine-list/magazine-list';
import {MagazineDetailPage} from '../pages/magazine-detail/magazine-detail';
import {PhotoblogDetailPage} from '../pages/photoblog-detail/photoblog-detail';
import {PhotoblogListPage} from '../pages/photoblog-list/photoblog-list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {PipesModule} from '../pipes/pipes.module';
import {HttpProvider} from '../providers/http/http';
import {HTTP} from '@ionic-native/http';
import {MarkdownModule} from 'angular2-markdown';
import {SocialSharing} from '@ionic-native/social-sharing';
import {LocalStorageProvider} from '../providers/local-storage/local-storage';
import {DocumentViewer} from '@ionic-native/document-viewer';
import {File} from '@ionic-native/file';
import {SpinnerDialog} from '@ionic-native/spinner-dialog';
import { SafeHtmlPipe } from '../pipes/safe-html/safe-html';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        BlogDetailPage,
        BlogListPage,
        CategoryListPage,
        MagazineListPage,
        MagazineDetailPage,
        PhotoblogDetailPage,
        PhotoblogListPage,
        SafeHtmlPipe
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        MarkdownModule.forRoot(),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        // ListPage,
        BlogDetailPage,
        BlogListPage,
        CategoryListPage,
        MagazineListPage,
        MagazineDetailPage,
        PhotoblogDetailPage,
        PhotoblogListPage,
    ],
    providers: [
        HTTP,
        SocialSharing,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        HttpProvider,
        LocalStorageProvider,
        DocumentViewer,
        File,
        SpinnerDialog
    ]
})
export class AppModule {
}
