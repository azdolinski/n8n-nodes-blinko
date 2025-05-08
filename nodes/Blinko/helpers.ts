import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

/**
 * Helper function to prepare API credentials and base URL
 */
export async function getCredentialsAndBaseUrl(
	this: IExecuteFunctions,
): Promise<{ apiBaseUrl: string; requestOptions: IDataObject }> {
	// Get credentials
	const credentials = await this.getCredentials('blinkoApi');
	if (!credentials?.baseUrl) {
		throw new Error('No base URL provided in credentials');
	}
	if (!credentials?.apiKey) {
		throw new Error('No API key provided in credentials');
	}

	const baseURL = credentials.baseUrl as string;
	const apiKey = credentials.apiKey as string;
	// Ensure baseURL ends with a slash
	const apiBaseUrl = baseURL.endsWith('/') ? baseURL : `${baseURL}/`;

	// Common request options
	const requestOptions = {
		headers: {
			'Authorization': apiKey.toLowerCase().startsWith('bearer ') ? apiKey : `Bearer ${apiKey}`,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		json: true,
	};

	return { apiBaseUrl, requestOptions };
}
