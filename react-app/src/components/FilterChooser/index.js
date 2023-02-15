import { NavLink } from "react-router-dom";

const FilterChooser = () => {

  // each button is a link that brings you to a new URL
  // that is questions?tab={order}
  // we also need to append search params to the end

  // but I don't think we need to worry about those yet

  return (
    <div>
      <NavLink to='/questions'>Newest</NavLink>
      <NavLink to='/questions?tab=recent'>Recent</NavLink>
      <NavLink to='/questions?unanswered=true'>Unanswered</NavLink>
      <NavLink to='/questions?tab=score'>Score</NavLink>
    </div>
  )
}

export default FilterChooser;
