const { resolve } = require('path')

// use it to load the variables into all vue files
function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        resolve(__dirname, './src/assets/sass/variables.scss')
      ]
    })
}

module.exports = {
  siteName: 'Gridsome Multilanguage Website',
  siteDescription: 'A demonstration website of use Storyblok with Gridsome',
  siteUrl: 'https://cc82e447.me.storyblok.com/',
  plugins: [
    {
      use: 'gridsome-source-storyblok',
      options: {
        client: {
          accessToken: 'RNudBjtry9FtkdVQfMxqaAtt' // Your_Access_Token_Here
        },
        version: 'published',
        downloadImages: true,
        imageDirectory: 'assets/images',
        types: {
          story: {
            params: {
              resolve_relations: 'blog-post.next_post'
            }
          }
        }
      }
    }
  ],
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    
    types.forEach(type => {
      addStyleResource(config.module.rule('sass').oneOf(type))
    })

    // or if you use scss
    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
	}
}
