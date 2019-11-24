export default function Pages ({ splendid: { pages, page } }) {
  return (<ul className="AjaxNav">
    {pages.map(({
      title, menu = title, url, menuUrl = url, file,
    }) => {
      const active = page.file == file
      return (<li className={active ? 'Active' : ''}>
        <a data-file={file} href={menuUrl}>{menu}</a>
      </li>)
    }
    )}
  </ul>)
}