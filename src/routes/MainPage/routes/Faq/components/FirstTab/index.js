import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../../../../../../components/UI/ListItem';

/**
 * @name FirstTab
 *
 * @param {array} listItems
 *
 * @returns {JSX}
 */

const FirstTab = ({ listItems }) => {
  return (
    <div className='tab-pane active'>
      <br />
      {listItems.map((elem) => {
        return (
          <ListItem imgSrc={elem.img} content={elem.text} key={elem.img} />
        );
      })}
    </div>
  );
};

FirstTab.propTypes = {
  listItems: PropTypes.array.isRequired,
};

export default FirstTab;
