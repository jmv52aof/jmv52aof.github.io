import { useApi } from '@common/hooks/api'
import { RfidCardForm } from '@common/types/rfidCards'
import { useState } from 'react'

/** Хук предоставляет обработчик привязки карт */
const useRfidCardAddHandler = () => {
	const { attachRfidCardFromApi } = useApi()

	const [loading, setLoading] = useState<boolean>(false)

	/**
	 * Обработчик привязки карты
	 * @returns строку с описанием ошибки, или `undefined` если запрос прошёл успешно
	 */
	const addRfidCard = async (
		form: RfidCardForm
	): Promise<string | undefined> => {
		setLoading(true)
		return attachRfidCardFromApi({ visualCardNumber: form.visualNumber })
			.then(res => {
				return res?.message
			})
			.finally(() => setLoading(false))
	}

	return {
		addRfidCard,
		loading,
	}
}

export { useRfidCardAddHandler }
