const ContactMe = () => {
  return (
    <footer className='px-10 py-8 text-gray-800 bg-white'>
      <div className='container flex flex-col items-center justify-between mx-auto md:flex-row'>
        <div className='mb-4 text-center md:text-left md:mb-0'>
          <h2 className='text-2xl font-semibold'>Contact Me</h2>
          <p className='text-sm'>
            I'm available for freelance, work and projects. Feel free to reach
            out!
          </p>
        </div>
        <div className='text-center md:text-right'>
          <p className='text-sm'>
            Email:{' '}
            <a
              href='mailto:youremail@example.com'
              className='text-blue-500 hover:underline'
            >
              pashaakbar52@gmail.com
            </a>
          </p>
        </div>
      </div>
      <div className='pt-4 mt-24 text-center border-t border-gray-200'>
        <p className='text-sm'>
          &copy; {new Date().getFullYear()} Anwaripasha Akbar. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}

export default ContactMe
