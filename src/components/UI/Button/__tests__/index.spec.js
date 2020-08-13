import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '..';
import { BrowserRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useParams: jest.fn(),
    useHistory: jest.fn(),
  };
});

describe('Button UI Component', () => {
  it('renders', () => {
    const wrapper = shallow(<Button label='OK' />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders button with custom label', () => {
    const wrapper = shallow(<Button label='custom label' />);
    expect(wrapper.find('button').text()).toBe('custom label');
  });

  it('renders disabled button', () => {
    const wrapper = shallow(<Button disabled label='custom label' />);
    expect(wrapper.find('button').props().disabled).toBeTruthy();
  });

  it('renders link element when href attribute is present', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Button label='OK' href='route' />
      </BrowserRouter>,
    );
    expect(wrapper.find('a').props().href).toBe('/route');
  });
});
