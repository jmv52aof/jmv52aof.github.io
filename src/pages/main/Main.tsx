import StationsMap from '@features/stationsMap/StationsMap'
import styles from './styles.module.scss'
import commonStyles from '@common/styles.module.scss'
import ControlPanel from '@features/controlPanel/ControlPanel'
import Status from '@components/ui/status/Status'
import ListLayout from '@layouts/listLayout/ListLayout'
import { useState, useEffect } from 'react'

/**
 * Главная страница с картой станций
 */
export default function MainPage(): React.JSX.Element {
	const [loading, setLoading] = useState(false)
	const [listLayoutItems, setListLayoutItems] = useState<React.JSX.Element[]>(
		[]
	)

	const initialItems: React.JSX.Element[] = Array.from(
		{ length: 50 },
		(_, index) => {
			const itemNumber = index + 1
			return (
				<Status
					key={`status-${itemNumber}`}
					text={String(itemNumber)}
					textSize='small'
					color='green'
				/>
			)
		}
	)

	const getData = (
		offset: number,
		limit: number
	): Promise<React.JSX.Element[]> => {
		return new Promise<React.JSX.Element[]>(resolve => {
			setTimeout(() => {
				const start = offset
				const end = Math.min(offset + limit, initialItems.length)
				const chunk = initialItems.slice(start, end)
				resolve(chunk)
			}, 1000)
		}).finally(() => {
			setLoading(false)
		})
	}

	useEffect(() => {
		getData(0, 20).then(initialData => {
			setListLayoutItems(initialData)
		})
	}, [])

	const onDataLoad = () => {
		if (
			listLayoutItems.length > 0 &&
			listLayoutItems.length < initialItems.length
		) {
			const nextOffset = listLayoutItems.length
			getData(nextOffset, 15).then(newData => {
				if (newData && newData.length > 0) {
					console.log(newData)
					setListLayoutItems(prevItems => [...prevItems, ...newData])
				}
			})
		}
	}

	return (
		<div className={commonStyles.page}>
			<div className={styles.header}></div>
			<ListLayout
				items={listLayoutItems}
				loading={loading}
				getData={getData}
				onDataLoad={onDataLoad}
			/>
			<StationsMap />
			<div className={styles.footer}>
				<ControlPanel />
			</div>
		</div>
	)
}
