import React from 'react'
import { TypeAnimation } from 'react-type-animation'

// eslint-disable-next-line react/prop-types
const Card = ({ className }) => {
  return (
    <div className={`card p-4 ${className}`}>
      <div className='tools flex items-center mb-2'>
        <div className='circle pr-[4px]'>
          <span className='red box inline-block flex items-center w-[10px] h-[10px] p-[1px] rounded-full bg-[#ff605c]'></span>
        </div>
        <div className='circle px-[4px]'>
          <span className='yellow box inline-block flex items-center w-[10px] h-[10px] p-[1px] rounded-full bg-[#ffbd44]'></span>
        </div>
        <div className='circle px-[4px]'>
          <span className='green box inline-block flex items-center w-[10px] h-[10px] p-[1px] rounded-full bg-[#00ca4e]'></span>
        </div>
      </div>
      <div>Hallo All!</div>
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed once, initially
          "I'm Anwaripasha Akbar",
          1000,
          "I'm Software Engineer",
          1000,
          "I'm Web Developer",
          1000,
        ]}
        speed={50}
        style={{ fontSize: '2em' }}
        repeat={Infinity}
      />
      <div className='card__content mt-2 '>
        <p>This is the content inside the card.</p>
      </div>
    </div>
  )
}

export default Card
