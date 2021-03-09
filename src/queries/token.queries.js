import { useQuery, useMutation } from 'react-query'
import { createTokenSearchIndex } from './fulltext'
import { getTokenList, getTransactionByTxId } from 'services/trading/wallet'

export const useFetchToken = () => {
	return useQuery('useFetchToken.name', getTokenList, {
		refetchOnWindowFocus: false,
		refetchInterval: false,
	})
}
export const useSearchableTokenList = (...searchFields) => {
	const { data: tokenList } = useFetchToken()
	return useQuery('useSearchableTokenList.name', () =>
		createTokenSearchIndex(Object.values(tokenList), ...searchFields)
	)
}

export const useSearchableOnlyVerifiedToken = (...searchFields) => {
	const { data: tokenList } = useFetchToken()
	return useQuery('useSearchableOnlyVerifiedToken.name', () =>
		createTokenSearchIndex(
			Object.values(tokenList).filter((i) => i.Verified),
			...searchFields
		)
	)
}
export const useGetTradeDetail = () => {
	const hisTrade = JSON.parse(localStorage.getItem('his_trade'))
	const txIds = hisTrade?.map((trade) => trade.txId)
	return useMutation(() => getTransactionByTxId(txIds), {
		onSuccess: () => {},
	})
}
