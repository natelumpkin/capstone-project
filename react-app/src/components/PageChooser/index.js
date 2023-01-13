
import { NavLink } from "react-router-dom";

const PageChooser = ({ numQuestions, size }) => {

  // what does this thing need to do?
  // it needs to divide numQuestions up by size to get the number of pages
  // and then have a number of links, each of which fetches the particular page
  // each one will be a link? the default fetch on allQuestions will fetch the first page
  // and the rest will link to deeper fetches

  // furthermore we only want to display the first five pages, as well as the last, and
  // a link to the next page and prev page

  // so we need an array of page numbers

  if (!size) size = 5

  let numPages = Math.ceil(numQuestions / size)

  let pageList = []

  for (let i = 1; i < numPages + 1; i++) {
    pageList.push(i)
  }


  return (
    <div>
      <h1>Hello from PageChooser!</h1>
      {pageList.map(pageNumber => (
        <div>
          <NavLink to={pageNumber === 1 ? '/questions' : `/questions?page=${pageNumber}`}>
            {pageNumber}
          </NavLink>
        </div>
      ))}
    </div>
  )
}

export default PageChooser;
