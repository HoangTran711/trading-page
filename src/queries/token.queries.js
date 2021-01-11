import { concat, keyBy } from 'lodash'
import { setup } from 'axios-cache-adapter'
import { PRV_TOKEN_ID } from '../constant/token'
import { useQuery } from 'react-query'

const api = setup({
  cache: {
    maxAge: 30 * 1000,
    readOnError: (error) => {
      return error.response.status >= 400 && error.response.status < 600
    },
    clearOnStale: true,
  },
})

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
  }

  return keyBy(concat([PRV], tokensMapped), 'TokenID')
}
export const useFetchToken = () => {
  return useQuery('useFetchToken.name', getTokenList, { refetchOnWindowFocus: false, refetchInterval: 60 * 60 * 60 })
}
