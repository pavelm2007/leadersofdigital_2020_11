const host = '0.0.0.0:5000'
// const host = 'darkbrotherhood.pythonanywhere.com'

export const fetchDynamicsProfession = (query = '') => {
    let url = `//${host}/api/v1/professions/dynamic/`
    if (!!query) {
        url = `${url}?${query}`
    }
    return fetch(url).then(data => data.json())
}

export const fetchPopularityProfession = (trend) => {
    return fetch(`//${host}/api/v1/professions/popularity/?trend=${trend}`).then(data => data.json())
}

export const fetchProfession = (trend) => {
    return fetch(`//${host}/api/v1/professions/`).then(data => data.json())
}

export const fetchSkills = (query) => {
    return fetch(`//${host}/api/v1/professions/skills/?${query}`).then(data => data.json())
}

