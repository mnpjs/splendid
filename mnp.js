import fonts from './fonts'
const font = fonts[Math.floor(Math.random() * fonts.length)]

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
            replacement() {
              this.debug('Updating help in %s', this.path)
              return '<!-- '
            },
          },
        ], { extensions: ['html', 'md'] })
        else {
          await updateFiles([
            {
              re: /^ *<!-- help: [\s\S]+? -->\s*/gm,
              replacement() {
                this.debug('Removing help from %s', this.path)
                return ''
              },
            },
          ], { extensions: ['html', 'md'] })
          removeFiles(/splendid\/.*?\/README\.md$/)
        }
      },
    },
  },
  async afterInit({ manager }, { spawn, warn, updateFiles }) {
    if (manager == 'yarn') {
      await spawn('yarn')
    } else {
      warn('You should run npm install in the new repository.')
    }
    await updateFiles({
      re: /# start template[\s\S]+?#end template(\n|$)/,
      replacement() {
        this.debug('Fixing .gitignore %s', this.path)
        return ''
      },
    }, { file: '.gitignore' })
    await updateFiles({
      re: /{{ font }}/g,
      replacement() {
        this.debug('Setting font in %s', this.path)
        return font
      },
    }, { file: '.gitignore' })
  },
}