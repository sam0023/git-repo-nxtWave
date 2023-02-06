// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {details, changeActiveId, activeId} = props
  const {id, language} = details
  const changeId = () => {
    changeActiveId(id)
  }
  const css =
    activeId === id ? 'active-language-container' : 'language-container'
  return (
    <li className={css}>
      <button type="button" onClick={changeId}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
