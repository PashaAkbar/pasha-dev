import TypeIt from 'typeit-react'
import ppPicture from '../assets/foto pp.jpg'

const Home = () => {
  return (
    <div
      name='home'
      className='flex items-center justify-around w-full px-10 lg:h-screen'
    >
      <div className='flex flex-col w-full gap-10 my-20 lg:grid lg:grid-cols-2 lg:my-0'>
        <div className='flex flex-col justify-center gap-2 px-6 py-4 bg-white lg:px-20'>
          <TypeIt
            className='text-4xl font-bold'
            options={{
              strings: 'Anwaripasha Akbar',
              speed: 120,
              waitUntilVisible: true,
            }}
          />
          <TypeIt
            className='mb-3 text-2xl font-semibold '
            options={{
              speed: 120,
              waitUntilVisible: true,
              loop: true,
            }}
            getBeforeInit={(instance) => {
              instance
                .type('Software Engineer')
                .pause(200)
                .delete()
                .type('Application Developer')
                .pause(200)
                .delete()
                .type('Web Developer')
                .go()

              // Remember to return the instance!
              return instance
            }}
          />
          <p>
            He like to analyze problem and draw conclusions. He has a creative
            mind and ideas. He enjoys learning new thing related to web
            development. He completes repetitive activities with programmatic
            automation
          </p>
          <div className='flex flex-row gap-4 mt-4'>
            <a
              href='https://github.com/PashaAkbar'
              target='_blank'
            >
              <svg
                className='h-14 fill-gray-900 hover:fill-blue-600'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <path d='M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2' />
              </svg>
            </a>
            <a
              href='https://www.linkedin.com/in/anwaripasha-akbar/'
              target='_blank'
            >
              <svg
                className='h-14 fill-gray-900 hover:fill-blue-600'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <path d='M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z' />
              </svg>
            </a>
          </div>
        </div>
        <div className='flex items-center justify-center p-6 lg:p-20'>
          <div className='w-full max-w-sm overflow-hidden border border-gray-200 shadow-sm rounded-2xl'>
            <img
              src={ppPicture}
              alt='Anwaripasha Akbar'
              className='object-cover w-full aspect-[4/5]'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
