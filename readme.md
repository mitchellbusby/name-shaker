#Name Shaker

A little web application I wrote to support a subject I'm doing on physical interaction design at uni. The eccentricity of the name that is generated is defined by how much you shake your phone. The data backing it is from the US Social Security branch, 2011.  

Based on [react-webpack-boilerplate](https://github.com/srn/react-webpack-boilerplate). Name Shaker uses React and a modified version of alexgibson's shake.js.

#Install

Requirements:

- node 5+
- npm (included with NodeJS)

`npm install`

#Development

`npm start`

Open up your browser and go to http://localhost:3001

#Deployment

Included is a Procfile to run this on a Heroku instance - make sure you enable devDependencies in the Heroku config if you want to do this.

To run in production mode, set the NODE_ENV environment variable to 'production'.

```
$ npm run dist

$ NODE_ENV=production npm start
```

#Compatibility

This makes use of the HTML5 `devicemotion` API, so you'll need a device that has a capable browser and accelerometer.

I've tested this on an iPhone 5 (iOS 9 Safari) and a Nexus 5X (Marshmallow Chrome) but I don't guarantee it to be calibrated for any other devices - other devices may report weirdly and you won't get much randomosity.
