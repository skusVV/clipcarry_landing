import type { NextPage } from 'next'
import Benefits from '../../components/Benefits/Benefits';
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import Layout from '../../components/Layout/Layout'
import Pricing from '../../components/Pricing/Pricing';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Jumbotron />
      <Benefits />
      <Pricing />
    </Layout>
  )
}

export default HomePage
