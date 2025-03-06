import React, { useState, useEffect, useRef } from 'react'
import styles from './style.module.scss'
import { Loader } from '@components/ui/loader/Loader.tsx'
import Button from '@components/ui/button/Button.tsx'
import arrow from '@assets/images/arrow-up.svg'
import { GET_DATA_LIMIT } from '@common/consts/app'
import EmptyDataNotification from '@components/emptyDataNotification/EmptyDataNotification'
import electricRefuelingImage from '@assets/images/electric-refueling.svg'

type Props = {
	items: React.JSX.Element[]
	loading?: boolean
	getData: (offset: number, limit: number) => Promise<Object[]>
}

/**
 * Layout списка
 */
export default function ListLayout(props: Props): React.JSX.Element {
	const [offset, setOffset] = useState(0)
	const [dataIsLoading, setIsLoading] = useState(false)
	const [hasMoreData, setHasMoreData] = useState(true)
	const listContainerRef = useRef<HTMLDivElement | null>(null)

	const limit = GET_DATA_LIMIT

	const fetchData = () => {
		setIsLoading(true)
		props
			.getData(offset, limit)
			.then(newData => {
				if (newData.length < limit) {
					setHasMoreData(false)
				} else {
					setOffset(prevOffset => prevOffset + limit)
				}
			})
			.finally(() => setIsLoading(false))
	}

	useEffect(() => {
		if (offset > 0 && hasMoreData) {
			fetchData()
		}
	}, [offset, hasMoreData])

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement
		const userScrolledToEnd =
			target.scrollHeight <= target.scrollTop + target.clientHeight
		if (userScrolledToEnd && !dataIsLoading && hasMoreData) {
			fetchData()
		}
	}

	const scrollToTop = () => {
		if (listContainerRef.current) {
			listContainerRef.current.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		}
	}

	return (
		<div>
			<div
				ref={listContainerRef}
				onScroll={handleScroll}
				className={styles.listLayout}
			>
				{((dataIsLoading && props.items.length === 0) || props.loading) && (
					<Loader />
				)}
				{!dataIsLoading && props.items.length === 0 && (
					<EmptyDataNotification
						iconSrc={electricRefuelingImage}
						text='Здесь будут показаны зарядные станции'
					/>
				)}
				{props.items.length > 0 && !props.loading && (
					<div>
						{props.items.map((item, index) => (
							<div key={index} className={styles.listLayout__item}>
								{item}
							</div>
						))}
					</div>
				)}
			</div>
			{dataIsLoading && props.items.length > 0 && <Loader />}
			<Button onClick={scrollToTop} variant='iconSmall' iconSrc={arrow} />
		</div>
	)
}
