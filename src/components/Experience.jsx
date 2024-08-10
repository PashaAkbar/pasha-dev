const experiences = [
  {
    time: 'June 2024 - Now',
    title: 'Software Engineer at Bank Negara Indonesia',
    tasks: [
      'Implemented Express.js as a proxy middleware to secure backend endpoints.',
      'Improved user experience on the BNI sales platform by performing bug fixes based on UAT feedback using Vue.js.',
    ],
  },
  {
    time: 'Augustus - December 2023',
    title: 'Application Developer Intern at Metrodata Electronics',
    tasks: [
      'Enhanced user experience of Metrodata Academy Client & Admin Platform, resulting in a performance improvement.',
      'Refactoring Metrodata Academy Client & Admin Platform with ReactJS, NextJS, ShadCN, Tailwind-UI, Redux, & Redux Toolkit.',
      'Collaborated effectively with a team using GitHub for version control and project management.',
    ],
  },
  {
    time: 'July - August 2023',
    title: 'Web Developer Intern at Office of the Governor of South Sumatra',
    tasks: [
      'Developed a Laravel-based web application for efficient management of intra-departmental correspondence.',
      'Focused on streamlining the tracking of incoming and outgoing letters, enhancing departmental communication and operational efficiency.',
    ],
  },
]

const Experience = () => {
  return (
    <div
      name='experience'
      className='flex flex-col items-center justify-center w-full gap-10 px-10 my-14'
    >
      <div className='flex justify-center w-full py-2 text-4xl text-center'>
        Experience
      </div>
      <ol className='relative border-gray-200 border-s dark:border-gray-700'>
        {experiences.map((experience, index) => (
          <li
            key={index}
            className='mb-10 ms-4'
          >
            <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
            <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
              {experience.time}
            </time>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              {experience.title}
            </h3>
            <ul className='pl-6 text-base font-normal text-gray-500 list-disc dark:text-gray-400'>
              {experience.tasks.map((task, idx) => (
                <li key={idx}>{task}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Experience
