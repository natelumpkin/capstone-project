import getDateAndTime from "../../utils/getDateAndTime";

const UserInfoCard = ({user, responseType, response}) => {

  let responseVerb;
  if (responseType === 'question') {
    responseVerb = 'asked'
  }
  if (responseType === 'answer') {
    responseVerb = 'answered'
  }

  let responseTimeString;

  if (response.createdAt) {
    responseTimeString = responseVerb + ' ' + getDateAndTime(response.createdAt)
  }

  console.log('user in userinfo card: ', user);
  console.log('response in userInfo card: ', response)
  console.log('responseType in userInfo card: ', responseType)


  return (
    <div className="userinfo-container">
      <div className="time-holder">{responseTimeString}</div>
      <div className="user-info-holder">
        <div className="profile-img-holder">
          {user && user.profileImg && (
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
