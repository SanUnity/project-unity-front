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
  const renderLevel = (level) => {
    switch (level) {
      case 1: return <span className='level'>{literals.level1}</span>;
      case 2: return <span className='level'>{literals.level2}</span>;
      case 3: return <span className='level'>{literals.level3}</span>;
      default: return <span />;
    }
  };
  /* const renderDistance = (distance) => {
    if (distance) {
      return (
        <span>{parseDistance(distance)}</span>
      );
    }
    return <React.Fragment />;
  }; */

  let distances = 0;
  const hospitalsGruoped = {};
  listItems.map((hospital) => {
    let suburb = hospital.suburb;
    if (suburb) {
      const suburbSplited = suburb.split('');
      if (suburbSplited.length > 0 && suburbSplited[0] === ' ') {
        suburbSplited.shift();
      }
      suburb = suburbSplited.join('');
    }

    if (!suburb) {
      suburb = literals.noColony;
    }

    suburb = suburb.trim();

    if (typeof hospitalsGruoped[suburb] === 'undefined') {
      hospitalsGruoped[suburb] = {};
      hospitalsGruoped[suburb].list = [hospital];
      hospitalsGruoped[suburb].totalDistance = 0;
    } else {
      hospitalsGruoped[suburb].list.push(hospital);
    }

    hospitalsGruoped[suburb].totalDistance += (hospital.distance) ? hospital.distance : 0;

    distances += hospitalsGruoped[suburb].totalDistance;

    return 0;
  });

  return (
    <div id='map-sec-b' className='tab-pane active'>
      {Object.keys(hospitalsGruoped).length === 0 ? (
        <div className='no-results'>{literals.noResults}</div>
      ) : (
        Object.keys(hospitalsGruoped).sort((a, b) => {
          if (distances) return hospitalsGruoped[a].totalDistance > hospitalsGruoped[b].totalDistance ? 1 : -1;

          return a > b ? 1 : -1;
        }).map((suburb, i) => {
          return (
            <React.Fragment key={i}>
              <h4 className='suburbName'>{suburb}</h4>
              {hospitalsGruoped[suburb].list.sort((a, b) => {
                if (distances) return a.distance > b.distance ? 1 : -1;

                return a.hospital > b.hospital ? 1 : -1;
              }).map((item, index) => {
                return (
                  <div
                    className='map-a-sec hast-se'
                    key={index}
                    onClick={() => itemSelected(item.hospitalID)}
                  >
                    <div className='m-ap-text'>
                      {renderLevel(item.level)}
                      <p className={`bld is-level${item.level}`}>
                        <span className='level-color-item' />
                        {item.hospital}
                      </p>
                      <p className='desc'>
                        {item.address}
                        {/* renderDistance(item.distance) */}
                      </p>
                    </div>
                    <img src='/assets/images/map-r.svg' alt='' />
                  </div>
                );
              })}
            </React.Fragment>
          );
        })
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
