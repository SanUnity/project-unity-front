import React from 'react';
import EN from 'i18n/EN';
import { shallow } from 'enzyme';
// import FirstTab from '../components/FirstTab';
// import SecondTab from '../components/SecondTab';
import history from 'store/history';
import News from '../components';
import FirstTab from '../components/FirstTab';
import SecondTab from '../components/SecondTab';

let wrapper;

// don't care about HOC logic
jest.mock('..', () => <></>);

const props = {
  literals: EN.en.news,
  match: { params: { activeTab: 'exposed' } },
  showLoading: jest.fn(),
};

describe('News tests', () => {
  beforeAll(() => {
    wrapper = shallow(<News {...props} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('parseNews', () => {
    const rawNews = [
      {
        slug: ['conferencia'],
        title: {
          rendered: '',
        },
        link: '',
        date: '',
        content: {
          rendered: '',
        },
        excerpt: {
          rendered: '',
        },
      },
    ];
    const resultNews = {
      releases: [],
      conferences: [],
    };
    expect(wrapper.instance().parseNews(rawNews)).toEqual(resultNews);

    resultNews.conferences = [
      {
        content: '',
        date: '',
        doc: null,
        link: '',
        title: '',
        video: {},
      },
    ];

    wrapper.instance().getVideoURL = jest.fn().mockReturnValue({});
    expect(wrapper.instance().parseNews(rawNews)).toEqual(resultNews);

    rawNews[0].slug = [];
    resultNews.conferences = [];
    resultNews.releases = [
      {
        content: '',
        date: '',
        excerpt: '',
        link: '',
        title: '',
      },
    ];
    expect(wrapper.instance().parseNews(rawNews)).toEqual(resultNews);
  });

  it('setNewSelected', () => {
    const news = {};
    wrapper.instance().setNewSelected(news);
    expect(wrapper.state().newsSelected).toEqual(news);
  });

  it('setVideoSelected', () => {
    const video = {};
    wrapper.instance().setVideoSelected(video);
    expect(wrapper.state().newsSelected).toEqual(video);
  });

  it('renderTab', () => {
    wrapper.instance().renderTab(0);
    wrapper.setState({ loaded: true }, () => {
      wrapper.update();
      expect(wrapper.find(FirstTab).length).toBe(1);
      wrapper.setState({ currentActiveTabIndex: 2 }, () => {});
      wrapper.update();
      expect(wrapper.find(SecondTab).length).toBe(1);
    });
  });

  it('labelClicked', () => {
    wrapper.instance().labelClicked(1);
    expect(wrapper.state().currentActiveTabIndex).toEqual(1);
  });

  it('closeModal', () => {
    wrapper.instance().closeModal();
    expect(wrapper.state().showModal).toEqual(false);
  });

  it('closeVideoModal', () => {
    wrapper.instance().closeVideoModal();
    expect(wrapper.state().showVideo).toEqual(false);
  });

  it('componentWillUnmount', () => {
    history.push = jest.fn();
    wrapper.setState({ showModal: true }, () => {
      wrapper.instance().componentWillUnmount();
      wrapper.setState({ showModal: false, showVideo: true }, () => {
        wrapper.instance().componentWillUnmount();
        wrapper.setState({ showModal: false, showVideo: false }, () => {
          wrapper.instance().componentWillUnmount();
          expect(history.push).toHaveBeenCalledTimes(2);
        });
      });
    });
  });
});
