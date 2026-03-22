import { NextPage } from 'next'

import api from '@/lib/api-client'

import PageVenueClient from './components/PageVenueClient'

export const dynamic = 'force-dynamic'

const PageVenue: NextPage = async () => {
  const { data } = await api.getVenues()

  return <PageVenueClient initialVenues={data} />
}

export default PageVenue
