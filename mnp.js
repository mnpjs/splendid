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
      afterQuestions({ removeFiles, renameFile, warn, addFile }, license) {
        const supported = ['MIT', 'AGPL']
        if (!supported.includes(license)) {
          warn(`Unknown license ${license}`)
          return
        }
        renameFile(`LICENSE-${license}`, 'LICENSE')
        addFile('LICENSE')
        removeFiles(/LICENSE-.+$/)
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
  async afterInit({ manager }, { spawn, warn, updateFiles, removeFile }) {
    if (manager == 'yarn') {
      await spawn('yarn')
    } else {
      warn('You should run npm install in the new repository.')
    }
    await updateFiles({
      re: /# start template[\s\S]+?# end template(\n|$)/,
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
    }, { extensions: ['html', 'css'] })
    removeFile('fonts.json')
  },
}