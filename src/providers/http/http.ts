import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HTTP, HTTPResponse} from '@ionic-native/http';
import {Platform} from 'ionic-angular';

// Uses the web version of HTTP rather than the cordova version (which doesnt work on web)
// const DEVELOPMENT = true;
const DEVELOPMENT = false;
/*
 Generated class for the HttpProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class HttpProvider {

    isLive = false;

    constructor(private http: HTTP, private plt: Platform) {
        this.plt.ready().then((readySource) => {
            this.isLive = true;
        });
    }


    /* get(request) Takes a parameter of the const Requests defined below
     * and will return either the offlineData if DEVELOPMENT is true or
     * will try to process the get request and return a response of
     * type 'PostsResponse' (defined by the interface below) */

    /* Example Usage: http.get(Requests.post).then(value => {}).error(error => {})*/

    get(request): Promise<HTTPResponse> {
        if (DEVELOPMENT) {
            return new Promise((success, reject) => {
                success({
                    data: JSON.stringify(request.offlineData)
                })
            })
        } else {
            if (this.isLive) {
                return this.http.get(request.url, {}, {});
            } else {
                return new Promise((success, reject) => {
                    this.plt.ready().then((readySource) => {
                        this.http.get(request.url, {}, {}).then(data => {
                            success(data)
                        }).catch(error => {
                            reject(error)
                        });
                    });
                })
            }
        }
    }

}

