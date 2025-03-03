import StationsMap from '@features/stationsMap/StationsMap'
import styles from './styles.module.scss'
import commonStyles from '@common/styles.module.scss'
import ControlPanel from '@features/controlPanel/ControlPanel'
import Button from '@components/ui/button/Button'
import Switch from '@components/ui/switch/Switch'
import Status from '@components/ui/status/Status'
import tuningImage from '@assets/images/tuning.svg'
import ListLayout from '@layouts/listLayout/ListLayout'
import station1 from "../../assets/images/station/station1.png";
import station2 from "../../assets/images/station/station2.png";
import station3 from "../../assets/images/station/station3.png";
import { useState, useEffect } from 'react';

/**
 * Главная страница с картой станций
*/
export default function MainPage(): React.JSX.Element {

	const [loading, setLoading] = useState(true);
    const [listLayoutItems, setListLayoutItems] = useState<React.JSX.Element[]>([]);

	const initialItems = [
		<div key={1}>Item 1</div>,
		<div key={2}>Item 2</div>,
		<div key={3}>Item 3</div>,
		<div key={4}>Item 4</div>,
		<div key={5}>Item 5</div>,
		<div key={6}>Item 6</div>,
		<div key={7}>Item 7</div>,
		<div key={8}>Item 8</div>,
		<div key={9}>Item 9</div>,
		<div key={10}>Item 10</div>,
		<div key={11}>Item 11</div>,
		<div key={12}>Item 12</div>,
		<div key={13}>Item 13</div>,
		<div key={14}>Item 14</div>,
		<div key={15}>Item 15</div>,
		<div key={16}>Item 16</div>,
		<div key={17}>Item 17</div>,
		<div key={18}>Item 18</div>,
		<div key={19}>Item 19</div>,
		<div key={20}>Item 20</div>,
	  ];

	  const getData = (offset: number, limit: number): Promise<Object[]> => {
		return new Promise(resolve => {
			setTimeout(() => {
				const start = offset;
				const end = Math.min(offset + limit, initialItems.length);
				const chunk = initialItems.slice(start, end);
				resolve(chunk);
			}, 1000);
		}).then(newData => {
			setLoading(false);
			return newData;
		});
	};
	
	
	useEffect(() => {
		getData(0, 5).then(initialData => {
			setListLayoutItems(initialData);
		});
	}, []);
	
	
	useEffect(() => {
		if (!loading && listLayoutItems.length > 0 && listLayoutItems.length < initialItems.length) {
			const nextOffset = listLayoutItems.length;
			getData(nextOffset, 5).then(newData => {
				if (newData && newData.length > 0) {
					setListLayoutItems(prevItems => [...prevItems, ...newData]);
				}
			});
		}
	}, [loading, listLayoutItems, initialItems.length]);

	return (
		<div className={commonStyles.page}>
			<div className={styles.header}>
				<Button iconSrc={tuningImage} onClick={() => {}} variant='icon' />
				<Switch onChange={enabled => {}} />
				<Status textSize='small' color='green' text='Доступен' />
				<Status textSize='medium' color='orange' text='Занят' />
				<Status textSize='medium' color='red' text='Нет соединения' />
				<Status textSize='large' color='grey' text='Невалидна' />
			</div>
			<ListLayout items={listLayoutItems} loading={loading} getData={getData} />
			<StationsMap />
			<div className={styles.footer}>
				<ControlPanel />
			</div>
		</div>
	)
}