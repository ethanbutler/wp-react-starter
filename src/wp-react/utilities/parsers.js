export const parseTerms = (data) => {
  const taxonomies = Object.getOwnPropertyNames(data)
  return taxonomies.reduce((acc, taxonomy) => {
    const terms = data[taxonomy].map(({id, name, slug}) => ({id, name, slug}))
    acc[taxonomy] = terms
    return acc
  }, {})
}

export const parseAuthors = (data) => {
  return data.map(({id, name, slug, avatar_urls}) => ({ id, name, slug, avatar_urls }))
}
