const Tools = () => {
  const tools = [
    { name: 'React', detail: 'Frontend architecture', href: 'https://react.dev/' },
    { name: 'TypeScript', detail: 'Reliable application code', href: 'https://www.typescriptlang.org/' },
    { name: 'Next.js', detail: 'Production web apps', href: 'https://nextjs.org/' },
    { name: 'Vue.js', detail: 'Product interfaces', href: 'https://vuejs.org/' },
    { name: 'Tailwind CSS', detail: 'Design systems', href: 'https://tailwindcss.com/' },
    { name: 'Git & GitHub', detail: 'Team collaboration', href: 'https://github.com/' },
  ]

  return (
    <section
      name='tools'
      id='tools'
      className='section-shell section-block'
    >
      <div className='section-heading'>
        <p className='eyebrow'>Working toolkit</p>
        <h2>Tools</h2>
        <p>A focused set of technologies I use to move from idea to dependable product.</p>
      </div>
      <div className='tool-grid'>
        {tools.map((tool, index) => <a className='tool-card' href={tool.href} target='_blank' rel='noopener noreferrer' key={tool.name}>
          <span className='tool-number'>0{index + 1}</span>
          <span className='tool-name'>{tool.name}</span>
          <span className='tool-detail'>{tool.detail}</span>
          <span className='tool-link-label'>Documentation</span>
          <span className='tool-arrow' aria-hidden='true'>↗</span>
        </a>)}
      </div>
    </section>
  )
}

export default Tools
