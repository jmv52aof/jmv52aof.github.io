export interface RfidCardDto {
	visual_number: string
	group?: string
}

export interface RfidCardForm {
	visualNumber: string
}

export interface IRfidCardFormContext {
	form: RfidCardForm
	setForm: (form: RfidCardForm) => void
	error?: string
}
