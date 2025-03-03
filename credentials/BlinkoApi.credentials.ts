import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BlinkoApi implements ICredentialType {
	name = 'blinkoApi';
	displayName = 'Blinko API';
	documentationUrl = 'https://github.com/blinko-io/blinko';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://localhost:3000',
			placeholder: 'http://localhost:3000',
			required: true,
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/v1/note/list',
			method: 'POST',
			body: {
				page: 1,
				size: 1
			},
			headers: {
				'Authorization': '={{$credentials.apiKey}}',
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		},
	};
}
