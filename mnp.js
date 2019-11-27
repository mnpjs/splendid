export default {
  questions: {
    'URL'({ org, name }) {
      return `https://${org}.github.io/${name}/`
    },
    'License (MIT/AGPL)': {
      getDefault() {
        return 'AGPL'
      },
      afterQuestions({ removeFile, renameFile, warning }, license) {
        if (license == 'MIT') {
          removeFile('LICENSE-AGPL')
          renameFile('LICENSE-MIT', 'LICENSE')
        } else if (license == 'AGPL') {
          removeFile('LICENSE-MIT')
          renameFile('LICENSE-AGPL', 'LICENSE')
        } else {
          warning(`Unknown license ${license}`)
        }
      },
    },
    'Keep help': {
      confirm: true,
      async afterQuestions({ updateFiles, removeFiles }, keep) {
        if (keep) await updateFiles([
          {
            re: /<!-- help: /gm,
            replacement: '<!-- ',
          },
        ], ['html', 'md'])
        else await updateFiles([
          {
            re: /^ *<!-- help: [\s\S]+? -->\s*/gm,
            replacement: '',
          },
        ], ['html', 'md'])
        removeFiles(/splendid\/.*?\/README\.md$/)
      },
    },
  },
}