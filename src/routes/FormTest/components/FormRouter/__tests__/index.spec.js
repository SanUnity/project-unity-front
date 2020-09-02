import React from 'react';
import FormRouter from '..';
import { getFormConfigurationByMunicipality } from 'utils';
import { mount } from 'enzyme';
import { BrowserRouter, Switch } from 'react-router-dom';
import FormRouteStep from '../FormRouteStep';
import FormStep from '../../FormStep';


jest.mock('../../FormStep', () => () => <></>);

let wrapper;

const LOCAL_MUNICIPALITY = localStorage.getItem('CONF_MUNICIPALITY');

const formTestConf = getFormConfigurationByMunicipality(LOCAL_MUNICIPALITY);

const props = {
  formTestConf,
  match: {
    url: '',
  },
};
describe('FormRouter', () => {
  beforeAll(() => {
    wrapper = mount(
      <BrowserRouter>
        <Switch>
          <FormRouter {...props} />
        </Switch>
      </BrowserRouter>,
    );
  });

  afterAll(() => {
    wrapper.unmount();
  });
  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});


describe('FormRouteStep', () => {
  const steps = formTestConf.reduce((acc, subSteps) => {
    const arraySubRoutes = [];

    subSteps.forEach((step, i) => {
      if (Object.keys(step).length) {
        arraySubRoutes.push({
          path: `/${i}`,
          component: FormStep,
          exact: true,
          header: false,
        });
      }
    });

    acc.push(arraySubRoutes);

    return acc;
  }, []);

  beforeAll(() => {
    wrapper = mount(
      <BrowserRouter>
        <Switch>
          <FormRouteStep {...props} match={{ url: '/form-test' }} step={1} steps={steps} />
        </Switch>
      </BrowserRouter>,
    );
  });

  afterAll(() => {
    wrapper.unmount();
  });


  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
