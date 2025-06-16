import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { TweetService } from '../services/tweet.service';
import { Tweet } from '../models/tweets/Tweet';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports:[CommonModule, FormsModule],

})
export class HomeComponent implements OnInit {
  tweetText: string = "";

  username: string = '';
  tweets: Tweet[] = [];

  constructor(
    private storageService: StorageService,
    private tweetService: TweetService
  ) {}

  ngOnInit(): void {
    this.username = this.storageService.getSession('user') || '';
    console.log('Usuario:', this.username);
    this.getTweets();
  }


getTweets(): void {
  this.tweetService.getTweets().subscribe({
    next: (response: any) => {
      this.tweets = response.content; // 👈 extraemos el array
      console.log('Tweets:', this.tweets);
    },
    error: (err) => {
      console.error('Error:', err);
    }
  });
}

  public addTweet()
 {
  this.tweetService.postTweet(this.tweetText).subscribe((tweet: any) => {
     console.log(tweet);
     this.getTweets();

   });

 }


}
