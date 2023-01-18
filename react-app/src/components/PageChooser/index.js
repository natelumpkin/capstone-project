
import { NavLink, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useEffect, useState } from "react";

import './PageChooser.css'

const PageChooser = ({ numQuestions, size, location }) => {

  const [ pageList, setPageList ] = useState([])
  const [ numPages, setNumPages ] = useState(null)
  const [ lastPage, setLastPage ] = useState(null)
  const [ firstPage, setFirstPage ] = useState(null)

  const useQuery = () => {
    const { search } = useLocation()
    // console.log(search)
    return useMemo(() => new URLSearchParams(search), [search])
  }

  let query = useQuery()

  const { search, pathname } = useLocation()

  // what does this thing need to do?
  // it needs to divide numQuestions up by size to get the number of pages
  // and then have a number of links, each of which fetches the particular page
  // each one will be a link? the default fetch on allQuestions will fetch the first page
  // and the rest will link to deeper fetches

  // furthermore we only want to display the first five pages, as well as the last, and
  // a link to the next page and prev page

  // so we need an array of page numbers

  useEffect(() => {

    let currentPage = Number(query.get("page"))
    setFirstPage(null)
    setLastPage(null)

    if (!currentPage) currentPage = 1

    if (!size) size = 50
    setNumPages(Math.ceil(numQuestions / size))
    if (currentPage <= 4 && currentPage >= 1) {
      setPageList([1,2,3,4,5])
      setLastPage(numPages)
    } else {
      let currPages = []
      for (let i = currentPage - 2; i <= currentPage + 2 && i <= numPages; i++) {
        currPages.push(i)
      }
      setPageList(currPages)
      if (currPages[0] !== 1) setFirstPage(true)
      console.log()
      if (currPages[currPages.length - 1] !== numPages) {
        setLastPage(numPages)
      }
    }
  },[numQuestions, numPages, search])

  console.log('first page?: ', firstPage)
  console.log('last page: ', lastPage)
  console.log('numPages: ', numPages)




  console.log('pathname: ', pathname)

  useEffect(() => {

    // adds and removes class from navLink depending on current location

    let currentPage = query.get("page")

    // console.log('hello from useeffect')

    // ... only render prev, current selection of 5, last, and next

    if (!currentPage) currentPage = 1

    // console.log('currentpage: ', currentPage)
    let prevNavs = document.getElementsByClassName('current-page')
    // console.log('prevNavs: ', prevNavs)
    for (let element of prevNavs) {
      element.classList.remove('current-page')
    }
    let activeNav = document.getElementById(`pagelink-${currentPage}`)
    // console.log('active nav on first render: ', activeNav)
    if (activeNav) activeNav.classList.add('current-page')
  },[search, numQuestions, pageList])

  if (numQuestions <= size) {
    return null
  } else {
    return (
      <div className="page-links-holder">
        {query.get("page") && (
          <NavLink to={Number(query.get("page")) - 1 > 1 ? `${pathname}?page=${Number(query.get("page")) - 1}` : pathname}>Prev</NavLink>
        )}
        {firstPage && (
          <>
          <NavLink to={pathname}>1</NavLink>
          <div>...</div>
          </>
        )}
        {pageList.map(pageNumber => (
          <div key={pageNumber}>
            <NavLink key={pageNumber} id={`pagelink-${pageNumber}`} to={pageNumber === 1 ? pathname : `${pathname}?page=${pageNumber}`}>
              {pageNumber}
            </NavLink>
          </div>
        ))}
        {lastPage && (
          <>
          <div>...</div>
          <NavLink to={`${pathname}?page=${lastPage}`}>{lastPage}</NavLink>
          </>
        )}
        {Number(query.get("page")) < numPages && numPages > 1 && (
          <NavLink to={!query.get("page") ? `${pathname}?page=2` : `${pathname}?page=${Number(query.get("page")) + 1}`}>Next</NavLink>
        )}
      </div>
    )
  }
}

export default PageChooser;
