import next from "eslint-config-next/core-web-vitals";

export default [
  {
    ...next[0],
    ignores: [".next/**", "node_modules/**", "out/**", "dist/**"],
  },
  ...next.slice(1),
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/immutability": "off",
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/static-components": "off",
    },
  },
];
