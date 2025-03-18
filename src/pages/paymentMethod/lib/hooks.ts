import { useApi } from '@common/hooks/api'
import { RootStateContext } from '@contexts/RootStateContext'
import { useContext, useEffect, useState } from 'react'

/** Хук подгружает данные о способе оплаты с сервера при первом рендеринге */
export const usePaymentMethodLoader = () => {
	const { setPaymentMethod } = useContext(RootStateContext)
	const { getPaymentMethodFromApi } = useApi()

	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		getPaymentMethodFromApi({})
			.then(res => {
				setPaymentMethod(res)
			})
			.finally(() => setLoading(false))
	}, [])

	return {
		loading,
	}
}
