const commitConfig = {
  extends: ["@commitlint/config-conventional", "@commitlint/cli"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "chore",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "revert",
      ],
    ],

    "subject-case": [2, "always", "sentence-case"],
  },
};

export default commitConfig;
