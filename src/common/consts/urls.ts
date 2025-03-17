export const STATIONS_URL =
	import.meta.env.VITE_BACKEND_URL + 'app/api/locations/'

export const CHARGING_SESSIONS_URL =
	import.meta.env.VITE_BACKEND_URL + 'app/api/sessions/'

export const RFID_CARD_URL = import.meta.env.VITE_BACKEND_URL + 'app/api/card/'

export const PAYMENT_URL = import.meta.env.VITE_BACKEND_URL + 'app/api/payment/'
export const PAYMENT_METHOD_URL = PAYMENT_URL + 'method/'

export const AUTHORIZATION_URL =
	import.meta.env.VITE_BACKEND_URL + 'auth/login/'
