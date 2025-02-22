import { StationStatus } from '@common/types/stations';
import { ColorTemplate } from '@components/ui/status/lib/types';


export const STATION_STATUS_COLORS: Record<StationStatus, ColorTemplate> = {
    'Доступна' :  'green',
    'Занята' : 'grey',
    'Не работает' : 'orange',
};
