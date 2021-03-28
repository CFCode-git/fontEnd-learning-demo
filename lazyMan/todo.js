/** @description
 *  实现一个 todo 可以按照以下方式调用
 *  Todo('FE') >>
 *  Hi FE !
 *
 *  Todo('FE').write('js') >>
 *  Hi FE !
 *  Write js !
 *
 *  Todo('FE').sleep(5).write('js') >>
 *  Hi FE !
 *  等待 5 秒
 *  Write js !
 *
 *  Todo('FE').sleepFirst(5).write('js') >>
 *  等待 5 秒
 *  Hi FE !
 *  Write js !
 */

function Todo(name) {
  const queue = []
  const next = () => {
    const first = queue.shift()
    first && first()
  }
  const task = () => {
    console.log(`Hi ${name}!`)
    next()
  }
  queue.push(task)
  const api = {
    write(name) {
      const task = () => {
        console.log(`Write ${name}!`)
        next()
      }
      queue.push(task)
      return api
    },
    sleep(n) {
      const task = () => {
        setTimeout(() => {
          // 等待
          next()
        }, n * 1000)
      }
      queue.push(task)
      return api
    },
    sleepFirst(n) {
      const task = () => {
        setTimeout(() => {
          // 等待
          next()
        }, n * 1000)
      }
      queue.unshift(task)
      return api
    },
  }
  setTimeout(() => {next()}, 0)
  return api
}

// Todo('FE')
// Todo('FE').write('js')
// Todo('FE').sleep(5).write('js')
Todo('FE').sleepFirst(5).write('js')
