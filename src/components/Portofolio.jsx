import ma from '../assets/metrodata-academy.png'
import maAdmin from '../assets/metrodata-admin.png'
import akbPicture from '../assets/akbar-picture.png'
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
  },
  {
    title: 'Digisales by BNI',
    description: `Revamped the Digisales interface with a more modern user experience using Vue.js. Implemented several UUPD-related privacy concerns by restricting sensitive information and ensuring protected data remains hidden within the application.`,
    image: null,
    link: '',
    reverse: false,
    confidential: true,
  },
  {
    title: 'Supply Chain Management Dashboard for Pasifik Plastic Injection',
    description: `Developed a supply chain management dashboard for Pasifik Plastic Injection to monitor procurement, inventory movement, deliveries, and financial performance.`,
    image: ipp,
    link: '',
    reverse: true,
  },
  {
    title: 'Trivenly',
    description: `Built and integrated a flight search feature using ASTRO and Vue.js, enabling users to compare flight prices across various platforms. Implemented APIs to fetch real-time flight data, enhancing booking accuracy and user experience.`,
    image: trivenly,
    link: '',
    reverse: false,
  },
  {
    title: 'Metrodata Academy',
    description: `Landing page for PT Metrodata Electronics Tbk. Developed a
      comprehensive landing page showcasing the services and solutions provided
      by Metrodata, including their major business divisions and technological
      partnerships. The landing page also highlights various Metrodata programs.
      Metrodata Training, Metrodata Internship, Metrodata IT Camp and Metrodata Mengajar.`,
    image: ma,
    link: 'https://metrodataacademy.id/',
    reverse: true,
  },
  {
    title: 'Metrodata Academy Management System',
    description: `An internal management system. Designed and implemented a robust
      internal system to streamline and manage the operations within
      Metrodata Academy.`,
    image: maAdmin,
    link: '',
    reverse: false,
  },
  {
    title: 'Akbar Picture',
    description: `A portfolio website for a wedding photography business. Created an
      elegant and user-friendly web portfolio to highlight and showcase the wedding
      photography services offered by Akbar Picture.`,
    image: akbPicture,
    link: 'https://akbarpicture.netlify.app/',
    reverse: true,
  },
];

const Portofolio = () => {
  return (
    <div
      name='portofolio'
      className='flex flex-col w-full gap-10 px-10 my-3'
    >
      <div className='flex justify-center w-full py-2 text-4xl text-center'>
        Portofolio
      </div>
      {portfolioItems.map((item, index) => (
        <section
          key={index}
          className={`flex flex-col w-full gap-4 lg:flex-row ${
            item.reverse ? 'lg:flex-row-reverse' : ''
          }`}
        >
          <div className='flex flex-col items-end w-full gap-4 lg:pt-4 lg:px-12 text-end'>
            {item.link ? (
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={item.link}
                className='text-xl font-extrabold lg:text-2xl'
              >
                {item.title}
              </a>
            ) : (
              <p className='text-xl font-extrabold lg:text-2xl'>{item.title}</p>
            )}
            <p className='text-sm lg:text-lg'>{item.description}</p>
          </div>
          {item.image ? (
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={item.link || '#'}
              className='w-full lg:max-w-[400px]'
            >
              <img
                src={item.image}
                alt={item.title}
                className='mx-auto rounded-2xl drop-shadow-md'
              />
            </a>
          ) : (
            <div className='flex items-center justify-center w-full min-h-48 px-8 py-10 text-center border border-gray-200 lg:max-w-[400px] rounded-2xl bg-gray-50 drop-shadow-md'>
              <p className='text-sm font-semibold tracking-wide text-gray-500 uppercase'>
                Confidential Project
              </p>
            </div>
          )}
        </section>
      ))}
    </div>
  )
}

export default Portofolio
