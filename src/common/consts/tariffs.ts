import { TariffType } from "@common/types/tariffs";

export const TARIFF_TYPE_HAS_UNIT_OF_MEASUREMENT: Record<TariffType, string> = {
    'Энергия': 'кВт·ч',
    'Начало зарядки': '',
    'Длительность': 'час',
    'Длительность парковки': 'час'
}

