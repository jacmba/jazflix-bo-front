import { Card, CardBody, CardLink } from 'react-bootstrap'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => <div className='Home container'>
  <h1>Select management subsystem</h1>
  <div className='mt-5'>
    <div className='ManagementCard'>
      <Link to="/users">
        <Card>
          <CardBody>Users</CardBody>
        </Card>
      </Link>
    </div>
    <div className='ManagementCard'>
      <Link to="/sections">
        <Card>
          <CardBody>Sections</CardBody>
        </Card>
      </Link>
    </div>
    <div className='ManagementCard'>
      <Link to="/movies">
        <Card>
          <CardBody>Movies</CardBody>
        </Card>
      </Link>
    </div>
  </div>
</div>

export default Home