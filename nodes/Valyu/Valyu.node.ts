import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeApiError,
} from 'n8n-workflow';

function splitList(input?: string): string[] | undefined {
	if (!input) return undefined;
	return input
		.split(/[,\n]/)
		.map((s) => s.trim())
		.filter(Boolean);
}

export class Valyu implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Valyu',
		name: 'valyu',
		icon: 'file:valyu.svg',
		group: ['transform'],
		version: 1,
		description: 'Valyu Deepsearch & Contents',
		defaults: { name: 'Valyu' },
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [{ name: 'valyuApi', required: true }],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Deepsearch', value: 'deepsearch' },
					{ name: 'Contents (Extract/Summarize)', value: 'contents' },
				],
				default: 'deepsearch',
			},

			// ---------- Deepsearch ----------
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { operation: ['deepsearch'] } },
			},
			{
				displayName: 'Max Results',
				name: 'maxNumResults',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 50 },
				default: 10,
				displayOptions: { show: { operation: ['deepsearch'] } },
			},
			{
				displayName: 'Search Type',
				name: 'searchType',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Web', value: 'web' },
					{ name: 'Proprietary', value: 'proprietary' },
				],
				default: 'all',
				displayOptions: { show: { operation: ['deepsearch'] } },
			},
			{
				displayName: 'Max Price (CPM)',
				name: 'maxPrice',
				type: 'number',
				default: 30,
				displayOptions: { show: { operation: ['deepsearch'] } },
			},
			{
				displayName: 'Relevance Threshold (0–1)',
				name: 'relevanceThreshold',
				type: 'number',
				typeOptions: { minValue: 0, maxValue: 1, numberPrecision: 2 },
				default: 0.5,
				displayOptions: { show: { operation: ['deepsearch'] } },
			},
			{
				displayName: 'Included Sources (Comma/Newline Separated)',
				name: 'includedSourcesRaw',
				type: 'string',
				default: '',
				placeholder: 'arxiv.org\nvalyu/valyu-arxiv',
				displayOptions: { show: { operation: ['deepsearch'] } },
			},
			{
				displayName: 'Excluded Sources (Comma/Newline Separated)',
				name: 'excludedSourcesRaw',
				type: 'string',
				default: '',
				displayOptions: { show: { operation: ['deepsearch'] } },
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				displayOptions: { show: { operation: ['deepsearch'] } },
			},
			{
				displayName: 'Response Length',
				name: 'responseLength',
				type: 'options',
				options: [
					{ name: 'Short', value: 'short' },
					{ name: 'Medium', value: 'medium' },
					{ name: 'Large', value: 'large' },
					{ name: 'Max', value: 'max' },
				],
				default: 'short',
				displayOptions: { show: { operation: ['deepsearch'] } },
			},
			{
				displayName: 'Country Code (ISO-2)',
				name: 'countryCode',
				type: 'string',
				default: '',
				displayOptions: { show: { operation: ['deepsearch'] } },
			},
			{
				displayName: 'Is Tool Call',
				name: 'isToolCall',
				type: 'boolean',
				default: false,
				displayOptions: { show: { operation: ['deepsearch'] } },
			},
			{
				displayName: 'Start Date (YYYY-MM-DD)',
				name: 'startDate',
				type: 'string',
				default: '',
				displayOptions: { show: { operation: ['deepsearch'] } },
			},
			{
				displayName: 'End Date (YYYY-MM-DD)',
				name: 'endDate',
				type: 'string',
				default: '',
				displayOptions: { show: { operation: ['deepsearch'] } },
			},

			// ---------- Contents ----------
			{
				displayName: 'URLs (Comma/Newline Separated, Up to 10)',
				name: 'urlsRaw',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'https://example.com/a\nhttps://example.com/b',
				displayOptions: { show: { operation: ['contents'] } },
			},
			{
				displayName: 'Response Length',
				name: 'cResponseLength',
				type: 'options',
				options: [
					{ name: 'Short', value: 'short' },
					{ name: 'Medium', value: 'medium' },
					{ name: 'Large', value: 'large' },
					{ name: 'Max', value: 'max' },
				],
				default: 'medium',
				displayOptions: { show: { operation: ['contents'] } },
			},
			{
				displayName: 'Summary Mode',
				name: 'summaryMode',
				type: 'options',
				options: [
					{ name: 'No AI (False)', value: 'false' },
					{ name: 'Basic Summary (True)', value: 'true' },
					{ name: 'Custom Prompt (String)', value: 'string' },
					{ name: 'Structured (JSON Schema)', value: 'schema' },
				],
				default: 'false',
				displayOptions: { show: { operation: ['contents'] } },
			},
			{
				displayName: 'Custom Prompt',
				name: 'summaryText',
				type: 'string',
				default: '',
				displayOptions: { show: { operation: ['contents'], summaryMode: ['string'] } },
			},
			{
				displayName: 'JSON Schema (as JSON)',
				name: 'summarySchema',
				type: 'json',
				default: {},
				displayOptions: { show: { operation: ['contents'], summaryMode: ['schema'] } },
			},
			{
				displayName: 'Extract Effort',
				name: 'extractEffort',
				type: 'options',
				options: [{ name: 'Normal', value: 'normal' }, { name: 'High', value: 'high' }],
				default: 'normal',
				displayOptions: { show: { operation: ['contents'] } },
			},

			// ---------- Output ----------
			{
				displayName: 'Return',
				name: 'returnMode',
				type: 'options',
				options: [
					{ name: 'Results Array Only', value: 'results' },
					{ name: 'Full API Response', value: 'full' },
				],
				default: 'results',
			},
		],
	};

	async execute(this: IExecuteFunctions) {
		const items = this.getInputData();
		const out: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as string;
			const creds = await this.getCredentials('valyuApi');
			const baseUrl = (creds.apiUrl as string).replace(/\/+$/, '');

			try {
				let url = '';
				let body: any = {};

				if (operation === 'deepsearch') {
					url = `${baseUrl}/v1/deepsearch`;
					body.query = this.getNodeParameter('query', i) as string;
					body.max_num_results = this.getNodeParameter('maxNumResults', i) as number;
					body.search_type = this.getNodeParameter('searchType', i) as string;
					body.max_price = this.getNodeParameter('maxPrice', i) as number;
					body.relevance_threshold = this.getNodeParameter('relevanceThreshold', i) as number;

					const included = splitList(this.getNodeParameter('includedSourcesRaw', i) as string);
					const excluded = splitList(this.getNodeParameter('excludedSourcesRaw', i) as string);
					if (included?.length) body.included_sources = included;
					if (excluded?.length) body.excluded_sources = excluded;

					const category = this.getNodeParameter('category', i) as string;
					if (category) body.category = category;

					const responseLength = this.getNodeParameter('responseLength', i) as string;
					if (responseLength) body.response_length = responseLength;

					const countryCode = this.getNodeParameter('countryCode', i) as string;
					if (countryCode) body.country_code = countryCode;

					const isToolCall = this.getNodeParameter('isToolCall', i) as boolean;
					if (isToolCall) body.is_tool_call = true;

					const startDate = this.getNodeParameter('startDate', i) as string;
					const endDate = this.getNodeParameter('endDate', i) as string;
					if (startDate) body.start_date = startDate;
					if (endDate) body.end_date = endDate;
				}

				if (operation === 'contents') {
					url = `${baseUrl}/contents`;
					const urls = splitList(this.getNodeParameter('urlsRaw', i) as string);
					body.urls = urls;
					body.response_length = this.getNodeParameter('cResponseLength', i) as string;

					const mode = this.getNodeParameter('summaryMode', i) as string;
					if (mode === 'false') body.summary = false;
					if (mode === 'true') body.summary = true;
					if (mode === 'string') body.summary = this.getNodeParameter('summaryText', i) as string;
					if (mode === 'schema') body.summary = this.getNodeParameter('summarySchema', i);

					const effort = this.getNodeParameter('extractEffort', i) as string;
					if (effort === 'high') body.extract_effort = 'high';
				}

				const res = await this.helpers.httpRequestWithAuthentication.call(this, 'valyuApi', {
					method: 'POST',
					url,
					body,
					json: true,
				});

				const returnMode = this.getNodeParameter('returnMode', i) as string;
				const payload = returnMode === 'results' && res?.results ? res.results : res;

				const asArray = Array.isArray(payload) ? payload : [payload];
				out.push(...this.helpers.returnJsonArray(asArray));
			} catch (err) {
				throw new NodeApiError(this.getNode(), err);
			}
		}

		return [out];
	}
}
