Included in our project we pushed an image called [parrot.jpg](https://github.com/balena-io-examples/coral-getting-started/tree/master/edge-logic/images) which the classification is run on.

![Picture of a parrot](/img/coral-dev/parrot.jpg)

Once your code is running you should see logs on the balenaCloud dashboard stating that is found a `Macaw` with some confidence score. See an example of the output below.

```
21.04.20 09:48:06 (+0200)  model  Copying Model to shared volume...
21.04.20 09:48:06 (+0200)  model  'model.tflite' -> 'shared-model/model.tflite'
21.04.20 09:48:06 (+0200)  model  'labels.txt' -> 'shared-model/labels.txt'
21.04.20 09:48:08 (+0200) Service exited 'model sha256:ecc7c067ed40fe05a954d350f12c09eb8fe29a1603a41727db0ad3d303340e72'
21.04.20 09:48:10 (+0200)  edge-logic  ---------------------------
21.04.20 09:48:10 (+0200)  edge-logic  macaw
21.04.20 09:48:10 (+0200)  edge-logic  Score :  0.99609375
21.04.20 09:48:11 (+0200) Service exited 'edge-logic sha256:6c9cab0aa31683ce140d5c16a3d09681a73e6eca25b2a044d3b7f4b74bb560da'
```