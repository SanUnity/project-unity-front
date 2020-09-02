import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter, Switch, Route } from 'react-router';

Enzyme.configure({ adapter: new Adapter() });

export const SUCCESS_DIV_ID = 'test-success';
export const SUCCESS_DIV = <div id={SUCCESS_DIV_ID} />;

const mockMedia = () => {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};

window.matchMedia = window.matchMedia || mockMedia;

window.onMobileDevice = () => false;

window.sendUserIdentifier = () => {};

window.getBTStatus = () => {};

window.activateBT = () => {};

window.getContacts = () => {};

window.onAndroid = () => {};

window.onIOS = () => {};

window.stopExposedNotifications = () => {};

global.console.error = jest.fn();

export function wrapInRouter(component, routePath) {
  return mount(
    <MemoryRouter initialEntries={['/']}>
      <Switch>
        <Route path='/' exact render={() => component} />
        <Route path={routePath} render={() => SUCCESS_DIV} />
      </Switch>
    </MemoryRouter>,
  );
}
