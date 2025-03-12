import Button from '@components/ui/button/Button'
import lightingImage from '@assets/images/lighting-fill-white.svg'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router'
import { SESSION_PROFILE_ENDPOINT } from '@common/consts/endpoints'
import { createQueryString } from '@common/functions/strings'
import {
	ChargingSessionPageQueryArguments,
	ChargingSessionPreviousPageQueries,
} from '@common/consts/pages'

export default function ActiveSessionNotify(): React.JSX.Element {
	const nav = useNavigate()

	return (
		<div className={styles.notify}>
			<Button
				onClick={() =>
					nav(
						SESSION_PROFILE_ENDPOINT +
							'1' +
							createQueryString([
								{
									key: ChargingSessionPageQueryArguments.PREVIOUS_PAGE,
									value: ChargingSessionPreviousPageQueries.MAIN,
								},
							])
					)
				}
				variant='icon'
				iconSrc={lightingImage}
			/>
		</div>
	)
}
