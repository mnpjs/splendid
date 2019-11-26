/**
 * A Plain component.
 * The component that will update already server-rendered element
 * of the same name (github-badge) with the accurate number of
 * stars on GitHub.
 * @example
 */
export default class GithubBadge {
  /**
   * @param {!HTMLAnchorElement} el
   */
  constructor(el) {
    this.el = el
  }
  static get plain() {
    return true
  }
  render({ owner, name }) {
    const url = `https://api.github.com/repos/${owner}/${name}`
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText)
      if (xhr.status != 200) {
        console.log('GitHub responded with status %s: %s (%s)',
          xhr.status, resp.message, resp.documentation_url)
        return
      }
      const { 'stargazers_count': stargazers_count, 'description': description } = resp
      this.el.title = description
      const s = this.el.querySelector('[data-stargazers]')
      s.textContent = s.textContent.replace(/\d+/, stargazers_count)
    }
    xhr.send()
  }
}
