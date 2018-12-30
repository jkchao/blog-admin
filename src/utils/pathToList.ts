export function urlToList(url: string) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map(
    (urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`
  );
}
