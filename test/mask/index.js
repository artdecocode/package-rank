import { makeTestSuite } from 'zoroaster'
import Context from '../context'
import packageRank from '../../src'

const ts = makeTestSuite('test/result', {
  async getResults(input) {
    const res = await packageRank({
      text: input,
    })
    return res
  },
  context: Context,
})

// export default ts
