# NPM Publishing Guide

This guide explains how to set up automated npm publishing for the useful-cli-tool package using GitHub Actions.

## Prerequisites

- GitHub repository: `martinwichner/useful-cli-tool`
- npm account with publishing permissions
- GitHub repository access with admin rights

## Step 1: Create NPM Automation Token

1. Log in to [npmjs.com](https://www.npmjs.com/)
2. Go to your account settings (click your profile picture → Account)
3. Navigate to "Access Tokens" in the left sidebar
4. Click "Generate New Token" → "Automation"
5. Give it a descriptive name like "useful-cli-tool-github-actions"
6. Enable the following scope:
   - `Publish` (write access to publish packages)
7. Set "Bypass 2FA" to **enabled**, so CI can publish successfully when two-factor authentication is active on your account.
8. Copy the generated token immediately (you won't see it again!)

## Step 2: Configure GitHub Secrets

1. Go to your GitHub repository: https://github.com/martinwichner/useful-cli-tool
2. Click "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Name: `NPM_TOKEN`
6. Value: Paste your npm automation token
7. Click "Add secret"

## Step 3: Create a Release

To trigger automated publishing:

1. Go to the "Releases" section of your GitHub repository
2. Click "Create a new release"
3. Choose a tag version (e.g., `v1.0.0`)
4. Title: "Release v1.0.0"
5. Description: Brief description of changes
6. Click "Publish release"

## Step 4: Monitor the Publishing Workflow

1. Go to the "Actions" tab in your GitHub repository
2. You should see a workflow run for "Publish to npm"
3. Click on the workflow run to monitor progress
4. The workflow will:
   - Run tests on multiple Node.js versions
   - Check code coverage (minimum 80%)
   - Validate package.json
   - Build the project
   - Publish to npm (dry-run first, then real publish)

## Workflow Details

The publishing workflow (`.github/workflows/publish.yml`) includes:

- **Quality Gates**: Tests must pass, coverage ≥80%, no linting errors
- **Multi-Version Testing**: Node.js 18, 20, 22
- **Package Validation**: Checks package.json integrity
- **Dry Run**: Tests publishing without actually publishing
- **Automated Publishing**: Publishes to npm on successful validation

## Quality Gates

The workflow ensures:
- ✅ TypeScript compilation succeeds
- ✅ ESLint passes with no errors
- ✅ All tests pass (41/41)
- ✅ Test coverage ≥ 80%
- ✅ package.json has all required fields
- ✅ Version is available on npm
- ✅ Dry-run publish succeeds before actual publish

## Troubleshooting

### Publishing Fails
- Check that NPM_TOKEN is correctly set in GitHub secrets
- Verify the token has automation permissions
- Ensure package name is available on npm
- If you have two-factor authentication (2FA) on npm enabled, make sure the token is a **Granular/Automation token with "Bypass 2FA" enabled**
- If you still see E403, generate a fresh token and re-add it to GitHub secrets

### Tests Fail in CI
- Run `npm test` locally to debug
- Check Node.js version compatibility
- Verify all dependencies are properly declared

### Coverage Too Low
- Run `npm run test:coverage` to see detailed coverage
- Add tests for uncovered lines
- Minimum threshold is 80%

## Manual Publishing (Fallback)

If automated publishing doesn't work, you can publish manually:

```bash
# Build the project
npm run build

# Login to npm
npm login

# Publish
npm publish
```

## Version Management

- Use semantic versioning (MAJOR.MINOR.PATCH)
- Update version in package.json before creating releases
- GitHub releases automatically trigger publishing

## Security Notes

- Never commit NPM_TOKEN to your repository
- Use automation tokens, not your personal npm token
- Regularly rotate tokens for security
- The publishing workflow only runs on release creation, not on regular pushes

## Support

If you encounter issues:
1. Check the Actions tab for workflow logs
2. Verify all prerequisites are met
3. Review this guide for common solutions
4. Check npm status: https://status.npmjs.org/
