import { INodeProperties } from 'n8n-workflow';
import { notesFields, notesOperations } from './notes';
import { attachmentFields, attachmentOperations } from './attachments';
import { tagsFields, tagsOperations } from './tags';

export const description: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Note',
				value: 'notes',
			},
			{
				name: 'Attachment',
				value: 'attachments',
			},
			{
				name: 'Tag',
				value: 'tags',
			},
		],
		default: 'notes',
	},
	...notesOperations,
	...notesFields,
	...attachmentOperations,
	...attachmentFields,
	...tagsOperations,
	...tagsFields,
];
