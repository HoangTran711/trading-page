import { concat, keyBy } from 'lodash'
import { PRV_TOKEN_ID } from 'constant/token'
import { setup } from 'axios-cache-adapter'
import { FULL_NODE } from 'constants/api'

export const api = setup({
	cache: {
		maxAge: 30 * 1000,
		readOnError: (error) => {
			return error.response.status >= 400 && error.response.status < 600
		},
		clearOnStale: true,
	},
})
async function sendRequest(method, params) {
	const data = {
		jsonrpc: '1.0',
		method: method,
		params: params,
		id: 1,
	}

	return await api.post(FULL_NODE, data)
}

export const getTransactionByTxId = async (txId) => {
	const transaction = await sendRequest('getpdetradestatus', [
		{
			TxRequestIDStr: txId,
		},
	])
	return transaction
}
export const getCustomTokensBalance = (privateKey) => {
	return sendRequest('getlistprivacycustomtokenbalance', [privateKey])
}
export const getNativeTokenBalance = (privateKey) => {
	return sendRequest('getbalancebyprivatekey', [privateKey])
}
export const getTokenList = async () => {
	const tokens = await api.get('https://api-service.incognito.org/ptoken/list')

	const tokensMapped = tokens.data.Result.map((i) => ({
		IsCustom: false,
		Icon: `https://s3.amazonaws.com/incognito-org/wallet/cryptocurrency-icons/32@2x/color/${(
			i.Symbol || i.PSymbol
		).toLowerCase()}@2x.png`,
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
		Icon:
			'https://s3.amazonaws.com/incognito-org/wallet/cryptocurrency-icons/32@2x/color/prv@2x.png',
		Verified: true,
		PDecimals: 9,
		PricePrv: 1,
		PriceUsd: 0,
	}

	return keyBy(concat([PRV], tokensMapped), 'TokenID')
}
