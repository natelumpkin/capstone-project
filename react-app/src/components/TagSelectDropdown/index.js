
import { useEffect } from "react"
import TagInfoCard from "../TagInfoCard"

import './TagSelectDropdown.css'

// Displays a drop-down menu of tag selections, filtering out
// already selected tags

const TagSelectDropdown = ({selectedTags, setTagChoice, setTagSearch, tags, addTag, setTagDropdown}) => {


  const selectedTagNames = selectedTags.map(tag => tag?.tag)


  tags = tags.filter(tag => !selectedTagNames.includes(tag.tag))

  tags = tags.slice(0,6)


  return (
    <div id="tag-dropdown-parent">
      <div id="tag-holder"
      onClick={setTagDropdown(true)}>
        <div id="tag-dropdown">
          {tags.map(tag => (
            <TagInfoCard setTagSearch={setTagSearch} setTagChoice={setTagChoice} addTag={addTag} setTagDropdown={setTagDropdown} key={tag.tag} tag={tag}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TagSelectDropdown;
