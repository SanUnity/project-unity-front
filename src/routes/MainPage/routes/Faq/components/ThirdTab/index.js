import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../../../../../../components/UI/ListItem';

/**
 * @name SecondTab
 *
 * @param {array} listItems
 *
 * @returns {JSX}
 */

const ThirdTab = (
  {
    listItems,
  },
) => {
  return (
    <div className='tab-pane active'>
      <br />
      {
        listItems.map((elem) => {
          return <ListItem imgSrc='' title={elem.title} content={elem.text} key={elem.title} hasArrow />;
        })
      }
    </div>
  );
};

ThirdTab.propTypes = {
  listItems: PropTypes.array.isRequired,
};

export default ThirdTab;
