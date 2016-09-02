import React, { Component } from 'react';

import Vibrate from '../../lib/vibrate';

const Shake = require('../../lib/shake.js');
const Bucket = require('../../lib/bucket.js');
const Names = require('../../lib/names.js');

import StartStopButton from '../StartStopButton/StartStopButton';

class IndexComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      firstTime: true,
      shake: new Shake({
        threshold: 25,
      }, this.handleShake.bind(this)),
      status: null,
      totalShake: 0,
      currentBucket: 1,
      name: null,
    }

    this.toggleStart = this.toggleStart.bind(this);

  }

  render() {
    let { started, status, totalShake, name, firstTime } = this.state;

    let prompt;

    if (!status) {
      prompt = 'Press start and shake to generate a name.';
    }
    else {
      prompt = 'Shake! Press stop to generate name.';
    }

    return (
      <div>
        <h1>Name Shaker 1.0.1</h1>
        <h2>{prompt}</h2>
        <StartStopButton started={started} firstTime={firstTime} onToggle={ this.toggleStart } />
        { name ? <h3>{name}</h3> : null }
        { started ? <h3>{status}</h3> : null }
         <p>Eccentricity: {Math.floor(totalShake)}</p>
      </div>
    )
  }

  toggleStart() {
    let { started, shake, currentBucket } = this.state;
    this.setState({started : !this.state.started});
    if (!started) {
      shake.start();
      this.setState({status: "Very common", name: null});
    } else {
      shake.stop();
      //generate a random name
      let index = Bucket.bucket_name(currentBucket);
      let name = Names.generator(index);
      this.setState({
        name: name,
        totalShake: 0,
        firstTime: false,
      });
    }
  }

  handleShake(ev, sigmaDelta) {
    let { totalShake, currentBucket } = this.state;
    let newTotalShake = totalShake + sigmaDelta;
    this.setState({totalShake: newTotalShake});
    let bucketValue = Bucket.bucket(newTotalShake);
    if (bucketValue !== currentBucket) {
      let status = Bucket.bucket_qualitative(bucketValue);
      this.setState({
        status: status,
        currentBucket: bucketValue
      });
      Vibrate(bucketValue);
    }
  }
}

IndexComponent.defaultProps = {
};

export default IndexComponent;
