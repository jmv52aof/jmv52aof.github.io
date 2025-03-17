import styles from './styles.module.scss'
import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import ConnectorCard from '@components/ui/connectorCard/ConnectorCard'
import ResetFiltersButton from '@components/ui/resetFiltersButton/ResetFiltersButton'
import refreshImageActive from '@assets/images/refresh-icon-active.svg'
import Button from '@components/ui/button/Button'
import Switch from '@components/ui/switch/Switch'
import Snackbar from '@components/snackbar/Snackbar'
import { ConnectorStandard } from '@common/types/chargingSessions'
import { DEFAULT_FILTERS } from '@common/consts/chargingSessions'
import { isFiltersDefault } from './lib/functions'
import { useContext, useState } from 'react'
import { RootStateContext } from 'contexts/RootStateContext'
import Slider from '@components/ui/slider/Slider'

export default function SessionFiltersFeature(): React.JSX.Element {
	const { sessionFilters, setSessionFilters } = useContext(RootStateContext)
	const [isSnackbarVisible, setIsSnackbarVisible] = useState(false)
	const [isResetSnackbarVisible, setIsResetSnackbarVisible] = useState(false)

	const handleConnectorChange = (
		connector: ConnectorStandard,
		enabled: boolean
	) => {
		console.log('setSessionFilters:', setSessionFilters)
		setSessionFilters({
			...sessionFilters,
			connectors: enabled
				? [...sessionFilters.connectors, connector]
				: sessionFilters.connectors.filter(item => item !== connector),
			isModified: true,
		})
	}

	const handleSwitchChange = (enabled: boolean) => {
		setSessionFilters({
			...sessionFilters,
			onlyAvailableSessions: enabled,
			isModified: true,
		})
	}

	const handleSliderChange = (value: number) => {
		setSessionFilters({
			...sessionFilters,
			minimalPower: value * 1000,
			isModified: true,
		})
	}

	const applyFilters = () => {
		setIsSnackbarVisible(true)
		setSessionFilters({
			...sessionFilters,
			isModified: false,
			shouldUpdateSessions: true,
		})
	}

	const resetFilters = () => {
		setIsResetSnackbarVisible(true)
		setSessionFilters({ ...DEFAULT_FILTERS, shouldUpdateSessions: true })
	}

	return (
		<div className={styles.sessionFilters}>
			<ContentBlockLayout>
				<div className={styles.sessionFilters__onlyAvailable}>
					<p className={styles.onlyAvailable__text}>Только платные</p>
					<Switch
						onChange={handleSwitchChange}
						enabled={sessionFilters.onlyAvailableSessions}
					/>
				</div>
			</ContentBlockLayout>
			<div className={styles.sessionFilters__minimalPower}>
				<span className={styles.minimalPower__text}>
					Минимальная длительность, часы
				</span>
				<ContentBlockLayout>
					<Slider
						onChange={value => handleSliderChange(value)}
						items={{
							'1': 1,
							'2': 2,
							'3': 3,
							'5': 5,
							'8': 8,
							'>12': 12,
						}}
						current={sessionFilters.minimalPower / 1000}
					/>
				</ContentBlockLayout>
			</div>
			<div className={styles.sessionFilters__connectors}>
				<div className={styles.connectors__tittle}>
					<span className={styles.tittle__text}>Коннекторы</span>
				</div>
				<ContentBlockLayout>
					<div className={styles.connectors__row}>
						<ConnectorCard
							onChange={enabled => handleConnectorChange('Type 1', enabled)}
							connector={'Type 1' as ConnectorStandard}
							enabled={sessionFilters.connectors.includes('Type 1')}
						/>
						<ConnectorCard
							onChange={enabled => handleConnectorChange('Type 2', enabled)}
							connector={'Type 2' as ConnectorStandard}
							enabled={sessionFilters.connectors.includes('Type 2')}
						/>
						<ConnectorCard
							onChange={enabled => handleConnectorChange('CCS1', enabled)}
							connector={'CCS1' as ConnectorStandard}
							enabled={sessionFilters.connectors.includes('CCS1')}
						/>
					</div>
				</ContentBlockLayout>
				<ContentBlockLayout>
					<div className={styles.connectors__row}>
						<ConnectorCard
							onChange={enabled => handleConnectorChange('CCS2', enabled)}
							connector={'CCS2' as ConnectorStandard}
							enabled={sessionFilters.connectors.includes('CCS2')}
						/>
						<ConnectorCard
							onChange={enabled => handleConnectorChange('GB/T (AC)', enabled)}
							connector={'GB/T (AC)' as ConnectorStandard}
							enabled={sessionFilters.connectors.includes('GB/T (AC)')}
						/>
						<ConnectorCard
							onChange={enabled => handleConnectorChange('GB/T (DC)', enabled)}
							connector={'GB/T (DC)' as ConnectorStandard}
							enabled={sessionFilters.connectors.includes('GB/T (DC)')}
						/>
					</div>
				</ContentBlockLayout>
				<ContentBlockLayout>
					<div className={styles.connectors__lastRow}>
						<ConnectorCard
							onChange={enabled => handleConnectorChange('CHAdeMO', enabled)}
							connector={'CHAdeMO' as ConnectorStandard}
							enabled={sessionFilters.connectors.includes('CHAdeMO')}
						/>
						<ConnectorCard
							onChange={enabled => handleConnectorChange('Tesla', enabled)}
							connector={'Tesla' as ConnectorStandard}
							enabled={sessionFilters.connectors.includes('Tesla')}
						/>
					</div>
				</ContentBlockLayout>
			</div>
			{isSnackbarVisible && (
				<div className={styles.popUp__snackBar}>
					<Snackbar variant='success' text='Фильтры применены' />
				</div>
			)}
			{isResetSnackbarVisible && (
				<div className={styles.popUp__snackBar}>
					<Snackbar variant='success' text='Фильтры сброшены' />
				</div>
			)}
			<div className={styles.sessionFilters__footer}>
				<ResetFiltersButton
					onClick={resetFilters}
					disabled={isFiltersDefault(sessionFilters)}
					iconSrc={refreshImageActive}
					text='Сбросить фильтры'
				/>
				<Button
					onClick={applyFilters}
					variant='fill'
					text='Применить'
					disabled={!sessionFilters.isModified}
				/>
			</div>
		</div>
	)
}
