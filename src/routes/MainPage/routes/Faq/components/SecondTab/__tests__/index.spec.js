import React from 'react';
import { shallow } from 'enzyme';
import SecondTab from '..';
import ListItem from 'components/UI/ListItem';

it('renders same number of list item components as quantity of list items', () => {
  const listItems = [];
  for (let i = 0; i < 3; i += 1) {
    listItems.push(
      {
        title: 'title',
        text: 'text',
        img: '/assets/images/HelpInACircle.svg',
      },
    );
  }
  const wrapper = shallow(<SecondTab listItems={listItems} />);

  expect(wrapper.find(ListItem).length).toBe(listItems.length);
});
