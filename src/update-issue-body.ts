import * as core from '@actions/core'
import * as github from '@actions/github'

export interface Inputs {
  token: string
  repository: string
  issueNumber: number
  body: string
  editMode: string
  appendSeparator: string
  prependSeparator: string
}

function appendSeparatorTo(body: string, separator: string): string {
  switch (separator) {
    case 'newline':
      return body + '\n'
    case 'space':
      return body + ' '
    default: // none
      return body
  }
}

function prependSeparatorTo(body: string, separator: string): string {
  switch (separator) {
    case 'newline':
      return '\n' + body
    case 'space':
      return ' ' + body
    default: // none
      return body
  }
}

async function updateBody(
  octokit,
  owner: string,
  repo: string,
  issueNumber: number,
  body: string,
  editMode: string,
  appendSeparator: string,
  prependSeparator: string
): Promise<void> {
  if (body) {
    let issueBody = ''
    if (editMode == 'append') {
      // Get the issue body
      const {data: issue} = await octokit.rest.issues.get({
        owner: owner,
        repo: repo,
        issue_number: issueNumber
      })
      issueBody = appendSeparatorTo(
        issue.body ? issue.body : '',
        appendSeparator
      )
    } else if (editMode == 'prepend') {
      // Get the issue body
      const {data: issue} = await octokit.rest.issues.get({
        owner: owner,
        repo: repo,
        issue_number: issueNumber
      })
      issueBody = prependSeparatorTo(
        issue.body ? issue.body : '',
        prependSeparator
      )
    }

    if (editMode == 'prepend') {
      issueBody = body + issueBody
    } else {
      issueBody = issueBody + body
    }

    core.debug(`Issue body: ${issueBody}`)
    await octokit.rest.issues.update({
      owner: owner,
      repo: repo,
      issue_number: issueNumber,
      body: issueBody
    })
    core.info(`Updated issue id '${issueNumber}'.`)
  }
}

export async function updateIssueBody(
  inputs: Inputs,
  body: string
): Promise<void> {
  const [owner, repo] = inputs.repository.split('/')

  const octokit = github.getOctokit(inputs.token)

  await updateBody(
    octokit,
    owner,
    repo,
    inputs.issueNumber,
    body,
    inputs.editMode,
    inputs.appendSeparator,
    inputs.prependSeparator
  )
}
