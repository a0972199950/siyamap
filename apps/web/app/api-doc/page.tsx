import { getApiDocs } from '@/lib/swagger'

import ReactSwagger from './components/ReactSwagger'

const PageApiDoc = async () => {
  const spec = await getApiDocs()

  return <ReactSwagger spec={spec} />
}

export default PageApiDoc
