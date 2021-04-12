import { NextApiRequest, NextApiResponse } from 'next'
import repository from './repository.json'

export default (_req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json(repository)
}
