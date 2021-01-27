import { concat, keyBy } from 'lodash'
import { setup } from 'axios-cache-adapter'
import { PRV_TOKEN_ID } from '../constant/token'
import { useQuery } from 'react-query'
import { createTokenSearchIndex } from './fulltext'

const api = setup({
  cache: {
    maxAge: 30 * 1000,
    readOnError: (error) => {
      return error.response.status >= 400 && error.response.status < 600
    },
    clearOnStale: true,
  },
})
export const useFetchToken = () => {
  return useQuery('useFetchToken.name', getTokenList, { refetchOnWindowFocus: false, refetchInterval: 60 * 60 * 60 })
}
export const useSearchableTokenList = (...searchFields) => {
  const { data: tokenList } = useFetchToken()
  return useQuery('useSearchableTokenList.name', () => createTokenSearchIndex(Object.values(tokenList), ...searchFields),)
}

export const useSearchableOnlyVerifiedToken = (...searchFields) => {
  const { data: tokenList } = useFetchToken()
  return useQuery(
    'useSearchableOnlyVerifiedToken.name',
    () =>
      createTokenSearchIndex(
        Object.values(tokenList).filter((i) => i.Verified),
        ...searchFields,
      ),
  )
}
export const getTokenList = async () => {
	const tokens = await api.get('https://api-service.incognito.org/ptoken/list')

  const tokensMapped = tokens.data.Result.map((i) => ({
    IsCustom: false,
    Icon: `https://s3.amazonaws.com/incognito-org/wallet/cryptocurrency-icons/32@2x/color/${(i.Symbol || i.PSymbol).toLowerCase()}@2x.png`,
    ...i,
    TokenType: 'pToken',
  }))
	const PRV = {
    TokenID: PRV_TOKEN_ID,
    Name: 'PRV',
    PSymbol: 'pPRV',
    Symbol: 'pPRV',
    IsCustom: false,
    TokenType: 'pToken',
    Icon: 'https://s3.amazonaws.com/incognito-org/wallet/cryptocurrency-icons/32@2x/color/prv@2x.png',
    Verified: true,
    PDecimals: 9,
    PricePrv: 1,
    PriceUsd: 0
  }

  return keyBy(concat([PRV], tokensMapped), 'TokenID')
}
