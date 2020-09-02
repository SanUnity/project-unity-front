import React from 'react';
import EN from 'i18n/EN';
import { shallow } from 'enzyme';
import FullTerms from 'routes/Signup/components/FullTerms';
import BTStatus from '../components';

let wrapper;

// don't care about HOC logic
jest.mock('..', () => <></>);

const props = {
  literals: EN.en.btstatus,
};

describe('BTStatus tests', () => {
  beforeAll(() => {
    wrapper = shallow(<BTStatus {...props} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders with `localStatus` from localStorage', () => {
    localStorage.setItem('BTStatus', '1');
    const wrapper2 = shallow(<BTStatus {...props} />);
    expect(wrapper2.exists()).toBeTruthy();
  });

  it('componentDidMount init', () => {
    wrapper.setState({ onCompatibleDevice: true }, () => {});
  });

  const mockSetViewFromStatus = jest.fn();
  let actualSetViewFromStatus;

  it('componentDidMount', () => {
    actualSetViewFromStatus = wrapper.instance().setViewFromStatus;
    wrapper.instance().setViewFromStatus = mockSetViewFromStatus;
    wrapper.instance().componentDidMount();
    expect(mockSetViewFromStatus).toHaveBeenCalledTimes(1);
  });

  it('getStatusFromLocalStorage', () => {
    wrapper.instance().getStatusFromLocalStorage();

    expect(wrapper.state().status).toEqual(1);

    // trigger all cases
    localStorage.setItem('BTStatus', '1');
    wrapper.instance().getStatusFromLocalStorage();

    localStorage.removeItem('BTStatus');
    wrapper.instance().getStatusFromLocalStorage();
  });

  it('setViewFromStatus', () => {
    wrapper.instance().setViewFromStatus = actualSetViewFromStatus;
    // default
    wrapper.instance().setViewFromStatus();

    wrapper.setState({ status: 1 }, () => {
      wrapper.instance().setViewFromStatus();
      expect(wrapper.state().title).toEqual(EN.en.btstatus.titleActive);
      wrapper.setState({ status: 2 }, () => {
        wrapper.instance().setViewFromStatus();
        expect(wrapper.state().title).toEqual(EN.en.btstatus.titleInactive);
        wrapper.setState({ status: 3 }, () => {
          wrapper.instance().setViewFromStatus();
          // just break;
          expect(wrapper.state().title).toEqual(EN.en.btstatus.titleInactive);
          wrapper.setState({ status: 4 }, () => {
            wrapper.instance().setViewFromStatus();
            expect(wrapper.state().title).toEqual(EN.en.btstatus.titleInactive);
            wrapper.setState({ status: 5 }, () => {
              wrapper.instance().setViewFromStatus();
              // just break;
              expect(wrapper.state().title).toEqual(
                EN.en.btstatus.titleInactive,
              );
            });
          });
        });
      });
    });
  });

  it('activateService', () => {
    window.activateBT = jest.fn();
    window.requestBT = jest.fn();
    window.onAndroid = jest.fn().mockReturnValue(false);
    window.onIPhone = jest.fn().mockReturnValue(true);

    wrapper.instance().activateService();

    expect(wrapper.state().showIOSSteps).toEqual(true);

    window.onIPhone = jest.fn().mockReturnValue(false);
    wrapper.instance().activateService();

    wrapper.setState({ status: 4 }, () => {
      wrapper.instance().activateService();
      expect(wrapper.state().showIOSSteps).toEqual(true);

      window.onAndroid = jest.fn().mockReturnValue(true);
      wrapper.setState({ status: 2 }, () => {
        wrapper.instance().activateService();
        expect(window.requestBT).toHaveBeenCalledTimes(1);
        wrapper.setState({ status: 3 }, () => {
          wrapper.instance().activateService();
          expect(window.activateBT).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  it('getImageByStatus', () => {
    wrapper.setState({ status: 0 }, () => {
      wrapper.instance().getImageByStatus();
      expect(wrapper.find('img[src$="en_off_ios.png"]').length).toBe(1);

      window.onAndroid = jest.fn().mockReturnValue(true);
      wrapper.setState({ status: 4 }, () => {
        wrapper.instance().getImageByStatus();
        expect(
          wrapper.find('img[src$="notifications_off_android.png"]').length,
        ).toBe(1);
      });
    });
  });

  it('getActionByStatus', () => {
    wrapper.setState({ status: 3, showIOSSteps: true }, () => {
      window.onIPhone = jest.fn().mockReturnValue(true);
      wrapper.instance().getActionByStatus();
      // expect(wrapper.find(Button).length).toBe(1);
    });
  });

  it('getInformationModalContent', () => {
    wrapper.setState({ infoActive: 'bt', showInformationModal: true }, () => {
      wrapper.instance().getInformationModalContent();
      expect(wrapper.find('.bt-information').length).toBe(1);

      wrapper.setState({ infoActive: 'protocols' }, () => {
        wrapper.instance().getInformationModalContent();
        expect(wrapper.find('.protocols-information').length).toBe(1);

        wrapper.find('a').first().simulate('click', {});
        expect(wrapper.state().handleShowFullTerms).toEqual(true);

        wrapper.setState({ infoActive: 'something non existant' }, () => {
          wrapper.instance().getInformationModalContent();
          expect(wrapper.find('.bt-information').length).toBe(0);
          expect(wrapper.find('.protocols-information').length).toBe(0);
        });
      });
    });
  });

  it('showInformationModal', () => {
    const infoActive = {};
    wrapper.instance().showInformationModal(infoActive);
    expect(wrapper.state().infoActive).toEqual(infoActive);
    expect(wrapper.state().showInformationModal).toEqual(true);
  });

  it('handles click events', () => {
    wrapper.setState({ onCompatibleDevice: true }, () => {
      wrapper.instance().showInformationModal = jest.fn();
      wrapper.find('.p-info-description').at(0).simulate('click', {});
      wrapper.find('.p-info-description').at(1).simulate('click', {});
      expect(wrapper.instance().showInformationModal).toHaveBeenCalledTimes(2);

      window.onIOS = jest.fn().mockReturnValue(true);
      wrapper.setState({ onCompatibleDevice: false }, () => {
        expect(wrapper.find('p').length).toBe(3);
      });
    });

    wrapper.find('img[src$="green-arrow.svg"]').at(0).simulate('click', {});
    expect(wrapper.state().showIOSSteps).toEqual(false);

    wrapper.find('img[src$="green-arrow.svg"]').at(0).simulate('click', {});
    expect(wrapper.state().showInformationModal).toEqual(false);

    wrapper.find(FullTerms).first().simulate('close', {});
    expect(wrapper.state().handleShowFullTerms).toEqual(false);
  });

  it('clears interval on `componentWillUnmount`', () => {
    jest.useFakeTimers();
    wrapper.instance().componentWillUnmount();
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });
});
