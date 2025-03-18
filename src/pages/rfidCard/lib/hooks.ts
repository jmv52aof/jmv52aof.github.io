import { useApi } from '@common/hooks/api'
import { RootStateContext } from 'contexts/RootStateContext'
import { useContext, useEffect, useState } from 'react'

const useRfidCardLoader = () => {
	const { setRfidCard } = useContext(RootStateContext)
	const { getRfidCardFromApi } = useApi()

	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		getRfidCardFromApi({})
			.then(res => {
				setRfidCard(res)
			})
			.finally(() => setLoading(false))
	}, [])

	return {
		loading,
	}
}

export { useRfidCardLoader }
