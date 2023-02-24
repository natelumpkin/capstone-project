
import { NavLink, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useEffect, useState } from "react";

import './PageChooser.css'

const PageChooser = ({ numQuestions, size, location }) => {

  const [ pageList, setPageList ] = useState([])
  const [ numPages, setNumPages ] = useState(null)
  const [ lastPage, setLastPage ] = useState(null)
  const [ firstPage, setFirstPage ] = useState(null)
  const [newPath, setNewPath] = useState(null)

  console.log('newpath state: ',newPath)

  const useQuery = () => {
    const { search } = useLocation()
    // console.log(search)
    return useMemo(() => new URLSearchParams(search), [search])
  }

  let query = useQuery()

  const { search, pathname } = useLocation()

  // we need to redefine pathname to include all the search parameters except for page, so the new page just gets appended at the end
  // so we basically need to reconstruct a new URL path from the old one?
  // so we take in all the searchParams
  // if page exists, remove it
  // re add them to the pathname
  // console.log(search.split('&'))
  const constructNewPath = (pathname, search) => {
    let searchParams = search.slice(1,search.length).split('&')
    let res = searchParams.filter(el => !el.includes('page'))
    // console.log(res)
    let newPath = pathname;
    if (res.length) newPath += '?'
    for (let searchParam of res) {
      newPath += searchParam
    }
    // console.log(newPath)
    return newPath
  }
  console.log('new path: ', constructNewPath(pathname,search))
  // the easiest way to do this would be to just add the new page in there

  // questions?page=2 => questions?page=3
  //questions?tab=newest&page=2 => questions?tab=newest&page=3
  //questions?tab=newest&page=2 => questions?tab=newest

  const createPageLinkFromNumber = (pageNumber) => {
    // console.log('inside function: ', search, pathname)
    let searchParams = search.split('&')
    let res = searchParams.filter(el => !el.includes('page'))
    console.log('search: ', searchParams)
    // console.log('split params: ', searchParams)
    // returns a new valid path
    let pageParam
    if (pageNumber > 1) {
      pageParam = `page=${pageNumber}`
    }
    let basePath = constructNewPath(pathname,search)
    console.log('base path:' , basePath)
    if (!pageParam) {
      return basePath
    } else {
      if (res.length) {
        // if there are other search params
        return basePath += '&' + pageParam
      } else {
        // if there are no other search params
        return basePath += '?' + pageParam
      }
    }
    // if there are no OTHER search params && pageParam > 1
      //, append ?page=pageNumber
      // if !pageParam --> simply return the basepath
    // if there ARE other search params && pageParam > 1, append &page=pageNumber
  }

  console.log('page1: ',createPageLinkFromNumber(1))
  console.log('page 50: ',createPageLinkFromNumber(50))




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
    let currPages = []

    if (!size) size = 50
    setNumPages(Math.ceil(numQuestions / size))
    if (currentPage <= 4 && currentPage >= 1) {
      if (numPages > 5) {
        setPageList([1,2,3,4,5])
        setLastPage(numPages)
      } else {
        for (let i = 1; i <= numPages; i++) {
          currPages.push(i)
          setPageList(currPages)
        }
      }
    } else {
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

    setNewPath(constructNewPath(pathname,search))
  },[numQuestions, numPages, search])

  // console.log('first page?: ', firstPage)
  // console.log('last page: ', lastPage)
  // console.log('numPages: ', numPages)




  // console.log('pathname: ', pathname)

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
          // <NavLink to={Number(query.get("page")) - 1 > 1 ? `${pathname}?page=${Number(query.get("page")) - 1}` : pathname}>
            <NavLink to={createPageLinkFromNumber(Number(query.get("page")) - 1)}>
            <div className="paginator-square">
              Prev
            </div>
          </NavLink>
        )}
        {firstPage && (
          <>
          <div className="paginator-square">
            <NavLink to={newPath}>1</NavLink>
          </div>
          <div className="paginator-dots">...</div>
          </>
        )}
        {pageList.map(pageNumber => (
          // <NavLink key={pageNumber} to={pageNumber === 1 ? newPath : `${newPath}&page=${pageNumber}`}>
            <NavLink key={pageNumber} to={createPageLinkFromNumber(pageNumber)}>
              <div id={`pagelink-${pageNumber}`} className="paginator-square" key={pageNumber}>
                {pageNumber}
              </div>
            </NavLink>
        ))}
        {lastPage && (
          <>
          <div className="paginator-dots">...</div>
          {/* <NavLink to={`${pathname}?page=${lastPage}`}> */}
          <NavLink to={createPageLinkFromNumber(lastPage)}>
            <div className="paginator-square">
              {lastPage}
            </div>
          </NavLink>
          </>
        )}
        {Number(query.get("page")) < numPages && numPages > 1 && (
          <NavLink to={!query.get("page") ? createPageLinkFromNumber(2) : createPageLinkFromNumber(Number(query.get("page")) + 1)}>
            <div className="paginator-square">
              Next
            </div>
          </NavLink>
        )}
      </div>
    )
  }
}

export default PageChooser;
