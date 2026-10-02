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
    <section
      name='experience'
      id='experience'
      className='section-shell section-block'
    >
      <div className='section-heading'>
        <p className='eyebrow'>The path so far</p>
        <h2>Experience</h2>
        <p>Building useful systems with teams that care about the details.</p>
      </div>
      <ol className='experience-list'>
        {experiences.map((experience, index) => (
          <li
            key={index}
            className='experience-item'
          >
            <div className='experience-marker' aria-hidden='true'></div>
            <time dateTime={experience.time} className='experience-time'>
              {experience.time}
            </time>
            <h3 className='experience-title'>
              {experience.title}
            </h3>
            <ul className='experience-tasks'>
              {experience.tasks.map((task, idx) => (
                <li key={idx}>{task}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Experience
