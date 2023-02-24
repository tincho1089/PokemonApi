import { Link } from 'react-router-dom'
import './NotFound.scss'

export default function NotFound() {
  return (
    <div className='not-found'>
      <h1 className='not-found-title'>Lost your way?</h1>
      <p>Sorry, we can not find that page. You will find lots to explore on the home page.</p>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <div className='not-found-button'>Pokemon Home</div>
      </Link>
    </div>
  )
}
