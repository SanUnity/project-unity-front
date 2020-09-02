import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTimer: false,
      loaded: false,
    };
  }

  componentDidMount = () => {
    const {
      timestamp,
      maxTime,
    } = this.props;

    this.timestamp = timestamp;
    this.max = maxTime * 60 * 60;
    const now = Math.floor(new Date().getTime() / 1000);
    let distance = now - this.timestamp;
    if (distance < 0) {
      distance = 0;
      this.timestamp = now;
    }

    if (distance < this.max) {
      this.refreshTime();
      this.setState({
        displayTimer: true,
      });

      this.interval = setInterval(this.refreshTime, 1000);
    }
    this.setState({ loaded: true });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  refreshTime = () => {
    const now = Math.floor(new Date().getTime() / 1000);
    let distance = now - this.timestamp;

    if (distance < 0) {
      distance = 0;
    }

    distance *= 1000;

    if (distance / 1000 >= this.max) {
      clearInterval(this.interval);
      this.setState({ displayTimer: false });
      return;
    }

    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    hours = Math.abs(hours - 23);
    minutes = Math.abs(minutes - 59);
    seconds = Math.abs(seconds - 59);

    this.setState({
      hours: hours < 10 ? `0${hours}` : hours.toString(),
      minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
      seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
    });
  };

  render() {
    const { DoneContent } = this.props;
    const {
      loaded, displayTimer, hours, minutes, seconds,
    } = this.state;

    return loaded ? (
      <div className='timer-wrapper'>
        {displayTimer ? (
          <React.Fragment>
            <div className='well'>
              <img src='/assets/images/clock-small.svg' alt='' />
              {parseInt(hours, 10) > 0 && (
                <span id='hour' className='timer'>
                  {`${hours}h `}
                </span>
              )}
              <span id='min' className='timer'>
                {`${minutes}m `}
              </span>
              <span id='sec' className='timer'>
                {`${seconds}s `}
              </span>
            </div>
          </React.Fragment>
        ) : (
          DoneContent && (<DoneContent />)
        )}
      </div>
    ) : null;
  }
}
Timer.displayName = 'Timer';
Timer.propTypes = {
  timestamp: PropTypes.number.isRequired,
  maxTime: PropTypes.number,
  DoneContent: PropTypes.func,
};
Timer.defaultProps = {
  maxTime: 24,
  DoneContent: null,
};
export default Timer;
