import ContentBlockLayout from '@layouts/contentBlockLayout/contentBlockLayout'
import { ContentBlockItem } from './lib/types'
import styles from './styles.module.scss'

interface Props {
    title: string
    items: ContentBlockItem[]
}

export default function ContentBlock(props: Props): React.JSX.Element {
    return (
        <div className={styles.contentBlock}>
            <p className={styles.contentBlock__title}>{props.title}</p>
            <ContentBlockLayout className={styles.contentBlock__content}>
                {props.items.map((item, index) => {
                    return (item.checkVisible === undefined || item.checkVisible(item.value)) && 
                        <div key={index} className={styles.content__item}>
                            {item.iconSrc 
                                ? <img className={styles.item__img} src={item.iconSrc} alt="" /> 
                                : <div className={styles.item__img}></div>
                                }
                            <p className={styles.item__text}>{item.description}
                                <a className={styles.item__text_color}>
                                    {item.value}
                                </a>
                            </p>
                        </div>
                    }
                )}
            </ContentBlockLayout>
        </div>
    )
}