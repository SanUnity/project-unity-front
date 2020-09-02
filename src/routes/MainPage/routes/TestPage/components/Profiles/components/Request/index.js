import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timer from 'components/Timer';
import history from 'store/history';

const MAX_REQUEST_TIME = 24; // 12h

class Request extends Component {
  goToProfile = async () => {
    const { request, activeProfileID } = this.props;
    if (request.profileID) {
      history.push(`profile/${request.profileID}/request/${request.id}`);
    } else {
      history.push(`profile/${activeProfileID}/request/${request.id}`);
    }
  };

  render() {
    const { request, literals } = this.props;
    return (
      <div className={`request row ${request.id === -1 ? 'is-empty' : ''}`} onClick={this.goToProfile}>
        <div className='col-12 p-0'>
          {request.id !== -1 ? (
            <div className='media'>
              <img className='align-self-center mr-3' src='/assets/images/dummy-green-small.svg' alt='' />
              <div className='media-body'>
                <p className='p-motive'>
                  <span className='crop-text lines-1'>{request.motive}</span>
                  <img
                    className=''
                    src='/assets/images/chevron-right.svg'
                    alt=''
                  />
                </p>
                <p className='p-destiny crop-text lines-1'>
                  {request.destiny}
                </p>
                <Timer
                  timestamp={request.timestamp}
                  maxTime={MAX_REQUEST_TIME}
                  DoneContent={/* istanbul ignore next */() => (
                    <p>{literals.test2.requestExpired}</p>
                  )}
                />
              </div>
            </div>
          ) : (
            <div className='media'>
              <img className='align-self-center mr-3' src='/assets/images/dummy-gray-small.svg' alt='' />
              <div className='media-body align-self-center'>
                <p className='p-generate'>
                  {literals.test2.generateRequest}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
Request.displayName = 'Request';
Request.propTypes = {
  literals: PropTypes.object.isRequired,
  request: PropTypes.object,
};
Request.defaultProps = {
  request: { id: -1 },
};
export default Request;
