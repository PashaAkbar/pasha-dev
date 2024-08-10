import ma from '../assets/metrodata-academy.png'
import maAdmin from '../assets/metrodata-admin.png'
import akbPicture from '../assets/akbar-picture.png'

const portfolioItems = [
  {
    title: 'Metrodata Academy',
    description: `Landing page for PT Metrodata Electronics Tbk. Developed a
      comprehensive landing page showcasing the services and solutions provided
      by Metrodata, including their major business divisions and technological
      partnerships. The landing page also highlights various Metrodata programs.
      Metrodata Training, Metrodata Internship, Metrodata IT Camp and Metrodata Mengajar.`,
    image: ma,
    link: 'https://metrodataacademy.id/',
    reverse: false,
  },
  {
    title: 'Metrodata Academy Management System',
    description: `An internal management system. Designed and implemented a robust
      internal system to streamline and manage the operations within
      Metrodata Academy.`,
    image: maAdmin,
    link: '',
    reverse: true,
  },
  {
    title: 'Akbar Picture',
    description: `A portfolio website for a wedding photography business. Created an
      elegant and user-friendly web portfolio to highlight and showcase the wedding
      photography services offered by Akbar Picture.`,
    image: akbPicture,
    link: 'https://akbarpicture.netlify.app/',
    reverse: false,
  },
]

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
        </section>
      ))}
    </div>
  )
}

export default Portofolio
