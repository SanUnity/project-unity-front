/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @name SearchBar
 *
 * @param {string}  label
 * @param {array} listItems
 * @param {array} filters
 * @param {func} itemSelected
 *
 * @returns {JSX}
 */

class SearchBar extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    itemSelected: PropTypes.func,
    initialValue: PropTypes.string,
    onChange: PropTypes.func,
    onShowFilters: PropTypes.func,
  };

  static defaultProps = {
    itemSelected: () => {},
    initialValue: '',
    onChange: () => {},
    onShowFilters: null,
  };

  searchActive = false;

  inputRef = React.createRef();

  constructor(props) {
    super(props);
    const { initialValue } = this.props;
    this.state = {
      inputValue: initialValue,
    };
  }

  componentDidMount() {
    // client presses 'esc' key while modal is opened will close it
    window.addEventListener('keydown', this.keydownListener);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownListener);
  }

  keydownListener = (event) => {
    if (this.searchActive && event.keyCode === 27) {
      this.closeSearchDropdown();
    }
  };

  toggleFilterDropdown = () => {
    document.querySelector('#dropdown').classList.toggle('open');
  };

  openSearchDropdown = () => {
    // document.querySelector('#search-results-container').classList.add('open');
    document.querySelector('#searchOverlayMiddleware').classList.add('open');
    this.searchActive = true;
  };

  closeSearchDropdown = () => {
    /* document
      .querySelector('#search-results-container')
      .classList.remove('open'); */
    document.querySelector('#searchOverlayMiddleware').classList.remove('open');
    this.inputRef.current.blur();
    this.searchActive = false;
  };

  // onClickItem = (item, index) => {
  //   const { itemSelected } = this.props;
  //   this.closeSearchDropdown();
  //   this.setState({ inputValue: item.title });
  //   itemSelected(index);
  // };

  render() {
    const { placeholder, onShowFilters } = this.props;

    const { inputValue } = this.state;
    return (
      <React.Fragment>
        <div
          id='searchOverlayMiddleware'
          onClick={() => this.closeSearchDropdown()}
        />
        <div className='d-se'>
          <div className='searchFilter'>
            <div className='t'>
              <div className='input-group search'>
                <button
                  id='searchBtn'
                  type='button'
                  className='btn btn-secondary btn-search'
                >
                  <img src='/assets/images/Search.svg' alt='' />
                </button>
                <input
                  onChange={(e) => {
                    const { onChange } = this.props;
                    const {
                      target: { value },
                    } = e;

                    const val = value.charCodeAt(value.length - 1);

                    if ((val >= 65 && val <= 90)
                      || (val >= 97 && val <= 122)
                      || (val >= 128 && val <= 154 && val !== 145 && val !== 146)
                      || (val >= 160 && val <= 165)
                      || ([32, 225, 233, 237, 243, 250, 209, 241].indexOf(val) !== -1)
                      || isNaN(val)
                    ) {
                      this.setState({ inputValue: value });
                      onChange(value);
                      return true;
                    }

                    return false;
                  }}
                  id='table_filter'
                  type='text'
                  className='form-control'
                  aria-label='Text input with segmented button dropdown'
                  placeholder={placeholder}
                  // onFocus={() => this.openSearchDropdown()}
                  value={inputValue}
                  autoComplete='off'
                  ref={this.inputRef}
                />
                {onShowFilters !== null && (
                  <div className='input-group-btn'>
                    <button
                      type='button'
                      className='btn btn-filters'
                      onClick={() => {
                        onShowFilters();
                      }}
                    >
                      <img src='/assets/images/Filter.svg' alt='' />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchBar;
