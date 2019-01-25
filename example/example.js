/* yarn example/ */
import packageRank from '../src'

(async () => {
  const res = await packageRank({
    text: 'example',
  })
  console.log(res)
})()