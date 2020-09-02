import React from 'react';
import { mount } from 'enzyme';
import FormContainer from '..';
import StepProvider from 'routes/FormTest/providers/stepProvider';
import utils from 'utils';
import EN from 'i18n/EN';
import { Provider } from 'react-redux';
import Input from 'components/UI/Input';
import FormField from '../../FormField';

let inputValue = '';
let wrapper;

const mockSubmit = jest.fn();

const mockData = {
  name: 'test',
};

describe('FormContainer', () => {
  let store;

  beforeAll(() => {
    store = utils.test.initMockStore({
      i18n: { literals: EN.en },
    });
    wrapper = mount(
      <Provider store={store}>
        <StepProvider data={mockData} updateData={(obj) => { inputValue = obj.name; }}>
          <FormContainer onSubmit={mockSubmit}>
            <FormField name='name' component={Input} />
          </FormContainer>
        </StepProvider>
      </Provider>,
    );
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('submits the form data if form is valid', () => {
    wrapper.find('form').props().onSubmit({
      preventDefault: jest.fn(),
    });
    expect(mockSubmit).toBeCalledWith(mockData);
  });


  it('updates data in step provider', () => {
    const mockValue = 'test2';
    wrapper.find('input').simulate('change', { target: { value: mockValue } });
    expect(inputValue).toBe(mockValue);
  });


  it('does not submit the form if the form is invalid', () => {
    const mockSubmit2 = jest.fn();
    const mountedWrapper = mount(
      <Provider store={store}>
        <StepProvider data={mockData}>
          <FormContainer onSubmit={mockSubmit2}>
            <FormField
              name='name'
              validate={[value => (value.length < 6 ? 'error' : '')]}
              component={Input}
            />
          </FormContainer>
        </StepProvider>
      </Provider>,
    );


    const originalDQS = document.querySelector;
    document.querySelector = jest.fn(() => ({
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
      },
    }));


    mountedWrapper.find('form').props().onSubmit({
      preventDefault: jest.fn(),
    });

    expect(mockSubmit2).not.toBeCalled();
    expect(document.querySelector).toBeCalled();
    document.querySelector = originalDQS;
    mountedWrapper.unmount();
  });
});
