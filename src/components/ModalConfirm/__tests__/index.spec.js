import React from 'react';
import { shallow } from 'enzyme';
import ModalConfirm from '..';

const props = {
  cancel: () => {},
  title: 'Random title',
  cancelText: '',
  confirmText: '',
  confirm: () => {},
};

describe('ModalConfirm tests', () => {
  it('renders', () => {
    const wrapper = shallow(<ModalConfirm {...props} />);
    expect(wrapper.find('h4').text()).toEqual('Random title');
  });
});
