import React, { Component, PropTypes } from 'react';

class StartStopButton extends Component {
  render() {

    let { started, firstTime, onToggle } = this.props;

    let button_text;

    if (!started && firstTime) {
      button_text = "Start";
    }
    else if (!started && !firstTime) {
      button_text = "Try again";
    }
    else {
      button_text = "Stop";
    }

    return (
      <button className={'main-control button-primary'} onClick={onToggle}>{button_text}</button>
    )
  }
}

StartStopButton.propTypes = {
  started: PropTypes.bool,
  firstTime: PropTypes.bool,
  onToggle: PropTypes.func,
}

StartStopButton.defaultProps = {
  started: false,
}

export default StartStopButton;
