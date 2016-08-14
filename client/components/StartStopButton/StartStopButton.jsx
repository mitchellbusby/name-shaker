import React, { Component, PropTypes } from 'react';

class StartStopButton extends Component {
  render() {

    let { started, onToggle } = this.props;

    let button_text = started ? "Stop" : "Start";
    return (
      <button className={'main-control button-primary'} onClick={onToggle}>{button_text}</button>
    )
  }
}

StartStopButton.propTypes = {
  started: PropTypes.bool,
  onToggle: PropTypes.func,
}

StartStopButton.defaultProps = {
  started: false,
}

export default StartStopButton;
