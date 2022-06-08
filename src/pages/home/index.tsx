import type { NextPage } from 'next'
import Benefits from '../../components/Benefits/Benefits';
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import Layout from '../../components/Layout/Layout'

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Jumbotron />
      <Benefits />
    </Layout>
  )
}

export default HomePage
