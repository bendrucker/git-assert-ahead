'use strict'

import Promise from 'bluebird'
import git from 'git-child'

export default function assertAhead (branch) {
  return Promise.resolve(branch || git.revParse({
    abbrevRef: true,
    _: 'HEAD'
  }))
  .call('trim')
  .then((b) => {
    branch = b
    return git.revList({
      _: `${branch}..origin/${branch}`,
      count: true
    })
    .call('trim')
    .then(parseInt)
  })
  .then((count) => {
    if (count) throw new Error(`origin/${branch} is ahead of local branch`)
  })
}
