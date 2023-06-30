import { createSignal, onCleanup, onMount } from "solid-js";

const subtitlePackageList = [
    'core',
    'mongo',
    'json',
    'redis',
    'sqlite',
    'postgres',
    // to be generate dynamically later...
]

export default function HomeSubtitle() {
    const [subtitleIndex, setSubtitleIndex] = createSignal(0);
    const [subtitle, setSubtitle] = createSignal(subtitlePackageList[subtitleIndex()]);

    let interval: number;

    const erase = async () => {
        for (const _ of subtitle()!) {
            setSubtitle(subtitle()!.slice(0, -1));
            await new Promise((r) => {
                setTimeout(r, 100);
            });
        }
    };

    const type = async () => {
        for (let i = 0; i < subtitlePackageList[subtitleIndex()]!.length; i++) {
            setSubtitle(subtitlePackageList[subtitleIndex()]!.slice(0, i + 1));
            await new Promise((r) => {
                setTimeout(r, 100);
            });
        }
    };


    onMount(() => {
        interval = setInterval(async () => {
            await erase()
            setSubtitleIndex((subtitleIndex() + 1) % subtitlePackageList.length)
            await type()
        }, 3000)
    })

    onCleanup(() => {
        clearInterval(interval)
    })

    return (
        <a class='flex font-maven dark:text-white' target='_blank' href={`https://npmjs.org/package/@joshdb/${subtitlePackageList[subtitleIndex()]}`} rel='noopener'>
            <span>@joshdb/
                <span class='text-josh'>
                    {subtitle()}
                </span>
            </span>
            <span class='h-5 mt-1.5 bg-zinc-800 dark:bg-gray-300 animate-cursor w-0.5 ml-0.5'></span>
        </a>
    )
}