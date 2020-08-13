import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name ListItem
 * Displays icon (left) with text (right)
 *
 * @param {string} imgSrc
 * @param {string} title
 * @param {string} content
 * @param {bool} hasArrow
 *
 * @returns {JSX}
 */
const ListItem = ({
  imgSrc, title, content, hasArrow,
}) => {
  return (
    <div className='col-a-sec'>
      {imgSrc !== '' && (<img src={imgSrc} alt='' />)}
      {
        hasArrow ? (
          <div className='two-s'>
            <h4>{title}</h4>
            <p>{content}</p>
          </div>
        ) : (
          <p>
            {content}
          </p>
        )
      }
    </div>
  );
};

ListItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
  hasArrow: PropTypes.bool,
};

ListItem.defaultProps = {
  title: '',
  hasArrow: false,
};

export default ListItem;
