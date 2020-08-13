/* eslint-disable indent */
/* eslint-disable no-confusing-arrow */
import React from 'react';
import PropTypes from 'prop-types';
// import { parseDistance } from 'utils';
/**
 * @name List
 *
 * @param {Object} literals
 * @param {array} listItems
 * @param {func} itemSelected
 *
 * @returns {JSX}
 */

const List = ({
  literals, listItems, itemSelected,
}) => {
  const renderList = (list) => {
    return list.sort(({ properties: { entidad_nombre: nameA } }, { properties: { entidad_nombre: nameb } }) => {
      return nameA > nameb ? 1 : -1;
    }).map(({ properties, data }, index) => {
      return (
        <div
          className='map-a-sec hast-se'
          key={index}
          onClick={() => itemSelected(data.id)}
        >
          <div className='m-ap-text'>
            <p className={`bld is-level-${data.status}`}>
              <span className='level-color-item' />
              {properties.entidad_nombre}
            </p>
          </div>
          <img src='/assets/images/map-r.svg' alt='' />
        </div>
      );
    });
  };

  const favorites = listItems.filter(it => it.data.favorite);
  const otherItems = listItems.filter(it => !it.data.favorite);

  return (
    <div id='map-sec-b' className='tab-pane active municipalities-list-wrapper'>
      {listItems.length === 0 ? (
        <div className='no-results'>{literals.noResults}</div>
      ) : (
        <React.Fragment>
          {favorites.length > 0 && (
            <React.Fragment>
              <h4 className='suburbName'>{literals.favorites}</h4>
              {renderList(favorites)}
            </React.Fragment>
          )}
          {otherItems.length > 0 && (
            <React.Fragment>
              <h4 className='suburbName'>{literals.states}</h4>
              {renderList(otherItems)}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

List.propTypes = {
  literals: PropTypes.object.isRequired,
  listItems: PropTypes.array,
  itemSelected: PropTypes.func.isRequired,
};

List.defaultProps = {
  listItems: [],
};

export default List;
