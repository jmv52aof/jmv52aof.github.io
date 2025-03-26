import styles from './styles.module.scss'
import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import ConnectorCard from '@components/ui/connectorCard/ConnectorCard'
import ResetFiltersButton from '@components/ui/resetFiltersButton/ResetFiltersButton'
import refreshImageActive from '@assets/images/refresh-icon-active.svg'
import Button from '@components/ui/button/Button'
import Switch from '@components/ui/switch/Switch'
import { ConnectorStandard } from '@common/types/stations'
import { DEFAULT_FILTERS } from '@common/consts/stations'
import { isFiltersDefault } from './lib/functions'
import { useContext } from 'react'
import { RootStateContext } from 'contexts/RootStateContext'
import Slider from '@components/ui/slider/Slider'

export default function StationFiltersFeature(): React.JSX.Element {
	const { stationFilters, setStationFilters, showSnackbar } =
		useContext(RootStateContext)

	const handleConnectorChange = (
		connector: ConnectorStandard,
		enabled: boolean
	) => {
		setStationFilters({
			...stationFilters,
			connectors: enabled
				? [...stationFilters.connectors, connector]
				: stationFilters.connectors.filter(item => item !== connector),
			isModified: true,
		})
	}

	const handleSwitchChange = (enabled: boolean) => {
		setStationFilters({
			...stationFilters,
			onlyAvailableStations: enabled,
			isModified: true,
		})
	}

	const handleSliderChange = (value: number) => {
		setStationFilters({
			...stationFilters,
			minimalPower: value * 1000,
			isModified: true,
		})
	}

	const applyFilters = () => {
		if (!stationFilters.connectors.length) return

		setStationFilters({
			...stationFilters,
			isModified: false,
			shouldUpdateStations: true,
		})
		showSnackbar('success', 'Фильтры применены')
	}

	const resetFilters = () => {
		setStationFilters({
			...DEFAULT_FILTERS,
			partOfName: stationFilters.partOfName,
			shouldUpdateStations: true,
		})
		showSnackbar('success', 'Фильтры сброшены')
	}

	return (
		<div className={styles.stationFilters}>
			<ContentBlockLayout>
				<div className={styles.stationFilters__onlyAvailable}>
					<p className={styles.onlyAvailable__text}>Только доступные</p>
					<Switch
						onChange={handleSwitchChange}
						enabled={stationFilters.onlyAvailableStations}
					/>
				</div>
			</ContentBlockLayout>
			<div className={styles.stationFilters__minimalPower}>
				<span className={styles.minimalPower__text}>
					Минимальная мощность, кВт
				</span>
				<ContentBlockLayout>
					<Slider
						onChange={value => handleSliderChange(value)}
						items={{
							'3': 3,
							'18': 18,
							'35': 35,
							'50': 50,
							'75': 75,
							'>100': 100,
						}}
						orderedItemKeys={['3', '18', '35', '50', '75', '>100']}
						current={stationFilters.minimalPower / 1000}
					/>
				</ContentBlockLayout>
			</div>
			<div className={styles.stationFilters__connectors}>
				<div className={styles.connectors__tittle}>
					<span className={styles.tittle__text}>Коннекторы</span>
				</div>
				<ContentBlockLayout>
					<div className={styles.connectors__row}>
						<ConnectorCard
							onChange={enabled => handleConnectorChange('Type 1', enabled)}
							connector={'Type 1' as ConnectorStandard}
							enabled={stationFilters.connectors.includes('Type 1')}
						/>
						<ConnectorCard
							onChange={enabled => handleConnectorChange('Type 2', enabled)}
							connector={'Type 2' as ConnectorStandard}
							enabled={stationFilters.connectors.includes('Type 2')}
						/>
						<ConnectorCard
							onChange={enabled => handleConnectorChange('CCS1', enabled)}
							connector={'CCS1' as ConnectorStandard}
							enabled={stationFilters.connectors.includes('CCS1')}
						/>
					</div>
				</ContentBlockLayout>
				<ContentBlockLayout>
					<div className={styles.connectors__row}>
						<ConnectorCard
							onChange={enabled => handleConnectorChange('CCS2', enabled)}
							connector={'CCS2' as ConnectorStandard}
							enabled={stationFilters.connectors.includes('CCS2')}
						/>
						<ConnectorCard
							onChange={enabled => handleConnectorChange('GB/T (AC)', enabled)}
							connector={'GB/T (AC)' as ConnectorStandard}
							enabled={stationFilters.connectors.includes('GB/T (AC)')}
						/>
						<ConnectorCard
							onChange={enabled => handleConnectorChange('GB/T (DC)', enabled)}
							connector={'GB/T (DC)' as ConnectorStandard}
							enabled={stationFilters.connectors.includes('GB/T (DC)')}
						/>
					</div>
				</ContentBlockLayout>
				<ContentBlockLayout>
					<div className={styles.connectors__lastRow}>
						<ConnectorCard
							onChange={enabled => handleConnectorChange('CHAdeMO', enabled)}
							connector={'CHAdeMO' as ConnectorStandard}
							enabled={stationFilters.connectors.includes('CHAdeMO')}
						/>
						<ConnectorCard
							onChange={enabled => handleConnectorChange('Tesla', enabled)}
							connector={'Tesla' as ConnectorStandard}
							enabled={stationFilters.connectors.includes('Tesla')}
						/>
					</div>
				</ContentBlockLayout>
			</div>
			<div className={styles.stationFilters__footer}>
				<ResetFiltersButton
					onClick={resetFilters}
					disabled={isFiltersDefault(stationFilters)}
					iconSrc={refreshImageActive}
					text='Сбросить фильтры'
				/>
				<Button
					onClick={applyFilters}
					variant='fill'
					text='Применить'
					disabled={
						!stationFilters.isModified || !stationFilters.connectors.length
					}
				/>
			</div>
		</div>
	)
}
