import { jqt } from 'rqt'
import argufy from 'argufy'
import { b, c } from 'erte'

const args = argufy({
  'package': { command: true },
  'search': { short: 's' },
})
const _package = args['package']
const _search = args['search']

const req = async (pckg, search, n = 0) => {
  const { 'results': results } = await jqt(`https://api.npms.io/v2/search?q=${search}&size=250&from=${n}`)
  /** @type {[]} */
  const packages = results.map(({ 'package': p }) => p)
  const i = packages.findIndex(({ 'name': n }) => n == pckg)
  if (i != -1) {
    return n + i
  } else {
    const newN = n + 250
    console.log(newN)
    return await req(pckg, search, newN)
  }
}
;(async () => {
  try {
    if (!_package) throw new Error('Specify package name.')
    if (!_search) throw new Error('Specify search query.')
    const res = await req(_package, _search)
    console.log('Found: %s', res)
  } catch (err) {
    if (process.env['DEBUG']) console.log(c(err.stack, 'red'))
    else console.log(b(err.message, 'red'))
  }
})()