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
import { useActiveChargingSessionUpdater } from '@common/hooks/chargingSessions'

export default function ActiveSessionNotify(): React.JSX.Element {
	const nav = useNavigate()

	const { activeSession } = useActiveChargingSessionUpdater()

	if (!activeSession) return <></>

	return (
		<div className={styles.notify}>
			<div className={styles.notify__blinkingCircle} />
			<Button
				onClick={() =>
					nav(
						SESSION_PROFILE_ENDPOINT +
							activeSession.id +
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
