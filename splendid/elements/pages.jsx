/**
 * @param {Object} props
 * @param {Splendid} props.splendid
 */
export default function Pages({ splendid: { pages, page: { key } } }) {
  return (<ul className="AjaxNav">
    {pages.map(({
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