import { DEFAULT_RFID_CARD_FORM } from '@common/consts/rfidCards'
import { IRfidCardFormContext } from '@common/types/rfidCards'
import { createContext } from 'react'

export const RfidCardFormContext = createContext<IRfidCardFormContext>({
	form: DEFAULT_RFID_CARD_FORM,
	setForm: _ => {},
})
