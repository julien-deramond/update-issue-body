# Update issue body

[![CI](https://github.com/julien-deramond/update-issue-body/workflows/CI/badge.svg)](https://github.com/julien-deramond/update-issue-body/actions?query=workflow%3ACI)
[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Update%20Issue%20Body-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=)](https://github.com/marketplace/actions/update-issue-body)

A GitHub action to update issue's body.

_This is heavily based on [peter-evans/create-or-update-comment](https://github.com/peter-evans/create-or-update-comment/)._

## Usage

###  Replace issue body

```yaml
- name: Update Issue Body
  uses: julien-deramond/update-issue-body@v1
  with:
    issue-number: ${{ github.event.issue.number }}
    body: |
      **Edit**: Some new content
    edit-mode: replace
```

### Append content to issue body

```yaml
- name: Append Issue Body
  uses: julien-deramond/update-issue-body@v1
  with:
    issue-number: ${{ github.event.issue.number }}
    body: |
      **Edit**: Append some new content separated by a space
    edit-mode: append
    append-separator: space
```

### Prepend content to issue body

```yaml
- name: Prepend Issue Body
  uses: julien-deramond/update-issue-body@v1
  with:
    issue-number: ${{ github.event.issue.number }}
    body: |
      **Edit**: Prepend some new content separated by a space
    edit-mode: prepend
    prepend-separator: space
```

### Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `token` | `GITHUB_TOKEN` (`issues: write`) or a `repo` scoped [PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). | `GITHUB_TOKEN` |
| `repository` | The full name of the repository in which to update the issue body. | Current repository |
| `issue-number` | The number of the issue to be updated. | |
| `body` | The issue body. | |
| `edit-mode` | The mode when updating the issue body, `replace`, `append` or `prepend`. | `append` |
| `append-separator` | The separator to use when appending to an existing issue body. (`newline`, `space`, `none`) | `newline` |
| `prepend-separator` | The separator to use when prepending to an existing issue body. (`newline`, `space`, `none`) | `newline` |


### Accessing issues in other repositories

You can update issue body in another repository by using a [PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) instead of `GITHUB_TOKEN`.
The user associated with the PAT must have write access to the repository.

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/julien-deramond/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/julien-deramond/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](LICENSE)
