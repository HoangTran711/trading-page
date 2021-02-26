import { QueryCache } from 'react-query'

export const queryCache = new QueryCache({
	onError: (err) => {
		console.log(err)
	},
})

export const getFromCache = (key) => {
	const data = queryCache.getQueryData(key)
	if (!data) {
		return null
	}
	return data
}
