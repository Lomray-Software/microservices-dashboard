module.exports = {
  branches: ['prod'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ["@semantic-release/github", {
      "assets": [
        {"path": "build.zip", "label": "Build-${nextRelease.gitTag}"},
      ]
    }],
  ]
}
