import { Link } from 'react-scroll'

const navItems = [
  { name: 'Home', to: 'home' },
  { name: 'Portofolio', to: 'portofolio' },
  { name: 'Experience', to: 'experience' },
  { name: 'Contact Me', to: 'contact' },
]

const NavBar = () => {
  return (
    <div className='fixed top-0 left-0 z-50 flex justify-between w-full px-10 py-3 bg-white'>
      <div className='font-semibold cursor-pointer text-slate-800'>
        Pasha.dev
      </div>
      <div className='items-center justify-center hidden w-full grid-cols-4 gap-2 text-center md:grid e max-w-[500px]'>
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            smooth={true}
            duration={500}
            className='cursor-pointer'
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NavBar
