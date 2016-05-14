import tweepy, json
from tweepy import Stream
from tweepy.streaming import StreamListener

CONSUMER_KEY = 'pj9lbgsprEnUViRP9mJQm2wfk'
CONSUMER_SECRET = '2pJWRjjORJV8acUqucDMkEKfjisEPTkAcEDVCJlm48wQoyPP7O'
ACCESS_KEY = '716892053058269184-NIoo2OECnXooYVPGd7LjxBd1OfdodZ7'
ACCESS_SECRET = 'wNeNmAN3u6WqgqhDZj9Zl3FevcnVh7am1EpFKbWCLhMZ5'
auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)
api = tweepy.API(auth)

# Create a json Object
jsonObj = { "tweets":[ ] }

# counter2 = 0

# Create a Stream Listener
class MyListener(StreamListener):

    # When data are received
    def on_data(self, data):

        try:
            encoded = json.loads(data)
            text = encoded['text'].encode('utf-8')
            print(text)
            # transalte into morese
            # then, morse = string


            # Append data to json Object
            with open('morse.txt', 'a') as f:
                # Write Data into a json file
                f.write(text)
                return True
            with close('morse.txt')

        except BaseException as e:
            print("Error on_data: %s" % str(e))
        return True

    def on_error(self, status):
        print(status)
        return True
        # counter2 += 1

#!/usr/bin/python
import time;  # This is required to include time module.

ticks = time.time()
print("Number of ticks since 12:00am, May 1, 2016:", ticks)

twitter_stream = Stream(auth, MyListener())
# Use filter to stream tweet with specific keyword or hastag
twitter_stream.filter(track=['#nuitdebout'])

# if counter2 == 3:
#         time.sleep(60*20) # wait for 20 min everytime 4,000 tweets are extracted
#         counter2 = 0
#         continue


# startSince = '2016-05-01'
# endUntil = '2014-05-02'
#
# for tweet in twitter_stream.filter(track=['#nuitdebout']),
#     since=startSince, until=endUntil).items(999999999):

# time.sleep(60)
# def hashtag():
#     twitter_stream.filter(track=['#nuitdebout'])
#
# t - Timer(2.0, hashtag)
# t.start()
#
# def hashtag2():
#     twitter_stream.filter(track=['#trump'])
#
# t - Timer(7.0, hashtag2)
# t.start()
