const ContactMe = () => {
  return (
    <footer id='contact' className='contact-section'>
      <div className='site-container contact-inner'>
        <div>
          <p className='eyebrow'>Have a project in mind?</p>
          <h2>Let&apos;s make something useful.</h2>
          <p>I&apos;m available for product work, freelance projects, and thoughtful collaborations.</p>
        </div>
        <a className='button button-primary' href='mailto:pashaakbar52@gmail.com'>
          pashaakbar52@gmail.com <span aria-hidden='true'>↗</span>
        </a>
      </div>
      <div className='site-container footer-meta'>
        <p>&copy; {new Date().getFullYear()} Anwaripasha Akbar</p>
        <a href='#home'>Back to top ↑</a>
      </div>
    </footer>
  )
}

export default ContactMe
