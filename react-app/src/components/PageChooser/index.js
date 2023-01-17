
import { NavLink, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useEffect } from "react";

import './PageChooser.css'

const PageChooser = ({ numQuestions, size, location }) => {

  // what does this thing need to do?
  // it needs to divide numQuestions up by size to get the number of pages
  // and then have a number of links, each of which fetches the particular page
  // each one will be a link? the default fetch on allQuestions will fetch the first page
  // and the rest will link to deeper fetches

  // furthermore we only want to display the first five pages, as well as the last, and
  // a link to the next page and prev page

  // so we need an array of page numbers

  if (!size) size = 10

  let numPages = Math.ceil(numQuestions / size)

  let pageList = []

  for (let i = 1; i < numPages + 1; i++) {
    pageList.push(i)
  }

  const useQuery = () => {
    const { search } = useLocation()
    // console.log(search)
    return useMemo(() => new URLSearchParams(search), [search])
  }

  let query = useQuery()
  const { search, pathname } = useLocation()

  console.log('pathname: ', pathname)

  useEffect(() => {

    // adds and removes class from navLink depending on current location

    let currentPage = query.get("page")

    if (!currentPage) currentPage = 1

    let prevNavs = document.getElementsByClassName('current-page')
    console.log('prevNavs: ', prevNavs)
    for (let element of prevNavs) {
      element.classList.remove('current-page')
    }
    let activeNav = document.getElementById(`pagelink-${currentPage}`)
    if (activeNav) activeNav.classList.add('current-page')
  },[search])


    return (
      <div className="page-links-holder">
        {query.get("page") && (
          <NavLink to={Number(query.get("page")) - 1 > 1 ? `${pathname}?page=${Number(query.get("page")) - 1}` : pathname}>Prev</NavLink>
        )}
        {pageList.map(pageNumber => (
          <div key={pageNumber}>
            <NavLink key={pageNumber} id={`pagelink-${pageNumber}`} to={pageNumber === 1 ? pathname : `${pathname}?page=${pageNumber}`}>
              {pageNumber}
            </NavLink>
          </div>
        ))}
        {Number(query.get("page")) < numPages && numPages > 1 && (
          <NavLink to={!query.get("page") ? `${pathname}?page=2` : `${pathname}?page=${Number(query.get("page")) + 1}`}>Next</NavLink>
        )}
      </div>
    )
}

export default PageChooser;
