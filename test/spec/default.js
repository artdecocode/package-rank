import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import packageRank from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof packageRank, 'function')
  },
  async 'calls package without error'() {
    await packageRank()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await packageRank({
      text: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T