/**
 * @param {Object} props
 * @param {Splendid} props.splendid
 */
export default function Pages({ splendid: { pages, page: { key } } }) {
  const menuPages = pages.filter(({ dir, index }) => {
    if (!dir) return true
    if (index) return true // only dir index pages
  })
  return (<ul className="AjaxNav">
    {menuPages.map(({
      title, menu = title, url, menuUrl = url, file, key: k,
    }) => {
      const active = k == key
      return (<li className={active ? 'Active' : ''}>
        <a data-file={file} href={menuUrl}>{menu}</a>
      </li>)
    }
    )}
  </ul>)
}

/**
 * @typedef {import('splendid')} Splendid
 */