import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'

const navItems = [
  { name: 'Home', to: 'home' },
  { name: 'Portfolio', to: 'portfolio' },
  { name: 'Experience', to: 'experience' },
  { name: 'Tools', to: 'tools' },
  { name: 'Contact', to: 'contact' },
]

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false)
    window.addEventListener('resize', closeMenu)
    return () => window.removeEventListener('resize', closeMenu)
  }, [])

  return (
    <header className='site-nav'>
      <div className='site-container nav-inner'>
        <Link
          to='home'
          smooth
          duration={500}
          className='brand-mark'
          aria-label='Back to home'
          onClick={() => setIsMenuOpen(false)}
        >
          Pasha<span>.dev</span>
        </Link>
        <button
          type='button'
          className='menu-toggle'
          aria-expanded={isMenuOpen}
          aria-controls='primary-navigation'
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id='primary-navigation'
          className={`primary-navigation ${isMenuOpen ? 'is-open' : ''}`}
          aria-label='Primary navigation'
        >
          {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            smooth={true}
            duration={500}
            className='nav-link'
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default NavBar
