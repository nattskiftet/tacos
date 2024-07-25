type Response<Type, Key extends string> =
	| ({
			success: true;
	  } & {[Property in Key]: Type})
	| {
			success: false;
			error: {
				type: string;
				code: string;
				message: string;
			};
	  };

export type FetcherError = {
	isFetcherError: true;
	type: string;
	code: string;
} & Error;

export function isFetcherError(error: any): error is FetcherError {
	return 'isFetcherError' in error && error.isFetcherError === true;
}

const fetcher =
	<Type>(property: string) =>
	async (url: RequestInfo | URL, options?: RequestInit) =>
		fetch(url, options)
			.then(async (response) => response.json())
			.then((response: Response<Type, typeof property>) => {
				if (response.success) {
					return response[property];
				}

				const error = new Error(response.error.message) as FetcherError;
				error.isFetcherError = true;
				error.type = response.error.type;
				error.code = response.error.code;
				throw error;
			});

export default fetcher;
