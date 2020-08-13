import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter, Switch, Route } from 'react-router';

Enzyme.configure({ adapter: new Adapter() });

export const SUCCESS_DIV_ID = 'test-success';
export const SUCCESS_DIV = <div id={SUCCESS_DIV_ID} />;

export function wrapInRouter(component, routePath) {
  return mount(
    <MemoryRouter initialEntries={['/']}>
      <Switch>
        <Route path='/' exact render={() => component} />
        <Route
          path={routePath}
          render={() => SUCCESS_DIV}
        />
      </Switch>
    </MemoryRouter>,
  );
}
