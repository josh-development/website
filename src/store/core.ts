import { ProjectParser } from 'typedoc-json-parser'
export async function fetchProject(name: string) {
	const data = await fetch(
		`https://raw.githubusercontent.com/josh-development/docs/main/${name}/main.json`
	)
		.then((res) => res.json())
		const project = new ProjectParser({ data });
		return project;
}
