
import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import * as sessionActions from '../../store/session'
import logo from '../../images/logo.png'

import './NavBar.css'

const NavBar = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const signInDemoUser = () => {
    dispatch(sessionActions.login("demouser1@email.com", "password"));
    history.push('/questions')
  }

  const currentUser = useSelector(state => state.session.user)

  return (
    <nav id="header-links-holder">


        {!currentUser && (
          <ul id="header-links">
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                <button className='login session-button'>Login</button>
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                <button className='signup session-button'>Sign Up</button>
              </NavLink>
            </li>
            <li>
              <button onClick={signInDemoUser} className='demo session-button'>Demo</button>
            </li>
          </ul>
        )}
        {currentUser && (
        <li id="logout-button">
          <LogoutButton />
        </li>
        )}
    </nav>
  );
}

export default NavBar;
