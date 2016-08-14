import React, { Component } from 'react';

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

    if (!status) {
      status = "Press start and shake to generate a name.";
    }

    return (
      <div>
        <h1>Name Shaker 1.0</h1>
        <h2>{status}</h2>
        <StartStopButton started={started} firstTime={firstTime} onToggle={ this.toggleStart } />
        { name ? <h3>{name}</h3> : null }
         <p>Delta: {totalShake}</p>
      </div>
    )
  }

  toggleStart() {
    let { started, shake, currentBucket } = this.state;
    this.setState({started : !this.state.started});
    if (!started) {
      shake.start();
      this.setState({status: "Shake! Press stop to generate name.", name: null});
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
    let { totalShake } = this.state;
    let newTotalShake = totalShake + sigmaDelta;
    this.setState({totalShake: newTotalShake});
    let bucketValue = Bucket.bucket(newTotalShake);
    let status = Bucket.bucket_qualitative(bucketValue);
    this.setState({
      status: status,
      currentBucket: bucketValue
    });
  }
}

IndexComponent.defaultProps = {
};

export default IndexComponent;
