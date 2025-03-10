import React, { useState, useRef, useEffect } from 'react'
import { LIST_LAYOUT_LIMIT } from './lib/consts.ts'
import chargeStation from '@assets/images/chargeStation.svg'
import styles from './styles.module.scss'
import Button from '@components/ui/button/Button.tsx'
import { Loader } from '@components/ui/loader/Loader.tsx'
import arrowImage from '@assets/images/arrow-up.svg'

type Props = {
	items: React.JSX.Element[]
	loading: boolean
	getData: (offset: number, limit: number) => Promise<Object[]>
	onDataLoad: (newData: Object[]) => void
}

/**
 * Layout списка
 */
export default function ListLayout(props: Props): React.JSX.Element {
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

	console.log(data)

	const limit = LIST_LAYOUT_LIMIT

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
			>
				{dataIsLoading && props.items.length === 0 && <Loader />}
				{!dataIsLoading && props.items.length === 0 && (
					<div className={styles.listLayout__noData}>
						<img src={chargeStation} alt='chargeStation' />
						<p
							className={`${styles.noData__text} ${styles.noData__text_position}`}
						>
							Здесь будут показаны зарядные станции
						</p>
					</div>
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
