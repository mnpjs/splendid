export default {
  questions: {
    'URL'({ org, name }) {
      return `https://${org}.github.io/${name}/`
    },
    'License (MIT/AGPL)': {
      getDefault() {
        return 'AGPL'
      },
      afterQuestions({ removeFile, renameFile, warn }, license) {
        if (license == 'MIT') {
          removeFile('LICENSE-AGPL')
          renameFile('LICENSE-MIT', 'LICENSE')
        } else if (license == 'AGPL') {
          removeFile('LICENSE-MIT')
          renameFile('LICENSE-AGPL', 'LICENSE')
        } else {
          warn(`Unknown license ${license}`)
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
  async afterInit({ manager }, { spawn, warn }) {
    if (manager == 'yarn') {
      await spawn('yarn')
    } else {
      warn('You should run npm install in the new repository.')
    }
  },
}