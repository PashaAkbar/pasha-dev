const experiences = [
  {
    time: 'Feb 2025 - Now',
    title: 'CIPTA IT Developer and Operations - Contract at PT Bank CIMB Niaga Tbk',
    tasks: [
      'Working on HRIS (Human Resource Information System) internal CIMB Niaga, focusing on system development and enhancement.',
      'Developed and optimized employee management modules, ensuring seamless integration with the existing HR systems.',
    ],
  },
  {
    time: 'Jun 2024 - Nov 2024',
    title: 'Software Engineer - Contract at PT Bank Negara Indonesia',
    tasks: [
      'Developed an MVP for the Undang-Undang Perlindungan Data Pribadi (UUPDP) initiative, enhancing data protection compliance.',
      'Built MVP5 for a new sales model targeting farmers on the Digisales Mobile platform.',
      'Improved user experience on the BNI sales platform by performing bug fixes based on UAT feedback using Vue.js.',
    ],
  },
  {
    time: 'Aug 2023 - Dec 2023',
    title: 'Application Developer - Internship at PT Metrodata Electronics Tbk',
    tasks: [
      'Enhanced user experience of Metrodata Academy Client & Admin Platform, resulting in a performance improvement.',
      'Refactoring Metrodata Academy Client & Admin Platform with ReactJS, NextJS, ShadCN, Tailwind-UI, Redux, & Redux Toolkit.',
      'Collaborated effectively with a team using GitHub for version control and project management.',
    ],
  },
  {
    time: 'Jul 2022 - Aug 2022',
    title: 'Web Developer - Internship at Office of the Governor of South Sumatra',
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
      className='flex flex-col items-center justify-center w-full gap-10 px-10 my-14 text-gray-900'
    >
      <div className='flex justify-center w-full py-2 text-4xl text-center'>
        Experience
      </div>
      <ol className='relative border-gray-300 border-s'>
        {experiences.map((experience, index) => (
          <li
            key={index}
            className='mb-10 ms-4'
          >
            <div className='absolute w-3 h-3 bg-gray-500 rounded-full mt-1.5 -start-1.5 border border-white'></div>
            <time className='mb-1 text-sm font-normal leading-none text-gray-500'>
              {experience.time}
            </time>
            <h3 className='text-lg font-semibold text-gray-900'>
              {experience.title}
            </h3>
            <ul className='pl-6 text-base font-normal text-gray-600 list-disc'>
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
