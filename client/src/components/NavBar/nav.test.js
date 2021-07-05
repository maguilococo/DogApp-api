import React from 'react';
import { NavLink } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from './index';
import logo from '../../img/logo.svg'
import s from './index.module.css';

configure({adapter: new Adapter()});

describe('<NavBar />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<NavBar />)
  })

  it('Should render 3 <NavLink />', () => {
    expect(wrapper.find(NavLink)).toHaveLength(3);
  });
  // respects order
  it('The first NavLink should be the logo and redirect to "/".', () => {
    expect(wrapper.find(NavLink).at(0).prop('to')).toEqual('/');
    expect(wrapper.find(NavLink).at(0).contains(<img className={s.logo} src={logo} alt='logo' />)).toEqual(true);
  });
  it('The second NavLink should be Home and redirect to "/breeds".', () => {
    expect(wrapper.find(NavLink).at(1).prop('to')).toEqual('/breeds');
    expect(wrapper.find(NavLink).at(1).text()).toEqual('Home');
  });
  it('The third NavLink should be "Add your own" and redirect to "/addBreed"', () => {
    expect(wrapper.find(NavLink).at(2).prop('to')).toEqual('/addBreed');
    expect(wrapper.find(NavLink).at(2).text()).toEqual('Add your own');
  });
})