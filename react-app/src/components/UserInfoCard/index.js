const UserInfoCard = ({user, responseType}) => {

  let responseVerb;
  if (responseType === 'question') {
    responseVerb = 'asked'
  }
  if (responseType === 'answer') {
    responseType = 'answered'
  }

  return (
    <div className="userinfo-container">
      <div className="time-holder">Hello from User Info Card</div>
      <div className="user-info-holder">
        <div className="profile-img-holder">
          {user.profileImg && (
            <img src={user.profileImg}/>
          )}
          {!user.profileImg && (
            <i className="fa-solid fa-user"></i>
          )}
        </div>
        <div className="username-holder">
          <p>{user.username}</p>
        </div>
      </div>
    </div>
  )
}

export default UserInfoCard;
