from textblob import TextBlob
import sys, tweepy
from flask import Flask, jsonify

consumerKey = "xxxx"
consumerSecret = "xxxx"
accessToken = "xxxx"
accessTokenSecret = "xxxx"
def twitterDataExtaraction(tags,tags2):
    auth = tweepy.OAuthHandler(consumer_key=consumerKey, consumer_secret=consumerSecret)
    auth.set_access_token(accessToken, accessTokenSecret)
    api = tweepy.API(auth,wait_on_rate_limit=True)

    tweets = tweepy.Cursor(api.search,q=tags+' AND '+tags2, lang='en',tweet_mode="extended",full_text=True).items(100)

    positive = 0
    negative = 0
    neutral = 0

    data=[]
    for tweet in tweets:
        #print(tweet.full_text)
        analysis = TextBlob(tweet.full_text)
        if (analysis.sentiment.polarity == 0):
            neutral += 1
        elif (analysis.sentiment.polarity > 0):
            positive += 1
        elif (analysis.sentiment.polarity < 0):
            negative += 1
    return neutral, negative, positive

if __name__ == "__main__":

    print(twitterDataExtaraction())


