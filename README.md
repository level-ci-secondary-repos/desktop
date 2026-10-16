# Desktop

Minimal primary application for local secondary-repository testing.

In the GlassesUSA topology this repository represents an application:

- import `level-ci-secondary-repos/desktop` as the primary Level CI project;
- scan `main` once with `OVERALL` scope to establish its baseline;
- connect `level-ci-secondary-repos/checkout` as a secondary repository.

The healthcheck repository generates the reports. This repository's GitHub
Actions workflow dispatches scans for its own changes and forwards secondary
scan requests from checkout.

## Run locally

```sh
npm install
npm run dev
```

The application is available at <http://127.0.0.1:1342>. Its pages are analyzed
by the Playwright tests in `healthcheck`.

## GitHub Actions

`.github/workflows/level-ci.yml` runs on pull request and on push to `main`.
It also receives `level-ci-scan-request` repository dispatches from checkout.
For desktop changes, it sends desktop's branch, commit, and pull request to
healthcheck with no secondary key. For checkout changes, it forwards
checkout's branch, commit, pull request, and secondary repository key.

Desktop assembles the application before dispatching healthcheck. Secondary
scans combine desktop `main` with the triggering checkout commit, while
desktop-originated scans combine the triggering desktop commit with checkout
`main`. The assembled application is uploaded as a workflow artifact.
Healthcheck downloads that artifact, runs the tests, and uploads to Level CI.

Configure `CHECKOUT_REPOSITORY_READ_TOKEN` with read access to checkout and
`HEALTHCHECK_DISPATCH_TOKEN` with write access to healthcheck's contents.
