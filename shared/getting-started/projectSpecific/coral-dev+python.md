## Update your model

Okay, so now we know how to deploy and update our code easily, but how do we update or change our model? In this project, you will notice that the code is split into [`edge-logic`](https://github.com/balena-io-examples/coral-getting-started/tree/master/edge-logic) and [`models`](https://github.com/balena-io-examples/coral-getting-started/tree/master/models). These containers can be happily updated without affecting one another too much. If you want to deploy a new model to your fleet, simply drop your new model and its labels into the "models" folder and make sure to name them `model.tflite` and `labels.txt`. You can find some great premade models [here][coral-models]. Make sure to select one of the "classification" models for this demo.

With your new model added, perform another `balena push` to your application and you should see the `model` service update and begin running. Super easy!

Now that you have a handle on code deployment try out our more complex example: https://github.com/balena-io-examples/coral-streaming-object-detector . This project does realtime object recognition on a video stream, either an mp4 video file or a video camera. You can view the video stream live over the internet with the inference overlayed on top. Check it out and get building!

[coral-models]:https://coral.ai/models/


