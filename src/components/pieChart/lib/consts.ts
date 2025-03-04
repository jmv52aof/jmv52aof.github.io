import { CircleColor, CircleColorTemplate } from "./types";

export const COLOR_TEMPLATES_MAP: Record<CircleColorTemplate, CircleColor> = {
    'blue': {backgroundColor: '#05A6BE33', mainColor: '#05A6BE'}
}

export const MIN_ANGLE = -90

export const MAX_ANGLE = -450

// 1000 миллисекунд
export const ANIMATION_TIME = 1000