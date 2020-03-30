import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App Tests', () => {
  it('renders a div container', () => {
    const wrapper = shallow(<App />);
    const div = <div className="app" />;
    expect(wrapper.contains(div)).toEqual(true);
  });
});
