import ma from '../assets/metrodata-academy.png'
import maAdmin from '../assets/metrodata-admin.png'
import ipp from '../assets/injeksi-plastik-pasifik.jpg';
import trivenly from '../assets/trivenly.jpg';

const portfolioItems = [
  {
    title: 'Arjuna HRIS Platform by CIMB Niaga',
    description: `Built frontend features for Arjuna Stage 3 and Stage 4 using React TS based on Figma designs. Developed reusable components, maintained design consistency, integrated REST APIs, and collaborated with backend engineers to ensure smooth data flow across the HRIS platform.`,
    image: null,
    link: '',
    reverse: true,
    confidential: true,
    tags: ['React', 'TypeScript', 'REST API'],
  },
  {
    title: 'Digisales by BNI',
    description: `Revamped the Digisales interface with a more modern user experience using Vue.js. Implemented several UUPD-related privacy concerns by restricting sensitive information and ensuring protected data remains hidden within the application.`,
    image: null,
    link: '',
    reverse: false,
    confidential: true,
    tags: ['Vue.js', 'Privacy', 'UAT'],
  },
  {
    title: 'Supply Chain Management Dashboard for Pasifik Plastic Injection',
    description: `Developed a supply chain management dashboard for Pasifik Plastic Injection to monitor procurement, inventory movement, deliveries, and financial performance.`,
    image: ipp,
    link: '',
    reverse: true,
    tags: ['Dashboard', 'Supply chain', 'Operations'],
  },
  {
    title: 'Trivenly',
    description: `Built and integrated a flight search feature using ASTRO and Vue.js, enabling users to compare flight prices across various platforms. Implemented APIs to fetch real-time flight data, enhancing booking accuracy and user experience.`,
    image: trivenly,
    link: '',
    reverse: false,
    tags: ['Astro', 'Vue.js', 'API integration'],
  },
  {
    title: 'Metrodata Academy',
    description: `Landing page for PT Metrodata Electronics Tbk. Developed a
      comprehensive landing page showcasing the services and solutions provided
      by Metrodata, including their major business divisions and technological
      partnerships. The landing page also highlights various Metrodata programs.
      Metrodata Training, Metrodata Internship, Metrodata IT Camp and Metrodata Mengajar.`,
    image: ma,
    link: 'https://metrodataacademy.id',
    reverse: true,
    tags: ['React', 'Next.js', 'Tailwind'],
  },
  {
    title: 'Metrodata Academy Management System',
    description: `An internal management system. Designed and implemented a robust
      internal system to streamline and manage the operations within
      Metrodata Academy.`,
    image: maAdmin,
    link: '',
    reverse: false,
    tags: ['React', 'Redux', 'Internal tools'],
  },
];

const orderedPortfolioItems = [...portfolioItems].sort(
  (firstProject, secondProject) => Number(Boolean(firstProject.confidential)) - Number(Boolean(secondProject.confidential)),
)

const Portofolio = () => {
  return (
    <section
      name='portfolio'
      id='portfolio'
      className='section-shell section-block'
    >
      <div className='section-heading'>
        <p className='eyebrow'>Selected work</p>
        <h2>Portfolio</h2>
        <p>Products and platforms built across HRIS, fintech, operations, and the web.</p>
      </div>
      <div className='portfolio-list'>
      {orderedPortfolioItems.map((item, index) => (
        <section
          key={index}
          className={`portfolio-item ${
            item.reverse ? 'is-reversed' : ''
          }`}
        >
          <div className='portfolio-copy'>
            <p className='project-index'>{String(index + 1).padStart(2, '0')}</p>
            {item.link ? (
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={item.link}
                className='project-title project-link'
              >
                {item.title}
              </a>
            ) : (
              <h3 className='project-title'>{item.title}</h3>
            )}
            <p className='project-description'>{item.description}</p>
            <div className='tag-list' aria-label={`${item.title} technologies`}>
              {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
          {item.image ? (
            item.link ? <a target='_blank' rel='noopener noreferrer' href={item.link} className='project-media'>
              <img
                src={item.image}
                alt={item.title}
                className='project-image'
              />
            </a> : <div className='project-media'><img src={item.image} alt={item.title} className='project-image' /></div>
          ) : (
            <div className='project-media confidential-media'>
              <span className='confidential-mark' aria-hidden='true'>✦</span>
              <p>Confidential project<br /><small>Details available in conversation</small></p>
            </div>
          )}
        </section>
      ))}
      </div>
    </section>
  )
}

export default Portofolio
