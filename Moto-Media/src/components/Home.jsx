import '../App.css'
import Carousel from 'react-bootstrap/Carousel';
import HomeMoto from '../photos/HomeMoto.drawio.png'


export default function Home () {

  return(
    <div className='heroPage'>
      <h1 style={{fontSize: '40px'}}><u>Home</u></h1>
      <Carousel>
        <Carousel.Item>
          <img
            style={{ width: '600px', height: '500px' }}
            className='d-block w-100'
            src={HomeMoto}
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>Kendrick Lamar</h3>
            <p>Coming Soon</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: '600px', height: '500px' }}
            className='d-block w-100'
            src={HomeMoto}
            alt='Second slide'
          />
          <Carousel.Caption>
            <h3>Eminem</h3>
            <p>Coming Soon</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: '600px', height: '500px' }}
            className='d-block w-100'
            src={HomeMoto}
            alt='Third slide'
          />
          <Carousel.Caption>
            <h3>Jay-Z</h3>
            <p>Coming Soon</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      
    </div> 
  )
  
}