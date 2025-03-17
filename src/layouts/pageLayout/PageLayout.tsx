import PageHeader from '@features/header/Header'
import commonStyles from '@common/styles.module.scss'
import styles from './styles.module.scss'
import { Loader } from '@components/ui/loader/Loader'

type Props = {
	onReturn: () => void
	title: string
	children: React.ReactNode
	headerContent?: React.ReactNode
	loading?: boolean
	className?: string
}

export default function PageLayout(props: Readonly<Props>): React.JSX.Element {
	return (
		<div className={`${commonStyles.page} ${props.className}`}>
			<PageHeader
				onReturn={props.onReturn}
				title={props.title}
				content={props.headerContent}
			/>
			{props.loading ? (
				<div className={styles.page__loader}>
					<Loader />
				</div>
			) : (
				props.children
			)}
		</div>
	)
}
