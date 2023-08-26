import React from 'react'
import Stories from '../../components/Stories/Stories'
import Posts from '../../components/Posts/Posts'
import './Home.scss'

const Home = () => {
  return (
    <div className='home'>
      <Stories/>
      <Posts/>
    </div>
  )
}

export default Home