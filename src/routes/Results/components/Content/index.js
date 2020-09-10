/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/es';

import { ROUTE_PATH as PARENT_ROUTE_PATH } from 'routes';
import Button from '../../../../components/UI/Button';

/**
 * @name formatDate
 * formats miliseconds into desired format
 *
 * @param {number} miliseconds
 *  */
const formatDate = (miliseconds) => {
  if (!miliseconds) {
    // eslint-disable-next-line
    miliseconds = Math.floor(new Date().getTime() / 1000);
  }

  // eslint-disable-next-line
  const date = new moment(miliseconds * 1000);

  return date.locale('es').format('DD/MM/YYYY - hh:mm a');
};

/**
 * @name Content
 *
 * @param {Object} literals
 * @param {array} listItems
 * @param {boolean} resultsOk
 *
 * @returns {JSX}
 */

const Content = ({
  literals, route, result, data, modal,
}) => {
  const lastTest = formatDate(result.timestamp);
  return (
    <section className='toda'>
      <div className='container-fluid' style={modal ? { paddingTop: '60px' } : { paddingTop: '0px' }}>
        <div className='row'>
          <div className='col-12'>
            <div className='toda-txt'>
              <h3>{data.title}</h3>
              <h5>
                {data.subtitle}
                {data.extraSubtitle && (
                  <React.Fragment>
                    <br />
                    <br />
                    {data.extraSubtitle}
                  </React.Fragment>
                )}
                {(data.call911 || data.showHealthUnits) && (
                  <div className='principalButtonsContainer'>
                    {data.call911 && (
                      <div className='emergencyCall primaryButton'>
                        <a href='tel:911' className='btn'>
                          {literals.call911}
                        </a>
                      </div>
                    )}
                    {data.showHealthUnits && (
                      <div className={`text-center ${data.healthUnitsClassName}`}>
                        <Button
                          onClick={() => route.push(
                            `${PARENT_ROUTE_PATH.MAIN_PAGE}/centros-de-salud/${data.showHealthUnits}`,
                            null,
                          )}
                          label={literals.healthUnits}
                        />
                      </div>
                    )}
                  </div>
                )}
              </h5>
            </div>
            <div className='toda-three-image'>
              <p>
                {data.secondTitle}
              </p>

              {/* <div className='three-im-txt'>
                {listItems.map((elem) => {
                  return (
                    <div className='usa-la-ev' key={elem.text}>
                      <img src={elem.img} alt='' />
                      <p>{elem.text}</p>
                    </div>
                  );
                })}
              </div> */}
              <div className='recomentations-list'>
                <div className='list'>
                  {data.recomendations.map((elem, index) => {
                    return (
                      <div className='listItem' key={index}>
                        <div className='numberContainer'><span className='number'>{index + 1}</span></div>
                        <div
                          className='textContainer'
                          dangerouslySetInnerHTML={{ __html: elem }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              {data.showMoreButton && (
                <div className={`text-center ${data.moreButtonClassName}`}>
                  <Button
                    onClick={() => route.push(
                      `${PARENT_ROUTE_PATH.MAIN_PAGE}/faq/faq`,
                      null,
                    )}
                    label={literals.buttonLabel}
                  />
                </div>
              )}
              <div className='si-text text-center'>
                {data.showMessage && <p>{literals.symptomsChange}</p>}
                {data.showCall && <p dangerouslySetInnerHTML={{ __html: literals.emergency }} />}
                {data.showCallEmergency && <p dangerouslySetInnerHTML={{ __html: literals.emergencyOnly }} />}
              </div>
              <div className='top-text-bdr'>
                <div className='top-in-txt nmo'>
                  <p>{literals.testDate}</p>
                  <p>{lastTest}</p>
                </div>
                {result.folio && (
                  <div className='top-in-txt opd nmo'>
                    <p>{literals.folioNumber}</p>
                    <p className='bold-text-c'>{result.folio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Content.propTypes = {
  literals: PropTypes.object.isRequired,
  result: PropTypes.object,
  route: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  modal: PropTypes.bool,
};

Content.defaultProps = {
  result: {},
  modal: false,
};

export default Content;
