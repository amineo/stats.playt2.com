import { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function useQueryParams() {
	const location = useLocation();
	const history = useHistory();

	const queryParams = useMemo(() => {
		const params = new URLSearchParams(location.search);
		const plainParams: any = {};
		params.forEach((value, key) => {
			plainParams[key] = value === '' ? null : value;
		});
		return plainParams;
	}, [location.search]);

	const setQueryParams = useCallback(
		(values) => {
			const newParams = new URLSearchParams(location.search);
			Object.entries(values).forEach(([key, value]) => {
				if (value != null) {
					newParams.set(key, `${value}`);
				} else {
					newParams.delete(key);
				}
			});
			const newParamsString = newParams.toString();
			const newLocation =
				location.pathname + (newParamsString ? `?${newParamsString}` : '');
			history.push(newLocation);
		},
		[history, location.pathname, location.search],
	);

	return [queryParams, setQueryParams];
}
