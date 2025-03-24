import {
	mockTelegramEnv,
	emitEvent,
	retrieveLaunchParams,
} from '@telegram-apps/bridge'

export const initializeMockEnvironment = () => {
	let shouldMock: boolean
	try {
		retrieveLaunchParams()
		shouldMock = !!sessionStorage.getItem('mocked')
	} catch (e) {
		shouldMock = true
	}

	if (!shouldMock) return

	const noInsets = {
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	} as const

	const themeParams = {
		bg_color: '#17212b',
		button_color: '#5288c1',
		button_text_color: '#ffffff',
		hint_color: '#708499',
		link_color: '#6ab3f3',
		secondary_bg_color: '#232e3c',
		text_color: '#f5f5f5',
	} as const

	const launchParams = {
		tgWebAppThemeParams: themeParams,
		tgWebAppData: new URLSearchParams([
			[
				'user',
				JSON.stringify({
					id: 1,
					first_name: 'Pavel',
				}),
			],
			['hash', ''],
			['signature', ''],
			['auth_date', Date.now().toString()],
		]),
		tgWebAppStartParam: 'debug',
		tgWebAppVersion: '8.3',
		tgWebAppPlatform: 'tdesktop',
	}

	mockTelegramEnv({
		launchParams: launchParams,
		onEvent(e) {
			if (e[0] === 'web_app_request_theme') {
				return emitEvent('theme_changed', { theme_params: themeParams })
			}
			if (e[0] === 'web_app_request_viewport') {
				return emitEvent('viewport_changed', {
					height: window.innerHeight,
					width: window.innerWidth,
					is_expanded: true,
					is_state_stable: true,
				})
			}
			if (e[0] === 'web_app_request_content_safe_area') {
				return emitEvent('content_safe_area_changed', noInsets)
			}
			if (e[0] === 'web_app_request_safe_area') {
				return emitEvent('safe_area_changed', noInsets)
			}
		},
	})
	sessionStorage.setItem('mocked', '1')
}
