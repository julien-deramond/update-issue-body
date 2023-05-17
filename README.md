# Update issue body

A GitHub action to update issue's body

_This is strongly based on [peter-evans/create-or-update-comment](https://github.com/peter-evans/create-or-update-comment/)_

## Usage

###  Replace issue body

```yaml
- name: Update Issue Body
  uses: julien-deramond/update-issue-body@v0.0.1
  with:
    issue-number: ${{ github.event.issue.number }}
    body: |
      **Edit**: Some new content
    edit-mode: replace
```

### Append content to issue body

```yaml
- name: Append Issue Body
  uses: julien-deramond/update-issue-body@v0.0.1
  with:
    issue-number: ${{ github.event.issue.number }}
    body: |
      **Edit**: Append some new content separated by a space
    edit-mode: append
    

```

### Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `token` | `GITHUB_TOKEN` (`issues: write`) or a `repo` scoped [PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). | `GITHUB_TOKEN` |
| `repository` | The full name of the repository in which to update the issue body. | Current repository |
| `issue-number` | The number of the issue to be updated. | |
| `body` | The issue body. | |
| `edit-mode` | The mode when updating the issue body, `replace` or `append`. | `append` |
| `append-separator` | The separator to use when appending to an existing issue body. (`newline`, `space`, `none`) | `newline` |


### Accessing issues in other repositories

You can update issue body in another repository by using a [PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) instead of `GITHUB_TOKEN`.
The user associated with the PAT must have write access to the repository.

## License

[MIT](LICENSE)
