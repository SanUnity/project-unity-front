/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { formatDateNews } from 'utils';
import WideToggle from 'components/UI/WideToggle';
import history from 'store/history';
import FirstTab from './FirstTab';
import SecondTab from './SecondTab';
import './styles.css';

const NEWS_API_URL = 'https://coronavirus.gob.mx/wp-json/wp/v2/posts';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActiveTabIndex: parseInt(props.match.params.activeTab, 10) || 1,
      news: {
        releases: [],
        conferences: [],
      },
      loaded: false,
      newsSelected: {},
      showModal: false,
      showVideo: false,
      videoURL: '',
    };
  }

  componentDidMount() {
    const { showLoading } = this.props;
    showLoading(true);

    axios({
      method: 'GET',
      url: NEWS_API_URL,
    }).then((data) => {
      this.setState({
        news: this.parseNews(data.data),
      }, () => {
        const { news } = this.state;
        let activeView = 1;
        if (!news.releases.length) {
          activeView = 2;
        }

        this.setState({
          currentActiveTabIndex: activeView,
          loaded: true,
        }, () => { showLoading(false); });
      });
    });
  }

  componentWillUnmount() {
    const { showModal, showVideo } = this.state;
    if (showModal || showVideo) {
      if (showModal) history.push('/main/news/1');
      else history.push('/main/news/2');
    }
  }

  parseNews = (rawNews) => {
    const news = {
      releases: [],
      conferences: [],
    };

    rawNews.forEach((n) => {
      if (n.slug.indexOf('conferencia') >= 0) {
        const data = {
          title: n.title.rendered,
          link: n.link,
          date: n.date,
          video: this.getVideoURL(n.content.rendered),
          doc: this.getDocURL(n.content.rendered),
          content: n.content.rendered,
        };

        if (data.video) news.conferences.push(data);
      } else {
        const data = {
          title: n.title.rendered,
          link: n.link,
          date: n.date,
          content: n.content.rendered,
          excerpt: n.excerpt.rendered,
        };
        news.releases.push(data);
      }
    });

    return news;
  }

  setNewSelected = (selected) => {
    this.setState({
      newsSelected: selected,
      showModal: true,
    });
  }

  setVideoSelected = (selected) => {
    this.setState({
      videoURL: selected,
      showVideo: true,
    });
  }

  getVideoURL = (txt) => {
    const youtubeRegExp = new RegExp('https://www.youtube.com/[^"]*', 'g');

    return txt.match(youtubeRegExp);
  }

  getDocURL = (txt) => {
    const pdfRegExp = new RegExp('https://.*.pdf', 'g');

    return txt.match(pdfRegExp);
  }

  renderTab = (index) => {
    const { literals } = this.props;
    const {
      news,
    } = this.state;
    switch (index) {
      case 1: return <FirstTab listItems={news.releases} onClickNews={this.setNewSelected} literals={literals} />;
      case 2: return <SecondTab listItems={news.conferences} onClickVideo={this.setVideoSelected} literals={literals} />;
      default: return <React.Fragment />;
    }
  }

  labelClicked = (index) => {
    this.setState({ currentActiveTabIndex: index });
  };

  closeModal = () => {
    this.setState({
      newsSelected: {},
      showModal: false,
    });
  }

  closeVideoModal = () => {
    this.setState({
      videoURL: '',
      showVideo: false,
    });
  }

  showNewsInModal = () => {
    const { newsSelected } = this.state;

    return (
      <React.Fragment>
        <div className='overlay open' />
        <div className='search-sec-text news-details'>
          <img src='/assets/images/green-arrow.svg' onClick={this.closeModal} alt='' />
          <div className='news-detail-wrapper'>
            <p className='n-title'>{newsSelected.title}</p>
            <div
              className='n-content excerpt'
              dangerouslySetInnerHTML={{ __html: newsSelected.excerpt }}
            />
            <img className='new-image' src='/assets/images/comunication.svg' alt='' />
            <p className='news-date'>
              {formatDateNews(new Date(newsSelected.date).getTime() / 1000)}
            </p>
            <div
              className='n-content'
              dangerouslySetInnerHTML={{ __html: newsSelected.content }}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

  showConferenceVideo = () => {
    const { videoURL } = this.state;
    return (
      <React.Fragment>
        <div className='overlay open'>
          <img className='close-video' src='/assets/images/Close-white.svg' alt='' />
        </div>
        <div className='search-sec-text conference-video' onClick={this.closeVideoModal}>
          <iframe
            title='Conference Video'
            src={videoURL}
            frameBorder='0'
            allowFullScreen
          />
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { literals } = this.props;
    const {
      currentActiveTabIndex,
      showModal,
      showVideo,
      loaded,
    } = this.state;
    return loaded ? (
      <React.Fragment>
        <div className='news-main-wrapper'>
          <WideToggle
            title={literals.title}
            firstLabel={literals.tabLabelFirst}
            secondLabel={literals.tabLabelSecond}
            thirdLabel=''
            activeLabelIndex={currentActiveTabIndex}
            labelClicked={this.labelClicked}
          />
          <section className='news-section'>
            <div className='tab-content'>
              {this.renderTab(currentActiveTabIndex)}
            </div>
          </section>
        </div>

        {showModal && this.showNewsInModal()}
        {showVideo && this.showConferenceVideo()}
      </React.Fragment>
    ) : null;
  }
}
News.displayName = 'News';
News.propTypes = {
  literals: PropTypes.object.isRequired,
  showLoading: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};
export default News;
