import { jqt } from 'rqt'
import argufy from 'argufy'
import { b } from 'erte'

const { package, search } = argufy({
  package: { command: true },
  search: { short: 's' },
})

const req = async (package, n = 0) => {
  const { results } = await jqt(`https://api.npms.io/v2/search?q=${search}&size=250&from=${n}`)
  /** @type {[]} */
  const packages = results.map(({ package }) => package)
  const i = packages.findIndex(({ name }) => name == package)
  if (i != -1) {
    return n + i
  } else {
    const newN = n + 250
    console.log(newN)
    return await req(package, newN)
  }
}
;(async () => {
  try {
    if (!package) throw new Error('Specify package name.')
    if (!search) throw new Error('Specify search query.')
    const res = await req(package)
    console.log('Found: %s', res)
  } catch (err) {
    console.log(b(err.message, 'red'))
  }
})()