export const Requests = {
    categories: {
        url: 'http://amglaurier.com/api/categories/?pagesize=100',
        offlineData: {
            "count": 12,
            "next": "http://amglaurier.com/api/categories/?page=2&pagesize=5",
            "previous": null,
            "results": [
                {
                    "title": "School",
                    "description": "Description goes here",
                    "slug": "education",
                    "image_url": "http://amglaurier.com/uploads/categories/card-saopaolo.png"
                },
                {
                    "title": "Opinions",
                    "description": "Description goes here",
                    "slug": "opinions",
                    "image_url": "http://amglaurier.com/uploads/categories/card-saopaolo.png"
                },
                {
                    "title": "Operations",
                    "description": "Description goes here",
                    "slug": "operations",
                    "image_url": "http://amglaurier.com/uploads/categories/card-saopaolo.png"
                }
            ]
        }
    },
    posts: function (pageSize, queries: Array<{ key: string, value: any }>, explicitUrl: String) {
        let url = `http://amglaurier.com/api/posts/?pagesize=${pageSize || 20}`;
        queries.forEach(query => {
            url += `&${query.key}=${query.value.split(' ').join('%20')}`
        });
        return {
            url: explicitUrl || url,
            offlineData: {
                "count": 170,
                "next": "http://amglaurier.com/api/posts/?page=2&pagesize=3",
                "previous": null,
                "results": [
                    {
                        "slug": "the-best-free-online-certifications-that-can-bring",
                        "id": 176,
                        "category_title": "Life and Skills",
                        "author": 25,
                        "previous_author": "",
                        "draft": false,
                        "title": "The Best Free Online Certifications That Can Bring Your Resume to The Next Level",
                        "created": "2017-09-05T17:29:33Z",
                        "image_url": "http://amglaurier.com/uploads/blogs/learning-online.png",
                        "content": "<p><em>The Google Analytics Individual Qualification </em>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p style=\"margin-left:.5in\"><strong>What is it?</strong> If a certificate issued by Google itself doesn&rsquo;t impress employers, I&rsquo;m not too sure what will. This course covers the use of Google&rsquo;s <em>Analytics</em> web-service. For those unfamiliar, it allows businesses to track visitor traffic to their websites, including the devices they used and the path they took to get there. In a world where it is imperative to understand your audience, it is valuable to be able to interpret and understand the implications of this data in order to optimize your online presence. This course covers everything from the basics of the interface to advanced data analysis. When you pass, not only are you issued a printable certificate, but your name is added to a searchable Google Database.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p style=\"margin-left:.5in\"><strong>Where can I find it? </strong>You can find the course itself <a href=\"https://support.google.com/partners/answer/6089738?hl=en\">here</a> as well as practice questions <a href=\"http://www.googleanalyticstest.com/\">here</a>.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><em>Salesforce Certification by Trailhead</em></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p style=\"margin-left:.5in\"><strong>What is it?</strong> Salesforce is a cloud-based application and one of the most powerful and popular CRM (Customer Relationship Management) tools out there. This software allows businesses to store customer information in the form of a database and gain insight into consumers&rsquo; activity. It has a variety of capabilities, including the auto-generation of analyses and reports. Additionally, it allows you to collaborate with coworkers and partners to create customer-facing applications with little technological skill. Proficiency with the Salesforce software is becoming increasingly valuable to employers.</p>\r\n\r\n<p style=\"margin-left:.5in\">&nbsp;</p>\r\n\r\n<p style=\"margin-left:.5in\"><strong>Where can I find it? </strong>The site can be found <a href=\"https://trailhead.salesforce.com/\">here</a>. It consists of hundreds of modules, groups of which contribute toward earning badges that show proficiency in specific areas of the application.</p>\r\n\r\n<p style=\"margin-left:.5in\">&nbsp;</p>\r\n\r\n<p><em>Udemy</em></p>\r\n\r\n<p style=\"margin-left:.5in\"><strong>What is it?</strong> This one is not a single certification, but rather a site containing many free courses. The idea is that employers can use this platform to train new employees in certain software or procedures. However, there is nothing stopping you from making a free account and taking advantage of the many free courses. Having used this site personally, I can say that it helped me considerably. The plus side to this is that many employers are familiar with the site, and so a course certification carries some weight on a resume.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p style=\"margin-left:.5in\"><strong>Where can I find it? </strong>The site can be found <a href=\"https://www.udemy.com/\">here</a>. Most of the courses are taught through video lectures.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>BONUS</strong>: <a href=\"https://ocw.mit.edu/index.htm\">MIT OpenCourseWare</a> - Although it doesn&rsquo;t offer any type of certification, this website contains video lectures of nearly every course offered at MIT. Each course also contains notes, assignments, and exams to learn and test your knowledge. This is all offered completely free, with no registration required.</p>\r\n\r\n<p>&nbsp;</p>"
                    },
                    {
                        "slug": "the-economics-of-nafta",
                        "id": 178,
                        "category_title": "Economics",
                        "author": 20,
                        "previous_author": "",
                        "draft": false,
                        "title": "The Economics of NAFTA",
                        "created": "2017-10-17T15:43:44Z",
                        "image_url": "http://amglaurier.com/uploads/blogs/NAFTA_logo.svg.png",
                        "content": "<p>&nbsp;</p>\r\n\r\n<p>When it was first signed over twenty years ago, NAFTA made history. The concept of two developed nations &ndash; such as Canada and the USA &ndash; entering a free trade agreement with a developing nation such as Mexico was unheard of.</p>\r\n\r\n<p>In the years since, there has been fierce debate over the true benefits of NAFTA. Looking at the numbers, it seems quite appealing: the NAFTA partners now make up over twenty-five percent of the world&rsquo;s GDP, despite containing less than seven percent of its population. The statistics, however, may not be telling the whole story. &nbsp;&nbsp;</p>\r\n\r\n<p>Ask an economist about the benefits of NAFTA and they will tell you that it exponentially increased trade, creating a period of sustained economic growth. In fact, it made the produce at your local supermarket significantly cheaper than before. The economist, however, will be quick to admit that it wasn&rsquo;t without its drawbacks.</p>\r\n\r\n<p>In reality, Canadian exports to Mexico have gone up only slightly. We simply don&rsquo;t trade that much with Mexico. So, when we look at appealing statistics concerning North American economic growth, we must put them in perspective.</p>\r\n\r\n<p>Cheaper Mexican labour also meant a massive loss of jobs in the USA and the removal of trade tariffs made it difficult for Mexican farmers to compete in their own country, as someone else was there to provide the goods at a cheaper price.</p>\r\n\r\n<p>In the present day, many of you may have noticed the American President&rsquo;s desire to renegotiate and even potentially leave NAFTA.</p>\r\n\r\n<p>What would that mean for Canada?</p>\r\n\r\n<p>Well, Canada is reliant on the USA, there is no question about that. NAFTA has led to unprecedented economic integration and we have become used to the benefits of free trade. That being said, the end of NAFTA wouldn&rsquo;t necessarily spell disaster &ndash; at least not just yet. In lieu of NAFTA, we would still have the Free Trade Agreement (between the USA and Canada) and it is highly unlikely that <em>this</em> deal will be terminated.</p>\r\n\r\n<p>While it is in our best interest to work out a renegotiated deal, we as a nation cannot let the threat of NAFTA ending allow us to accept a poor deal.</p>\r\n\r\n<p>The trump administration has recently proposed a &ldquo;Sunset Clause&rdquo; &ndash; one that would force NAFTA to be &ldquo;reconsidered&rdquo; every 5 years. This would precipitate uncertainty, to which Multinational companies are notoriously averse, and as a result, would likely reduce long-term investment. These corporations can simply turn to other markets; ones which are not only more stable but cheaper over the long term.</p>\r\n\r\n<p>Among a slew of unknowns, one thing is for sure: if President Trump formally withdraws from NAFTA, he will be required to trigger a six-month notice period, during which citizens of all three countries will be looking for new employment opportunities as a result of uncertainty, leading to a volatile economic atmosphere &ndash; at least in the short term.</p>\r\n\r\n<p>&nbsp;</p>"
                    },
                    {
                        "slug": "staying-afloat",
                        "id": 175,
                        "category_title": "Opinions",
                        "author": 21,
                        "previous_author": "",
                        "draft": false,
                        "title": "Staying Afloat",
                        "created": "2017-09-05T15:48:27Z",
                        "image_url": "http://amglaurier.com/uploads/blogs/Wilfrid_laurier_seal.jpg",
                        "content": "<p>Sitting in your first lecture of the year is &ndash; to say the least &ndash; &nbsp;a bizarre experience, especially if you&rsquo;re a first year. The months of anticipation &ndash; positive, negative, or both &ndash; all peak within the first few minutes of taking your seat in that lecture hall. Whether you came here to learn or to drink like a fish and get on a first-name basis with every bouncer in the Kitchener-Waterloo area, that first lecture sets the tone whether you like it or not.</p>\r\n\r\n<p>It seems callous to compare university and war, but both have been romanticized to a precarious degree; reality will put you on your ass and it&rsquo;s damn hard to avoid &ndash; you&rsquo;ll just have to experience it and take it as it comes.</p>\r\n\r\n<p>While some first-years move in with expectations that are startlingly realistic, the majority have rampant imaginations fueled by a cocktail of equal parts adrenaline, anxiety, and booze; needless to say, I fell into the latter category. Like I said though, all the nerves and expectations begin to subside during that first lecture, and you may be surprised to find that your experience bears little resemblance to <em>American Pie, 22 Jump Street, </em>and <em>Animal House. </em>You may find yourself just trying to stay afloat in this unfamiliar world, and that&rsquo;s fine &ndash; in fact it&rsquo;s as normal as it gets.</p>\r\n\r\n<p>David Foster Wallace gave a commencement speech at an American college in 2005, which included a parable that rings eerily true:</p>\r\n\r\n<p style=\"margin-left:.5in\">There are these two young fish swimming along, and they happen to meet an older fish swimming the other way, who nods at them and says, &lsquo;Morning, boys, how&#39;s the water?&rsquo; And the two young fish swim on for a bit, and then eventually one of them looks over at the other and goes, &lsquo;What the hell is water?&rsquo;</p>\r\n\r\n<p>Ignoring that we&rsquo;re quite inclined to believe that fish are not well versed in the English language, the story rings true; the plainest truths about our realities can be the most difficult to see. So maybe university isn&rsquo;t like <em>American Pie, </em>but it is reality &ndash; &ldquo;it is water.&rdquo; Who knows, maybe you&rsquo;ll like that reality even more.</p>"
                    }
                ]
            }
        }
    },

    issues: function (pageSize, queries: Array<{ key: string, value: any }>, explicitUrl: String) {
        let url = `http://amglaurier.com/api/issues/?pagesize=${pageSize || 20}`;
        queries.forEach(query => {
            url += `&${query.key}=${query.value.split(' ').join('%20')}`
        });
        return {
            url: explicitUrl || url,
            offlineData: {
                "count": 17,
                "next": null,
                "previous": null,
                "results": [
                    {
                        "title": "Fall 2017",
                        "image_url": "http://amglaurier.com/uploads/magazines/fall2017.png",
                        "pdf_url_link": "http://amglaurier.com/uploads/magazine_pdfs/fall2017.pdf",
                        "slug": "fall-2017"
                    },
                    {
                        "title": "Winter 2017",
                        "image_url": "http://amglaurier.com/uploads/magazines/winter2017.png",
                        "pdf_url_link": "http://amglaurier.com/uploads/magazine_pdfs/winter2017.pdf",
                        "slug": "winter-2017"
                    },
                    {
                        "title": "O-Day 2016",
                        "image_url": "http://amglaurier.com/uploads/magazines/oday2016_QRRxRle.png",
                        "pdf_url_link": "http://amglaurier.com/uploads/magazine_pdfs/oday2016.pdf",
                        "slug": "oday-2016"
                    },
                    {
                        "title": "Winter 2016",
                        "image_url": "http://amglaurier.com/uploads/magazines/winter2016_ytMiccp.jpg",
                        "pdf_url_link": "http://amglaurier.com/uploads/magazine_pdfs/winter2016.pdf",
                        "slug": "winter-2016"
                    }
                ]
            }
        }
    },

    photoPosts: function (pageSize, queries: Array<{ key: string, value: any }>, explicitUrl: String) {
        let url = `http://amglaurier.com/api/photoposts/?pagesize=${pageSize || 20}`;
        queries.forEach(query => {
            url += `&${query.key}=${query.value.split(' ').join('%20')}`
        });
        return {
            url: explicitUrl || url,
            offlineData: {
                "count": 15,
                "next": "http://amglaurier.com/api/photoposts/?page=2&pagesize=2",
                "previous": null,
                "results": [
                    {
                        "slug": "serenity",
                        "id": 22,
                        "author_name": "Katerina Katsoris",
                        "draft": false,
                        "title": "Serenity",
                        "created": "2017-11-16T06:53:03Z",
                        "image_url": "http://amglaurier.com/uploads/blogs/1-compressor.jpg",
                        "content": "<p><img alt=\"\" src=\"/uploads/ckeditor-uploads/2017/11/16/1-compressor.jpg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"/uploads/ckeditor-uploads/2017/11/16/2-compressor.jpg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"/uploads/ckeditor-uploads/2017/11/16/3-compressor.jpg\" style=\"height:623px; width:930px\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"/uploads/ckeditor-uploads/2017/11/16/4-compressor_HvrMxmJ.jpg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"/uploads/ckeditor-uploads/2017/11/16/5-compressor.jpg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"/uploads/ckeditor-uploads/2017/11/16/6-compressor.jpg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>This photoblog submitted by Atrium photographer Katerina Katsoris</p>"
                    },
                    {
                        "slug": "nightfall",
                        "id": 21,
                        "author_name": "Emily Ma",
                        "draft": false,
                        "title": "Nightfall",
                        "created": "2017-11-02T05:05:03Z",
                        "image_url": "http://amglaurier.com/uploads/blogs/1_TI2LtL7.jpg",
                        "content": "<p><img alt=\"\" src=\"/uploads/ckeditor-uploads/2017/11/02/1.jpg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"/uploads/ckeditor-uploads/2017/11/02/2.jpg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"/uploads/ckeditor-uploads/2017/11/02/3.jpg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"/uploads/ckeditor-uploads/2017/11/02/4.jpg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"/uploads/ckeditor-uploads/2017/11/02/5.jpg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>This blog submitted by Atrium photographer Emily&nbsp;</p>"
                    }
                ]
            }
        }
    }
};

export interface CategoryResponse {
    count: number,
    next: string,
    previous: string,
    results: Array<CategoryInterface>
}

export interface PostsResponse {
    count: number,
    next: string,
    previous: string,
    results: Array<BlogPost>
}

export interface CategoryInterface {
    title: string,
    description: string,
    image_url: string,
    slug: string
}

export interface PhotoPostsResponse {
    count: number,
    next: string,
    previous: string,
    results: Array<PhotoPost>
}

export interface IssuesResponse {
    count: number,
    next: string,
    previous: string,
    results: Array<Issue>
}

export interface PhotoPost {
    slug: string,
    id: number,
    author_name: string,
    draft: boolean,
    title: string,
    created: string,
    image_url: string,
    content: string
}

export interface BlogPost {
    slug: string,
    url: string,
    category_title: string,
    author_name: string,
    author: number,
    draft: boolean,
    title: string,
    created: string,
    image_url: string,
    content: string
}

export interface Issue {
    title: string,
    image_url: string,
    pdf_url_link: string,
    slug: string
}


