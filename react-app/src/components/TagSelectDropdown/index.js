import TagInfoCard from "../TagInfoCard"

import './TagSelectDropdown.css'

// Displays a drop-down menu of tag selections, filtering out
// already selected tags

const TagSelectDropdown = ({selectedTags, setTagChoice, setTagSearch, tags, addTag, setTagDropdown}) => {

  console.log('tags before filtering: ', tags)

  console.log('selected tags: ', selectedTags)

  const selectedTagNames = selectedTags.map(tag => tag?.tag)

  console.log('selected tags: ', selectedTagNames)

  tags = tags.filter(tag => !selectedTagNames.includes(tag.tag))

  tags = tags.slice(0,6)

  console.log('tags after filtering: ', tags)

  return (
    <div id="tag-dropdown-parent">
      <div id="tag-dropdown">
        {tags.map(tag => (
          <TagInfoCard setTagSearch={setTagSearch} setTagChoice={setTagChoice} addTag={addTag} setTagDropdown={setTagDropdown} key={tag.tag} tag={tag}/>
        ))}
      </div>
    </div>
  )
}

export default TagSelectDropdown;
