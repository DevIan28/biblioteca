const KEY = 'favBooks:v1'
export const loadFavorites = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
}
export const saveFavorites = (list) => localStorage.setItem(KEY, JSON.stringify(list))
