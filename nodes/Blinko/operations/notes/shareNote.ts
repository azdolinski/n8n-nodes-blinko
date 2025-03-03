import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

/**
 * Share a note in Blinko
 */
export async function shareNote(
	this: IExecuteFunctions,
	i: number,
	apiBaseUrl: string,
	requestOptions: IDataObject,
): Promise<IDataObject> {
	const noteId = this.getNodeParameter('noteId', i) as string;
	const shareNote = this.getNodeParameter('shareNote', i, true) as boolean;
	
	// Przygotuj dane w formacie oczekiwanym przez serwer
	const jsonData: IDataObject = {
		id: parseInt(noteId, 10),
		isCancel: !shareNote, // isCancel jest przeciwieństwem shareNote
	};
	
	// Dodaj hasło i datę wygaśnięcia tylko jeśli udostępniamy notatkę
	if (shareNote) {
		const password = this.getNodeParameter('password', i, '') as string;
		if (password) {
			jsonData.password = password;
		}
		
		const expireAt = this.getNodeParameter('expireAt', i, '') as string;
		if (expireAt) {
			// Convert to ISO string if it's a date string
			const expireDate = new Date(expireAt);
			jsonData.expireAt = expireDate.toISOString();
		}
	}
	
	// Przygotuj pełne żądanie w formacie batch
	const batchData: IDataObject = {};
	
	// Utwórz strukturę zgodną z oczekiwanym formatem
	const requestItem: IDataObject = {
		json: jsonData,
	};
	
	// Dodaj meta.values dla daty wygaśnięcia
	if (shareNote && jsonData.expireAt) {
		requestItem.meta = {
			values: {
				expireAt: ['Date'],
			},
		};
	}
	
	// Dodaj element do batcha
	batchData['0'] = requestItem;

	const response = await this.helpers.httpRequest({
		method: 'POST',
		baseURL: apiBaseUrl,
		url: '/api/trpc/notes.shareNote?batch=1',
		body: batchData,
		...requestOptions,
	});

	return response.result ? response.result.data : response[0].result.data;
}
