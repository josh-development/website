import { createResource } from 'solid-js';

export function fetchCore(): Promise<unknown> {
	return fetch(
		'https://raw.githubusercontent.com/josh-development/docs/main/core/main.json'
	)
		.then((res) => res.json())
		.catch(() => {});
}
