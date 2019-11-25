export default {
  questions: {
    'URL'({ org, name }) {
      return `https://${org}.github.io/${name}/`
    },
    'License (MIT/AGPL)'() {
      return `AGPL`
    },
  },
}