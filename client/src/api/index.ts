export const fetchDynamicsProfession = () => {
  return fetch('http://darkbrotherhood.pythonanywhere.com/api/v1/professions/dynamic/')
    .then(data => data.json())
}

export const fetchPopularityProfession = (trend) => {
  return fetch(`http://darkbrotherhood.pythonanywhere.com/api/v1/professions/popularity/?trend=${trend}`)
    .then(data => data.json())
}