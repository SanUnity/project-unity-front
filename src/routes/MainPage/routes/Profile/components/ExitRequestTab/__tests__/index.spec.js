import React from 'react';
import { shallow } from 'enzyme';
import ExitRequestTab from '..';
import EN from 'i18n/EN';
import { sessionService } from 'redux-react-session';
import Input from 'components/UI/Input';
import ModalExitRequest from '../ModalExitRequest';

let wrapper;
const props = {
  literals: EN.en.profile,
  profile: {
    id: 1,
    name: 'name',
    home: '',
    exitRequests: [
      {
        id: 1,
        motive: '',
        destiny: '',
        url: '',
        timestamp: new Date(),
      },
      {
        id: 2,
        motive: '',
        destiny: '',
        url: '',
        timestamp: new Date(),
      },
    ],
  },
  showLoading: jest.fn(),
};

// eslint-disable-next-line prefer-const
let mockApiFetch = Promise.resolve({ name: 'name' });

jest.mock('utils/apiFetch', () => {
  return jest.fn(() => mockApiFetch);
});

describe('ExitRequestTab tests', () => {
  beforeAll(() => {
    wrapper = shallow(<ExitRequestTab {...props} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders v2', () => {
    props.showNewExitRequest = true;
    const wrapper2 = shallow(<ExitRequestTab {...props} />);
    expect(wrapper2.state().modalActive).toEqual(true);
  });

  it('deleteExitRequest', () => {
    sessionService.loadUser = jest.fn(() => Promise.resolve({
      profiles: [
        {
          id: 1,
          pcr: [{ id: 1 }, { id: 2 }],
          exitRequests: [{ id: 1, timestamp: new Date() }],
        },
        {
          id: 2,
          pcr: [{ id: 2 }],
          exitRequests: [{ id: 2, timestamp: new Date() }],
        },
      ],
    }));

    wrapper.instance().deleteExitRequest(1);

    expect(wrapper.state().modalDeleteId).toEqual('');
  });

  it('deleteExitRequest error', () => {
    sessionService.loadUser = jest.fn(() => Promise.reject(Error('error')));
    wrapper.instance().deleteExitRequest(1);
    expect(props.showLoading).toHaveBeenCalledTimes(3);
  });

  it('renderExitRequests', () => {
    wrapper.instance().renderExitRequests();

    expect(wrapper.find('.exit-request-card-wrapper').length).toBe(2);

    wrapper.setProps({ firstRequest: { id: 1 } }, () => {
      wrapper.instance().renderExitRequests();

      wrapper.find('.exit-request-delete').first().simulate('click', {});

      expect(wrapper.state().modalDeleteId).toEqual(1);

      wrapper.setProps(
        {
          profile: {
            id: 1,
            name: 'name',
            home: 'home',
            exitRequests: [
              {
                id: 1,
                motive: '',
                destiny: '',
                url: '',
                timestamp: new Date(),
              },
              {
                id: 2,
                motive: '',
                destiny: '',
                url: '',
                timestamp: new Date(),
              },
            ],
          },
        },
        () => {
          wrapper.instance().renderExitRequests();
        },
      );
    });
  });

  it('renders v3', () => {
    wrapper.setProps({ profile: {} }, () => {
      expect(wrapper.find('.exit-request-wrapper').length).toBe(1);

      wrapper.find('.request').first().simulate('click', {});
      expect(wrapper.state().modalActive).toEqual(true);

      wrapper.setProps(
        { profile: { exitRequests: [{ id: 1, timestamp: new Date() }] } },
        () => {
          wrapper.update();
          wrapper.find('.green-text').first().simulate('click', {});
          expect(wrapper.state().modalActive).toEqual(true);
        },
      );
    });
  });
});

let wrapper3;
const props2 = {
  literals: EN.en.profile,
  close: jest.fn(),
  showLoading: jest.fn(),
  profile: { id: 1 },
};

let mockApiFetch2 = Promise.resolve({});

jest.mock('utils/apiFetch', () => {
  return jest.fn(() => mockApiFetch2);
});

describe('ModalExitRequest tests', () => {
  beforeAll(() => {
    wrapper3 = shallow(<ModalExitRequest {...props2} />);
  });

  it('renders', () => {
    expect(wrapper3.exists()).toBeTruthy();

    expect(wrapper3.instance().isValid()).toEqual(false);

    wrapper3.setState({ motive: 'motive', destiny: 'destiny' }, () => {
      expect(wrapper3.instance().isValid()).toEqual(true);
    });
  });

  it('handleNewExitRequest v1', () => {
    sessionService.loadUser = jest.fn(() => Promise.resolve({
      profiles: [
        { id: 1, pcr: [{ id: 1 }, { id: 2 }] },
        {
          id: 2,
          pcr: [{ id: 2 }],
          exitRequests: [{ id: 2, timestamp: new Date() }],
        },
      ],
    }));

    wrapper3.instance().handleNewExitRequest();

    expect(props2.showLoading).toHaveBeenCalledTimes(1);
  });

  it('handleNewExitRequest v2', () => {
    sessionService.loadUser = jest.fn(() => Promise.resolve({
      profiles: [
        {
          id: 1,
          pcr: [{ id: 1 }, { id: 2 }],
          exitRequests: [{ id: 1, timestamp: new Date() }],
        },
        {
          id: 2,
          pcr: [{ id: 2 }],
          exitRequests: [{ id: 2, timestamp: new Date() }],
        },
      ],
    }));
    wrapper3.instance().handleNewExitRequest();
    expect(props2.showLoading).toHaveBeenCalledTimes(3);
  });

  it('handleNewExitRequest error', () => {
    mockApiFetch2 = Promise.reject(Error('API is down'));
    wrapper3.instance().handleNewExitRequest();
    expect(props2.showLoading).toHaveBeenCalledTimes(5);
  });

  it('handles `onChange` on Input elements', () => {
    wrapper3
      .find(Input)
      .at(0)
      .simulate('change', { target: { value: 'value' } });
    expect(wrapper3.state().motive).toEqual('value');

    wrapper3
      .find(Input)
      .at(1)
      .simulate('change', {
        target: { value: 'value' },
        preventDefault: jest.fn(),
      });
    expect(wrapper3.state().destiny).toEqual('value');
  });
});
