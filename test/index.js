'use strict'

import test from 'blue-tape'
import assertAhead from '../'
import {stub} from 'sinon'
import sinonPromise from 'sinon-as-promised'
import Promise from 'bluebird'
import git from 'git-child'

sinonPromise(Promise)

test((t) => {
  stub(git, 'revParse').resolves('master\n')
  stub(git, 'revList').resolves('1')
  let err
  return assertAhead()
    .catch((e) => {
      err = e
    })
    .finally(() => {
      t.ok(/origin\/master is ahead/.test(err))
    })
})
