import './AddTagCard.css'

const AddTagCard = ({tag, setTag}) => {
  return (
    <div className="tag-name-card">
      {tag.tag}
      <button type="button" onClick={() => setTag('')}>X</button>
    </div>
  )
}

export default AddTagCard;
