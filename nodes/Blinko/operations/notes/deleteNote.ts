import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

/**
 * Delete a note from Blinko
 */
export async function deleteNote(
	this: IExecuteFunctions,
	i: number,
	apiBaseUrl: string,
	requestOptions: IDataObject,
): Promise<IDataObject> {
	const noteId = this.getNodeParameter('noteId', i) as string;

	// Przygotuj pełne żądanie w formacie batch
	const batchData: IDataObject = {};
	
	// Utwórz strukturę zgodną z oczekiwanym formatem
	const requestItem: IDataObject = {
		json: {
			ids: [parseInt(noteId, 10)],
		},
	};
	
	// Dodaj element do batcha
	batchData['0'] = requestItem;

	// Call the API but don't use the response
	await this.helpers.httpRequest({
		method: 'POST',
		baseURL: apiBaseUrl,
		url: '/api/trpc/notes.deleteMany?batch=1',
		body: batchData,
		...requestOptions,
	});

	return { success: true, message: 'Note deleted successfully' };
}
