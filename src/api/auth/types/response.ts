import { ResponseError } from '@common/types/requests'
import { UserTokenResponseDto } from './dto'

export interface AuthorizationTelegramUserResponse {
	data?: UserTokenResponseDto
	error?: ResponseError
}
