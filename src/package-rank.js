import { jqt } from 'rqt'
import argufy from 'argufy'
import { b, c } from 'erte'
import usually from 'usually'
import { version } from '../package.json'

const args = argufy({
  'package': { command: true },
  'search': { short: 's' },
  'version': { short: 'v', boolean: true },
  'help': { short: 'h', boolean: true },
})
const _package = args['package']
const _search = args['search']
const _version = args['version']
const _help = args['help']

if (_help) {
  console.log(usually({
    description: 'Shows the package rank in the NPM search using npms.io API.',
    example: 'package-rank documentary -s documentation',
    line: 'package-rank PACKAGE_NAME -s SEACH_QUERY [-vh]',
    usage: {
      '--search, -s': 'The search query to check.',
      '--version, -v': 'Show the version.',
      '--help, -h': 'Display help.',
    },
  }))
  process.exit()
} else if (_version) {
  console.log(version)
  process.exit()
}

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