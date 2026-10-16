# Desktop

Primary application fixture for Level CI secondary-repository testing.

Repository: <https://github.com/level-ci-secondary-repos/desktop>

In Level CI, import this repository as the primary project, establish the
`main` baseline with an `OVERALL` scan, and connect
`level-ci-secondary-repos/checkout` as a secondary repository.

## Role in the scan flow

Desktop owns application assembly:

- Desktop-originated scans combine the triggering desktop commit with checkout
  `main`.
- Checkout-originated scans combine desktop `main` with the triggering
  checkout commit.
- The assembled application is uploaded as a one-day GitHub Actions artifact.
- Desktop dispatches healthcheck with the artifact identity and opaque Level
  CI attribution metadata.

Desktop does not run Playwright or upload to Level CI. Healthcheck owns those
steps.

## Run locally

```sh
npm install
ln -s ../ca-7126-m-01-checkout checkout
npm run dev
```

The application is available at <http://127.0.0.1:1342>. Its pages are analyzed
by the Playwright tests in `ca-7126-h-01-healthcheck`. Remove the local
`checkout` symlink when it is no longer needed.

## GitHub Actions

`.github/workflows/level-ci.yml` runs on pull request and on push to `main`.
It also receives `level-ci-scan-request` repository dispatches from checkout.

Configure these Actions secrets:

- `CHECKOUT_REPOSITORY_READ_TOKEN`: fine-grained PAT with Contents read access
  to `level-ci-secondary-repos/checkout`.
- `HEALTHCHECK_DISPATCH_TOKEN`: fine-grained PAT with Contents read/write
  access to `level-ci-secondary-repos/healthcheck`.

See healthcheck's `TOKEN-SETUP.md` for complete PAT instructions.
