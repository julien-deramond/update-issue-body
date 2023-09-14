import * as core from '@actions/core'
import {Inputs, updateIssueBody} from './update-issue-body'
import {inspect} from 'util'
import * as utils from './utils'

function getBody(inputs: Inputs) {
  if (inputs.body) {
    return inputs.body
  } else {
    return ''
  }
}

async function run(): Promise<void> {
  try {
    const inputs: Inputs = {
      token: core.getInput('token'),
      repository: core.getInput('repository'),
      issueNumber: Number(core.getInput('issue-number')),
      body: core.getInput('body'),
      editMode: core.getInput('edit-mode'),
      appendSeparator: core.getInput('append-separator'),
      prependSeparator: core.getInput('prepend-separator')
    }

    core.debug(`Inputs: ${inspect(inputs)}`)

    if (!['append', 'prepend', 'replace'].includes(inputs.editMode)) {
      throw new Error(`Invalid edit-mode '${inputs.editMode}'.`)
    }

    if (!['newline', 'space', 'none'].includes(inputs.appendSeparator)) {
      throw new Error(`Invalid append-separator '${inputs.appendSeparator}'.`)
    }

    if (!['newline', 'space', 'none'].includes(inputs.prependSeparator)) {
      throw new Error(`Invalid prepend-separator '${inputs.prependSeparator}'.`)
    }

    const body = getBody(inputs)

    if (inputs.issueNumber) {
      if (!body) {
        throw new Error("Missing comment 'body'.")
      }
    } else {
      throw new Error("Missing 'issue-number'.")
    }

    updateIssueBody(inputs, body)
  } catch (error) {
    core.debug(inspect(error))
    const errMsg = utils.getErrorMessage(error)
    core.setFailed(errMsg)
    if (errMsg == 'Resource not accessible by integration') {
      core.error(`See this action's readme for details about this error`)
    }
  }
}

run()
