# Example Projects

## Setting up an Existing Project

To set up an existing project, first set up a [Resin.io account](http://alpha.resin.io/signup), create an application and associate your device with the application.

Next, clone the project into a new folder, add the application's git remote to associate the code with your application, and push it.

E.g. for the text-to-speech converter:-

```
git clone https://bitbucket.org/rulemotion/resin-text2speech.git
cd resin-text2speech
git remote add resin [git endpoint]
git push resin master
```

## Text to Speech Converter

Our [text-to-speech converter](https://bitbucket.org/rulemotion/resin-text2speech/src) example project provides a good starting point for playing with Resin.io and in turn, your Raspberry Pi.

This super-simple project takes the hardcoded text provided and 'says' the text out loud via the Raspberry Pi's Audio Out (you will need to hook up speakers or headphones to hear it.)

Once deployed, it's time to play. Try expanding this project to read tweets from a favourite twitter user, or reminders to do things on your todo list!
