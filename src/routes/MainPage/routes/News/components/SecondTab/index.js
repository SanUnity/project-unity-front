import React from 'react';
import PropTypes from 'prop-types';
import { formatDateNews } from 'utils';

/**
 * @name SecondTab
 *
 * @param {array} listItems
 *
 * @returns {JSX}
 */

const SecondTab = (
  {
    listItems,
    literals,
    onClickVideo,
  },
) => {
  return (
    <div className='tab-pane active'>
      {listItems.map((elem, index) => {
        return (
          <div key={index} className='conferences-item'>
            <p>
              {formatDateNews(new Date(elem.date).getTime() / 1000)}
            </p>
            <div className='links-wrapper'>
              <div className='link-item' onClick={() => onClickVideo(elem.video[0])}>
                <img className='' src='/assets/images/conferences-video.svg' alt='' />
                <span>{literals.confVideo}</span>
              </div>
              <a href={elem.doc[0]} target='_blank' className='link-item' rel='noopener noreferrer'>
                <img className='' src='/assets/images/conferences-doc.svg' alt='' />
                <span>{literals.docTec}</span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

SecondTab.propTypes = {
  listItems: PropTypes.array.isRequired,
  literals: PropTypes.object.isRequired,
  onClickVideo: PropTypes.func.isRequired,
};

export default SecondTab;
