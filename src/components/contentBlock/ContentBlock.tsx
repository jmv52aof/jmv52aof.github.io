import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import { ContentBlockItem } from './lib/types'
import styles from './styles.module.scss'

interface Props {
    title: string
	iconSrc: string
    items: ContentBlockItem[]
}

export default function ContentBlock(props: Props): React.JSX.Element {
    return (
        <div className={styles.contentBlock}>
            <p className={styles.contentBlock__title}>{props.title}</p>
            <ContentBlockLayout className={styles.contentBlock__content}>
                <img className={styles.content__icon} src={props.iconSrc} />
                <div className={styles.content__items}>
                    {props.items.map((item, index) => {
                        return (item.checkVisible === undefined || item.checkVisible(item.value)) && 
                            <p key={index} className={styles.items__item}>
                                {item.description}
                                <a className={styles.items__item_color}>
                                    {item.value}
                                </a>
                            </p>
                    })}
                </div>                
            </ContentBlockLayout>
        </div>
    )
}