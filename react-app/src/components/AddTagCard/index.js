import './AddTagCard.css'

const AddTagCard = ({tag, setTag}) => {
  return (
    <div className="tag-name-card">
      {tag.tag}
      <button type="button" onClick={() => setTag('')}><i class="fa-solid fa-xmark"></i></button>
    </div>
  )
}

export default AddTagCard;
