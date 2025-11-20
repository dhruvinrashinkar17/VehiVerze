# @vehiverze/eslint-config

Shared ESLint configuration for the Vehiverze monorepo.

## Available Configurations

- `base.js` - Base ESLint configuration with Turbo support
- `nextjs.js` - Configuration for Next.js applications
- `react-internal.js` - Configuration for React component libraries

## Usage

In your `.eslintrc.js`:

```js
module.exports = {
  extends: ["@vehiverze/eslint-config/nextjs"],
};
```


