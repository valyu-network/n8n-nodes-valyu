import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class ValyuApi implements ICredentialType {
	name = 'valyuApi';
	displayName = 'Valyu API';
	documentationUrl = 'https://docs.valyu.network';
	// (community rule: name should end with -Api)
	// https://github.com/ivov/eslint-plugin-n8n-nodes-base
	// docs: https://docs.n8n.io/integrations/creating-nodes/overview/
	properties: INodeProperties[] = [
		{
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'string',
			default: 'https://api.valyu.network',
			required: true,
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
            headers: {
                'x-api-key': '={{$credentials.apiKey}}',
                'content-type': 'application/json'
            }
		},
	};
}