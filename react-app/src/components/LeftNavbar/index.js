import { NavLink } from "react-router-dom"

import './LeftNavbar.css'

const LeftNavBar = () => {
  return (
    <div id="left-navbar">
      <NavLink activeClassName="leftnav-active" className={"left-navlink"} exact={true} to="/">Home</NavLink>
      <NavLink activeClassName="leftnav-active" className={"left-navlink"} to="/questions" exact={true}>Questions</NavLink>
      <NavLink activeClassName="leftnav-active" className={"left-navlink"} to="/tags">Tags</NavLink>
      <NavLink activeClassName="leftnav-active" className={"left-navlink"} to="/about">About</NavLink>
    </div>
  )
}

export default LeftNavBar;
