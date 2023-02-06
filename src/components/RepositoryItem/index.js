import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = details
  return (
    <li>
      <img src={avatarUrl} alt={name} />
      <h1>{name}</h1>
      <div className="stats-container">
        <img
          className="stats-img"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{`${starsCount}`}</p>
      </div>
      <div className="stats-container">
        <img
          className="stats-img"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{`${forksCount}`}</p>
      </div>
      <div className="stats-container">
        <img
          className="stats-img"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{`${issuesCount}`}</p>
      </div>
    </li>
  )
}
export default RepositoryItem
