export const NotFound = () => {
  return (
    <div class='text-center h-[80vh] items-center flex justify-center'>
      <div class='w-96'>
        <h1 class='text-8xl dark:text-white text-gray-400 dark:text-gray-200 my-2'>404</h1>
        <p class='text-gray-400'>
          Hmm, looks like this page doesn't exist, try reloading or checking back later, or if you think this is a mistake, open a bug report{' '}
          <a target='_blank' class='text-gray-500 dark:text-gray-200' href='https://github.com/josh-development/website'>
            here
          </a>
        </p>
      </div>
    </div>
  );
};
