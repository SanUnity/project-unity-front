import React from 'react';
import PropTypes from 'prop-types';

import { formatDateNews } from 'utils';

/**
 * @name FirstTab
 *
 * @param {array} listItems
 *
 * @returns {JSX}
 */

const FirstTab = ({ literals, listItems, onClickNews }) => {
  const getDate = (date) => {
    const year = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    day = day < 10 ? `0${day}` : day.toString();
    month = month < 10 ? `0${month}` : month.toString();

    return {
      date,
      day,
      month,
      year,
    };
  };

  const groupByDate = (list) => {
    const lGrouped = {};

    list.forEach((l) => {
      const { day, month, year } = getDate(new Date(l.date));
      const strDate = `${year}-${month}-${day}`;

      if (typeof lGrouped[strDate] === 'undefined') {
        lGrouped[strDate] = [];
      }

      lGrouped[strDate].push(l);
    });

    return lGrouped;
  };

  const listGrouped = groupByDate(listItems);

  return (listGrouped && Object.keys(listGrouped).length) ? (
    <div className='tab-pane active'>
      {!listItems.length && <p className='no-elements'>{literals.noNews}</p>}
      {Object.keys(listGrouped).map((date) => {
        const list = listGrouped[date];
        return (
          <React.Fragment key={date}>
            <p className='date-title'>
              {formatDateNews(new Date(date).getTime() / 1000)}
            </p>
            {list.map((elem, index) => {
              return (
                <div
                  key={index}
                  className='releases-item'
                  onClick={() => onClickNews(elem)}
                >
                  <div className='media'>
                    <img
                      className='align-self-center mr-3'
                      src={
                        index % 2 === 0
                          ? '/assets/images/news-img-red.svg'
                          : '/assets/images/news-img-white.svg'
                      }
                      alt=''
                    />
                    <div className='media-body'>
                      <p className='n-title crop-text lines-3'>{elem.title}</p>
                      <img
                        className='n-image'
                        src='/assets/images/chevron-right.svg'
                        alt=''
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  ) /* istanbul ignore next */
    : null; // this never happens...
};

FirstTab.propTypes = {
  literals: PropTypes.object.isRequired,
  listItems: PropTypes.array.isRequired,
  onClickNews: PropTypes.func.isRequired,
};

export default FirstTab;
