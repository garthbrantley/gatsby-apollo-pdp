/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allPilonProduct {
        edges {
          node {
            sku
            name
            slug
            shortDesc
            longDesc
            image {
              id
              contentUrl
              localFile {
                childImageSharp {
                  fluid {
                    src
                    srcSet
                    aspectRatio
                    srcSet
                    aspectRatio
                  }
                }
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.allPilonProduct.edges.forEach(({ node }) => {
      createPage({
        path: `products${node.slug}`,
        context: {
          slug: node.slug,
        },
        component: path.resolve(`./src/templates/productDetails.js`),
      })
    })
  })
}
