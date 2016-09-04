#PPI Tutorial: Name Shaker (Mitchell Busby, 11971417)

##Introduction to the app

This web app uses the accelerometer in your smartphone or other sensor-enabled device as an input to dictate how rare the name is that will be generated. All names and statistical data for the rarity of names were sourced from the US Social Security births registry from 2011.

It makes use of the HTML5 `devicemotion` API, so you'll need a device that has an accelerometer and a [browser that supports it](http://caniuse.com/deviceorientation).

I've tested this on an iPhone 5 (iOS 9 Safari) and a Nexus 5X (Marshmallow Chrome) but I don't guarantee it to be calibrated for any other devices - they may report the devicemotion level differently and you might need to shake the phone more or less.


##How to use

1. Open up https://name-shaker.herokuapp.com/
2. Press the "Start" button. (Figure 1)
3. Start shaking, and notice how the level of randomosity changes depending on how hard you shake it - the phone should vibrate based on this. (Figure 2)
4. Press the "Stop" button and you'll see a name. (Figure 3)
5. Tap the 'Try again' button if you want to try again.

![The start screen][step-1]

![The change in entropy][step-2]

![A name is generated][step-3]


##Design Context & Solution

I wanted to be able to create a demonstration of how device motion can be used as a meaningful input source beyond simple moving graphics on a screen. I also have had experience in using random name generators, and this led to my design solution.

I made a web app to demonstrate this since it has a nice API for easily grabbing motion data, allowing me to quickly prototype the product. Additionally, users are fairly familiar with the idea that their smartphone can detect movement, following the widespread popularity of games such as Doodle Jump and Jelly Car.

I ran into some difficulty when it came to determining how device motion is to be measured and mapped to 'randomosity'. The `devicemotion` Web API publishes an event every time you shake the device, and gives you levels of motion in the x, y, and z axes. This is a **somewhat arbitrary measurement**, and there is little documentation about what this is based on. You may need to tweak your tolerance levels per device - in this respect it's quite hard to assume all devices will work equally without a calibrator.

I filter out device motion events that have less than 25 points of motion - we don't want the user accidentally increasing the entropy level by just moving the device around casually.

```
def event_is_notable(alpha, beta, gamma) => { return alpha+beta > 25 || alpha+gamma > 25 || beta+gamma > 25 }
```

I then sum the x / y / z motion planes and keep a running total of this whilst the user is shaking. At certain levels (100, 300, and 500), the device vibrates to provide feedback to the user that they're increasing the entropy of the name that is to be randomly generated.

There is also a label on screen to indicate the entropy bucket the user is in.

![The on-screen indicator][bucket-indicator]

##Potential future usages

This project demonstrates a unique usage of device motion as an interaction method. You could also use the accelerometer for:
- Paginating content with the device orientation controlling the speed of pagination (useful for sifting through large collections of data)
- A user friendly and engaging pseudo-random number generator - would improve security over existing PRNGs that already exist and use more predictable sources of noise data
- Other input types requiring entropy measurements

##Sources & further reading

Source code for this project can be found on [GitHub](https://github.com/mitchellbusby/name-shaker). Feel free to look at the source or fork it (main business logic is found in `name-shaker -> client -> lib`.

Based on [react-webpack-boilerplate](https://github.com/srn/react-webpack-boilerplate). This app makes use of React and a heavily modified version of alexgibson's shake.js.

For the more geeky details, I've written a longer blog post covering the underlying code implementation of all this at [my website](http://blog.mitchellbusby.com/2016/08/26/name-shaker/).

[step-1]: step-1.png
[step-2]: step-2.png
[step-3]: step-3.png
[bucket-indicator]: onscreen-indicator.png
