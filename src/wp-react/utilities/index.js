const parseTerms = (data) => {
  const taxonomies = Object.getOwnPropertyNames(data)
  return taxonomies.reduce((acc, taxonomy) => {
    const terms = data[taxonomy].map(term => {
      const {
        id,
        name,
        slug
      } = term
      return { id, name, slug }
    })

    acc[taxonomy] = terms
    return acc
  }, {})
}

const parseAuthors = (data) => {
  return data.map(author => {
    const {
      id,
      name,
      slug,
      avatar_urls
    } = author
    return { id, name, slug, avatar_urls }
  })
}

export {
  parseTerms,
  parseAuthors
}
