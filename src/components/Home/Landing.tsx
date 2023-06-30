import GithubIcon from "~icons/tabler/brand-github"
import BookIcon from "~icons/fe/book"

import CoreCode from "../Core/Code"
import HomeSubtitle from "./Subtitle"

const starterCode = `import { Josh } from "@joshdb/core";
  
const josh = new Josh({ name: "website" });

await josh.set("foo", "bar");`

export default function HomeLanding() {
    return (
        <div class='flex flex-col grow h-full md:flex-row gap-x-10 gap-y-8 px-10 items-center h-full pt-4 md:pt-0 pb-10 md:pb-0'>
            <div class='mt-10 md:w-1/2 sm:mt-0'>
                <h2 class='text-xl dark:text-gray-400'>
                    <HomeSubtitle />
                </h2>
                <h1 class='text-6xl dark:text-gray-100 my-2 font-ledger'>Databases, reimagined</h1>
                <p class='dark:text-gray-300 my-7'>
                    Explore the easiest way to quickly, yet efficiently manage lots of different types of databases, all under one easy to use and powerful
                    api. Paired with providers ranging from MongoDB and SQL to JSON, and Middleware such as caching and schema validation, Josh is the easiest
                    way to manage your data.
                </p>
                <div class='space-x-2'>
                    <a href='/docs' class='transition shadow-lg hover:opacity-80 dark:shadow px-6 py-4 rounded-lg inline-block bg-josh text-white'>
                        <div class='flex'>
                            <BookIcon class='mt-[0.2rem] mr-2' /> Documentation
                        </div>
                    </a>
                    <a
                        target='_blank'
                        rel='noopener'
                        href='https://github.com/josh-development/core'
                        class='transition text-white hover:opacity-80 bg-zinc-700 shadow-lg dark:shadow px-6 py-4 rounded-lg inline-block'
                    >
                        <div class='flex'>
                            <GithubIcon class='mt-[0.2rem] mr-2' /> Source
                        </div>
                    </a>
                </div>
            </div>
            <div class='mt-8 w-full md:w-1/2 sm:mt-0'>
                <CoreCode text={starterCode} />
            </div>
        </div>
    )
}