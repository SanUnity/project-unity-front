import React from 'react';
import { shallow } from 'enzyme';
import FirstTab from '..';
import ListItem from 'components/UI/ListItem';

it('renders same number of list item components as quantity of list items', () => {
  const listItems = [];
  for (let i = 0; i < 3; i += 1) {
    listItems.push(
      {
        text: 'item',
        img: `/assets/images/faq/faq_${i + 1}.svg`,
      },
    );
  }
  const wrapper = shallow(<FirstTab listItems={listItems} />);

  expect(wrapper.find(ListItem).length).toBe(listItems.length);
});
