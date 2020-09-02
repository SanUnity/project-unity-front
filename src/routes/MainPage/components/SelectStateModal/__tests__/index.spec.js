import React from 'react';
import { shallow } from 'enzyme';
import SelectStateModal from '..';
import EN from 'i18n/EN';
import SelectInput from 'components/SelectInput';
import { sessionService } from 'redux-react-session';

const props = {
  literals: EN.en.welcome,
  user: { id: 1, state: null },
  showLoading: jest.fn(),
};

let mockApiFetch = Promise.resolve([
  { id: 1, name: 'first' },
  { id: 2, name: 'second' },
]);

jest.mock('utils/apiFetch', () => {
  return jest.fn(() => mockApiFetch);
});

describe('SelectStateModal tests', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<SelectStateModal {...props} />);
  });

  let actualShowModal;
  it('renders and updates component when user is changed', () => {
    expect(wrapper.exists()).toBeTruthy();
    actualShowModal = wrapper.instance().showModal;
    wrapper.instance().showModal = jest.fn();
    wrapper.setProps({ user: { id: 2, state: null } }, () => {
      wrapper.setProps({ user: { id: 1, state: {} } }, () => {
        wrapper.setProps({ user: { id: 1, state: {} } }, () => {
          expect(wrapper.instance().showModal).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  it('shows modal', () => {
    wrapper.instance().showModal = actualShowModal;
    wrapper.instance().showModal();
  });

  it('handleChange sets state', () => {
    wrapper.instance().handleChange('value', 'name');
    expect(wrapper.instance().state.name).toEqual('value');
    wrapper.setState({ stateSelected: 'randomState' });
  });

  it('SelectInput triggers `handleChange` upon `onChange` event', () => {
    wrapper.find(SelectInput).simulate('change', { target: { value: true } });
    expect(wrapper.instance().state.stateSelected).toEqual(true);
  });

  it('handleStateSelected', () => {
    sessionService.loadUser = jest.fn(() => Promise.resolve({
      profiles: [
        { id: 1, pcr: [{ id: 1 }, { id: 2 }] },
        { id: 2, pcr: [{ id: 2 }] },
      ],
    }));
    sessionService.saveUser = jest.fn(() => Promise.resolve({
      profiles: [
        { id: 1, pcr: [{ id: 1 }, { id: 2 }] },
        { id: 2, pcr: [{ id: 3 }] },
      ],
    }));
    wrapper.instance().handleStateSelected();
  });

  it('handleStateSelected v2', () => {
    mockApiFetch = Promise.reject(Error('error'));
    wrapper.instance().handleStateSelected();
    expect(props.showLoading).toHaveBeenCalledTimes(5);
  });
});
