import React from 'react';
import { shallow } from 'enzyme';
import WideToggle from '..';

const props = {
  title: 'title',
  firstLabel: 'firstLabel',
  secondLabel: 'secondLabel',
  thirdLabel: 'thirdLabel',
  activeLabelIndex: 1,
  labelClicked: jest.fn(),
  showArrowBack: true,
  showProfile: true,
  showTabs: true,
};

const wrapper = shallow(<WideToggle {...props} />);

describe('WideToggle tests', () => {
  it('switches active class when toggle switched', () => {
    wrapper.setProps({ activeLabelIndex: 1 }, () => {
      expect(wrapper.find('.nav-link').at(0).hasClass('active')).toBeTruthy();
      expect(wrapper.find('.nav-link').at(1).hasClass('active')).toBeFalsy();
    });

    wrapper.setProps({ activeLabelIndex: 2 }, () => {
      expect(wrapper.find('.nav-link').at(0).hasClass('active')).toBeFalsy();
      expect(wrapper.find('.nav-link').at(1).hasClass('active')).toBeTruthy();
    });

    wrapper.setProps({ activeLabelIndex: 3 }, () => {
      expect(wrapper.find('.nav-link').at(0).hasClass('active')).toBeFalsy();
      expect(wrapper.find('.nav-link').at(1).hasClass('active')).toBeFalsy();
      expect(wrapper.find('.nav-link').at(2).hasClass('active')).toBeTruthy();
    });
  });

  it('triggers `labelClicked` prop upon clicking on tabs', () => {
    wrapper.find('.nav-link').at(0).simulate('click', {});
    wrapper.find('.nav-link').at(1).simulate('click', {});
    wrapper.find('.nav-link').at(2).simulate('click', {});

    expect(props.labelClicked).toHaveBeenCalledTimes(3);
  });

  it('triggers `goBack` and `goProfile` functions upon clicking on images', () => {
    wrapper.find('img').at(0).simulate('click', {});
    wrapper.find('img').at(1).simulate('click', {});

    props.goBack = jest.fn();
    props.goProfile = jest.fn();

    // need another instance due to this being a functional component
    const wrapper2 = shallow(<WideToggle {...props} />);
    wrapper2.find('img').at(0).simulate('click', {});
    wrapper2.find('img').at(1).simulate('click', {});

    expect(props.goBack).toHaveBeenCalledTimes(1);
    expect(props.goProfile).toHaveBeenCalledTimes(1);
  });
});
