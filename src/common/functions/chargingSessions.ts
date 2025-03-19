import { SessionFilters } from '@common/types/chargingSessions'

export const createGetChargingSessionsRequestOptions = (
	filters: SessionFilters
) => {
	return {
		priceGreaterThan: filters.onlyPaidSessions ? 0 : undefined,
		totalHoursGreaterThan:
			0 !== filters.durationInHours ? filters.durationInHours : undefined,
		standards: filters.connectors,
	}
}
