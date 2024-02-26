import { client } from '@gradio/client'
// @ts-expect-error
import eventsource from 'eventsource'
//@ts-expect-error
global.EventSource = eventsource

export async function useHuggingFace() {
	const app = await client(
		'https://team-lfd-sia-pro-chatbot-g-pdf.hf.space/--replicas/wf94h/',
		{
			hf_token: '',
		},
	)

	return {
		prompt: async (msg: string) => {
			const result = await app.predict('/respond', [msg])

			console.log(result)

			return result
		},
	}
}
