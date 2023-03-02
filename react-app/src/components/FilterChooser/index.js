import { NavLink } from "react-router-dom";

import './FilterChooser.css'

const FilterChooser = () => {

  // each button is a link that brings you to a new URL
  // that is questions?tab={order}
  // we also need to append search params to the end

  // but I don't think we need to worry about those yet

  // when we click, we need to remove active from any active elements
  // and add it to the one we just clicked

  const toggleActive = (e) => {
    const filters = document.getElementsByClassName("filter-link")
    for (let link of filters) {
      link.classList.remove("active-filter")
    }
    const curr = e.target
    curr.classList.add("active-filter")
  }

  return (
    <div id="filter-chooser">
      <NavLink onClick={(e) => toggleActive(e)} className="filter-link border-left" id="newest" to='/questions' exact={true}>Newest</NavLink>
      <NavLink onClick={(e) => toggleActive(e)} className="filter-link" id="recent" to='/questions?tab=recent'>Recent Activity</NavLink>
      <NavLink onClick={(e) => toggleActive(e)} className="filter-link" id="unanswered" to='/questions?unanswered=true'>Unanswered</NavLink>
      <NavLink onClick={(e) => toggleActive(e)} id="score" className='border-right filter-link' to='/questions?tab=score'>High Score</NavLink>
    </div>
  )
}

export default FilterChooser;
