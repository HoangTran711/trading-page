import { useQuery } from 'react-query'
import {
	getCustomTokensBalance,
	getNativeTokenBalance,
} from 'services/trading/wallet'

export const useGetCustomTokensBalance = (privateKey) => {
	return useQuery(
		['useGetCustomTokensBalance.name'],
		() => getCustomTokensBalance(privateKey),
		{
			refetchInterval: 7000,
		}
	)
}
export const useGetNativeTokenBalance = (privateKey) => {
	return useQuery(
		['useGetNativeTokenBalance.name'],
		() => getNativeTokenBalance(privateKey),
		{
			refetchInterval: 7000,
		}
	)
}
