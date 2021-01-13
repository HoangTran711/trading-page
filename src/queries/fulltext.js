import Fuse from 'fuse.js'

export const createTokenSearchIndex = (tokenLists, ...searchFields) => {
  const fuseIndex = new Fuse(tokenLists, { keys: searchFields, useExtendedSearch: true })
  return fuseIndex
}
