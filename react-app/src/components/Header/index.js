import { NavLink } from "react-router-dom"

import NavBar from "../Navbar/NavBar"
import logo from '../../images/logo.png'

import './Header.css'

const Header = () => {
  return (
    <div id="header-container">
      <div id="header">
        <div id="logo-container">
        <NavLink className={'logo-link'} to='/' exact={true}>
          <img className='logo' src={logo}/>
          crud <strong>overgrowth</strong>
        </NavLink>
        </div>
        <NavBar/>
      </div>
    </div>
  )
}

export default Header;
