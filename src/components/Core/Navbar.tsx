import { createSignal, Show } from "solid-js";

import GithubIcon from "~icons/ri/github-fill";
import DiscordIcon from "~icons/ic/baseline-discord";

import MoonIcon from "~icons/fe/moon";
import SunIcon from "~icons/fe/sunny-o";
import MenuIcon from "~icons/fe/text-align-justify";
import XIcon from "~icons/fe/close";

const icons = [
	{
		icon: (size = 24) => <GithubIcon height={size} width={size} />,
		href: "https://github.com/josh-development",
	},
	{
		icon: (size = 24) => <DiscordIcon height={size} width={size} />,
		href: "https://discord.evie.dev",
	},
];

const links = [
	{
		text: "Home",
		href: "/",
		end: true,
	},
	{
		text: "Documentation",
		href: "/docs",
		end: false,
	},
];

export default function CoreNavbar({ darkMode }: { darkMode: boolean }) {
	const [showMenu, setShowMenu] = createSignal(false);

	return (
		<nav>
			<div class="flex justify-between px-5 pt-6 md:px-10 md:pt-4">
				<div class="hidden md:flex flex-row items-center space-x-6 w-1/3">
					{links.map((link) => (
						<a
							// activeClass='border-gray-400'
							// inactiveClass='border-transparent'
							class="border-b transition dark:text-white py-2"
							href={link.href}
						>
							{link.text}
						</a>
					))}
				</div>
				<div class="space-x-3 w-1/3 text-center items-center md:justify-center flex">
					<h1 class="text-2xl leading-6 font-ledger text-gray-800 dark:text-white ">
						<a href="/">Josh</a>
					</h1>
				</div>
				<div class="hidden md:flex ml-auto space-x-3 items-center justify-center">
					{icons.map((icon) => (
						<a
							target="_blank"
							rel="noreferrer noopener"
							href={icon.href}
							class="dark:text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
						>
							{icon.icon()}
						</a>
					))}
					<button
						onClick={() => {
							document.body.classList.toggle("dark");
						}}
						class="dark:text-white border-l dark:border-zinc-700 pl-4 p-1 focus:outline-none focus:ring-none focus:ring-offset-2 focus:ring-gray-800"
					>
						<Show when={!darkMode}>
							<MoonIcon width={24} height={24} />
						</Show>
						<Show when={darkMode}>
							<SunIcon width={24} height={24} />
						</Show>
					</button>
				</div>

				<div class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 flex justify-center items-center md:hidden cursor-pointer mr-1">
					<MenuIcon
						onClick={() => setShowMenu(true)}
						height={24}
						width={24}
						class="dark:text-white text-black"
					/>
				</div>
			</div>
			<div
				style="z-index:2"
				class={`transition md:hidden w-screen h-screen bg-josh mx-auto fixed top-0 left-0 py-5 px-5 ${
					showMenu() ? "translate-x-0" : "translate-x-[100vw]"
				}`}
			>
				<div>
					<XIcon
						class="ml-auto text-white"
						onClick={() => setShowMenu(false)}
						width={24}
						height={24}
					/>
				</div>
				<div class="text-center">
					{links.map((link) => (
						// rome-ignore lint/a11y/useValidAnchor: we need to listen to onClick to close the menu
						<a
							onClick={() => setShowMenu(false)}
							// end
							// activeClass='border-gray-400'
							// inactiveClass='border-transparent'
							class="border-b block my-10 mx-20 transition text-white py-2 text-2xl"
							href={link.href}
						>
							{link.text}
						</a>
					))}
				</div>
				<div class="flex justify-center space-x-4 mt-auto">
					{icons.map((icon) => (
						<a
							target="_blank"
							href={icon.href}
							rel="noreferrer noopener"
							class="text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
						>
							{icon.icon(36)}
						</a>
					))}
				</div>
			</div>
		</nav>
	);
}
