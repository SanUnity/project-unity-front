import React from 'react';
import { shallow } from 'enzyme';
import ShareResults from '..';
import EN from 'i18n/EN';
import { sessionService } from 'redux-react-session';
import Button from 'components/UI/Button';

let wrapper;

const props = {
  user: {
    profiles: [
      {
        pcr: [
          {
            verified: true,
            readed: false,
            resultTest: 1,
          },
        ],
      },
    ],
  },
  literals: EN.en,
  showLoading: jest.fn(),
};

jest.mock('utils/apiFetch', () => jest.fn());

describe('ShareResults', () => {
  beforeAll(() => {
    wrapper = shallow(<ShareResults {...props} />);
  });

  const mockLoadUser = jest.fn();
  sessionService.loadUser = mockLoadUser;

  const mockCheckPCRTests = jest.fn();
  let realCheckPCRTests;
  it('renders and checks PCR tests when mounted', () => {
    expect(wrapper.exists()).toBeTruthy();

    realCheckPCRTests = wrapper.instance().checkPCRTests;
    wrapper.instance().checkPCRTests = mockCheckPCRTests;
    wrapper.instance().componentDidMount();
  });

  it('checks PCR tests', () => {
    // this catches the mocked call, which is triggered once, above
    expect(mockCheckPCRTests).toHaveBeenCalledTimes(1);
    wrapper.instance().checkPCRTests = realCheckPCRTests;
    wrapper.instance().checkPCRTests();

    wrapper.setProps({ ...props, user: { profiles: [{ pcr: null }] } }, () => {
      wrapper.instance().checkPCRTests();
      wrapper.setProps(
        { ...props, user: { profiles: [{ pcr: [{ verified: false }] }] } },
        () => {
          wrapper.instance().checkPCRTests();
        },
      );
    });
  });

  it('calls `apiFetch` via `setAsReaded` function', () => {
    wrapper.instance().setAsReaded({ profileID: 1, id: 1 });
    // dummy test
    // can't assign a jest.fn via another field to test how many times it was called
  });

  it('getContacts function', () => {
    const test = {};
    const shareType = {};
    wrapper.instance().getContacts(test, shareType);
    expect(wrapper.instance().state.test).toEqual(test);
    expect(wrapper.instance().state.shareType).toEqual(shareType);
  });

  it('checkContactsFromLocal function', () => {
    // order important, in order to trigger sorting code blocks
    let contacts = {
      1234567898: 'Mac Daniels',
      1234567896: 'Mdc Daniels',
      1234567899: 'Mbc Daniels',
      1234567897: 'Claire Barnes',
      1234567817: '2Claire Barnes',
      1234567837: '1Claire Barnes',
      1234567827: '3Claire Barnes',
    };
    localStorage.setItem('USRContacts', btoa(JSON.stringify(contacts)));
    localStorage.setItem('USRContactsError', {});
    wrapper.instance().checkContactsFromLocal();

    expect(Object.keys(wrapper.instance().state.contactsList).length).toBe(3);

    // to error on decode
    contacts = {
      1234567874: 'Abdállah Devlin',
    };
    localStorage.setItem('USRContacts', btoa(JSON.stringify(contacts)));
    wrapper.instance().checkContactsFromLocal();
    expect(Object.keys(wrapper.instance().state.contactsList).length).toBe(1);

    // to go through both cases when localStorage items are null
    wrapper.instance().checkContactsFromLocal();
    expect(Object.keys(wrapper.instance().state.contactsList).length).toBe(1);
  });

  const mockGoTo = jest.fn();
  // eslint-disable-next-line no-unused-vars
  let actualGoTo;

  const mockShowInfographic = jest.fn();
  // let actualShowInfographic;

  const mockNativeShare = jest.fn();
  // let actualNativeShare;

  const mockSendNoContactNotification = jest.fn();
  // let actualSendNoContactNotification;

  const mockGetContacts = jest.fn();
  // let actualGetContacts;

  it('shows result', () => {
    actualGoTo = wrapper.instance().goTo;
    wrapper.instance().goTo = mockGoTo;
    wrapper.instance().showInfographic = mockShowInfographic;
    wrapper.instance().nativeShare = mockNativeShare;
    wrapper.instance().sendNoContactNotification = mockSendNoContactNotification;
    wrapper.instance().getContacts = mockGetContacts;
    wrapper.setState(
      { showModal: true, results: [{ id: 1, resultTest: 2 }] },
      () => {
        wrapper.update();
        expect(wrapper.find('img[src$="result_repeat.svg"]').length).toBe(1);
        wrapper.find(Button).at(0).simulate('click', {});
        expect(mockGoTo).toHaveBeenCalledTimes(1);

        wrapper.setState(
          { showModal: true, results: [{ id: 1, resultTest: 0 }] },
          () => {
            wrapper.update();
            expect(wrapper.find('img[src$="result_ok.svg"]').length).toBe(1);
            wrapper.find(Button).at(0).simulate('click', {});
            expect(mockGoTo).toHaveBeenCalledTimes(2);

            wrapper.setState({ showModal: true, results: [{ id: 1 }] }, () => {
              expect(mockGoTo).toHaveBeenCalledTimes(2);

              wrapper.setState(
                {
                  showModal: true,
                  results: [{ id: 1, resultTest: 1 }],
                  positiveSteps: 2,
                },
                () => {
                  wrapper.update();
                  expect(wrapper.find('.local-share-wrapper').length).toBe(1);

                  wrapper.find('a').first().simulate('click', {});
                  wrapper.find(Button).at(0).simulate('click', {});
                  wrapper.find('.no-contact').first().simulate('click', {});

                  expect(mockShowInfographic).toHaveBeenCalledTimes(1);
                  expect(mockNativeShare).toHaveBeenCalledTimes(1);
                  expect(mockSendNoContactNotification).toHaveBeenCalledTimes(
                    1,
                  );

                  wrapper.find(Button).at(1).simulate('click', {});
                  expect(wrapper.instance().state.positiveSteps).toEqual(3);

                  wrapper.setState(
                    {
                      showModal: true,
                      results: [{ id: 1, resultTest: 1 }],
                      positiveSteps: 3,
                    },
                    () => {
                      wrapper.update();

                      wrapper.find(Button).at(0).simulate('click', {});
                      wrapper.find('.no-contact').first().simulate('click', {});

                      expect(mockGetContacts).toHaveBeenCalledTimes(1);
                      expect(
                        mockSendNoContactNotification,
                      ).toHaveBeenCalledTimes(2);

                      wrapper.setState(
                        {
                          showModal: true,
                          results: [{ id: 1, resultTest: 1 }],
                          positiveSteps: 4,
                        },
                        () => {
                          wrapper.update();

                          wrapper.find('span').at(2).simulate('click', {});
                          wrapper.find('span').at(4).simulate('click', {});
                          wrapper.find(Button).at(0).simulate('click', {});

                          expect(mockGoTo).toHaveBeenCalledTimes(5);
                        },
                      );
                    },
                  );
                },
              );
            });
          },
        );
      },
    );
  });

  it('goToStep2', () => {
    // wrapper.instance().goToStep2();
  });

  it('clears interval on `componentWillUnmount`', () => {
    jest.useFakeTimers();
    wrapper.instance().componentWillUnmount();
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });
});
