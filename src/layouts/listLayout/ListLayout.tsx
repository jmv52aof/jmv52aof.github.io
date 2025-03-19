import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'
import Button from '@components/ui/button/Button.tsx'
import { Loader } from '@components/ui/loader/Loader.tsx'
import arrowImage from '@assets/images/arrow-up.svg'
import EmptyDataNotification from '@components/emptyDataNotification/EmptyDataNotification.tsx'
import chargeStationImage from '@assets/images/charge-station.svg'
import { useWindowSizes } from '@common/hooks/window.ts'
import { GET_DATA_LIMIT } from '@common/consts/app.ts'
import {
	LIST_HEIGHT_REDUCTION_DEFAULT,
	LIST_HEIGHT_REDUCTION_FULL,
} from './lib/consts'

type Props = {
	items: React.JSX.Element[]
	loading?: boolean
	getData: (offset: number, limit: number) => Promise<Object[]>
	onDataLoad: (newData: Object[]) => void
	fullHeight?: boolean
}

/**
 * Layout списка
 */
export default function ListLayout(props: Props): React.JSX.Element {
	const { windowSizes } = useWindowSizes()

	const [offset, setOffset] = useState(0)
	const [dataIsLoading, setIsLoading] = useState(false)
	const [hasMoreData, setHasMoreData] = useState(true)
	const listContainerRef = useRef<HTMLDivElement | null>(null)
	const [isButtonVisible, setIsButtonVisible] = useState(false)
	const [isDragging, setIsDragging] = useState(false)
	const [startX, setStartX] = useState(0)
	const [startY, setStartY] = useState(0)
	const [data, setData] = useState<Object[]>([])

	useEffect(() => {
		fetchData()
	}, [])

	const limit = GET_DATA_LIMIT

	const fetchData = () => {
		/** Подгрузка данных отключена, т.к. сейчас все данные загружаются в карте */
		if (props.items) return

		setIsLoading(true)
		props
			.getData(offset, limit)
			.then(newData => {
				if (newData.length < limit) {
					setHasMoreData(false)
				} else {
					setOffset(prevOffset => prevOffset + limit)
				}

				const updatedData = data.concat(newData)
				setData(updatedData)
				props.onDataLoad(updatedData)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement
		const userScrolledToEnd =
			target.scrollHeight <= target.scrollTop + target.clientHeight

		const isScrollableContent = target.scrollHeight > target.clientHeight
		const isScrolledDown = target.scrollTop > 0

		if (isScrollableContent && isScrolledDown) {
			setIsButtonVisible(true)
		} else {
			setIsButtonVisible(false)
		}

		if (userScrolledToEnd && hasMoreData) {
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

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true)
		setStartX(e.clientX)
		setStartY(e.clientY)
	}

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDragging) return

		const container = listContainerRef.current
		if (!container) return

		const deltaX = e.clientX - startX
		const deltaY = e.clientY - startY

		container.scrollTop -= deltaY
		container.scrollLeft -= deltaX

		setStartX(e.clientX)
		setStartY(e.clientY)

		e.preventDefault()
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	const heightReduction = props.fullHeight
		? LIST_HEIGHT_REDUCTION_FULL
		: LIST_HEIGHT_REDUCTION_DEFAULT

	return (
		<div>
			<div
				ref={listContainerRef}
				onScroll={handleScroll}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
				className={styles.listLayout__list}
				style={{
					height: windowSizes.height - heightReduction + 'px',
				}}
			>
				{((dataIsLoading && props.items.length === 0) || props.loading) && (
					<Loader />
				)}
				{!dataIsLoading && props.items.length === 0 && !props.loading && (
					<EmptyDataNotification
						text='Здесь будут показаны зарядные станции'
						iconSrc={chargeStationImage}
					/>
				)}
				{props.items.length > 0 && !props.loading && (
					<div className={styles.list_noSelection}>
						{props.items.map((item, index) => (
							<div key={index} className={styles.list__item}>
								{item}
							</div>
						))}
					</div>
				)}
			</div>
			{dataIsLoading && props.items.length > 0 && <Loader />}
			{isButtonVisible && (
				<div className={styles.listLayout__blockButton}>
					<Button
						onClick={scrollToTop}
						variant='iconSmall'
						iconSrc={arrowImage}
					/>
				</div>
			)}
		</div>
	)
}
