import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const typeOfStatus = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
  initial: 'INITIAL',
}
class GithubPopularRepos extends Component {
  state = {
    currentRepoList: [],
    activeId: 'ALL',

    status: typeOfStatus.initial,
  }

  componentDidMount() {
    this.apiRequest()
  }

  changeActiveId = id => {
    this.setState({activeId: id}, this.apiRequest)
  }

  apiRequest = async () => {
    this.setState({status: typeOfStatus.loading})
    const {activeId} = this.state
    const api = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(api)

    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      const list = data.popular_repos
      // console.log(list)
      const updatedList = list.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.setState({
        currentRepoList: updatedList,

        status: typeOfStatus.success,
      })
    } else {
      this.setState({status: typeOfStatus.failure})
    }
  }

  renderFinalView = () => {
    const {status} = this.state
    switch (status) {
      case typeOfStatus.success:
        return this.renderSuccessView()

      case typeOfStatus.failure:
        return this.renderFailureView()

      case typeOfStatus.loading:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  renderSuccessView = () => {
    const {currentRepoList} = this.state
    console.log(currentRepoList)
    return (
      <div>
        <ul>
          {currentRepoList.map(eachItem => (
            <RepositoryItem key={eachItem.id} details={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        className="failure-view-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {activeId} = this.state

    return (
      <div>
        <h1>Popular</h1>
        <ul>
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              details={eachItem}
              changeActiveId={this.changeActiveId}
              activeId={activeId}
            />
          ))}
        </ul>
        {this.renderFinalView()}
      </div>
    )
  }
}
export default GithubPopularRepos
