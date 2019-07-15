import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>

    <h2>Products</h2>
    <div className="product-grid">
      {data.allPilonProduct.edges.map((edge, index) => {
        const product = edge.node
        return (
          <div className="product-block" key={product.sku}>
            <Link key={product.sku} to={`/products${product.slug}`}>
              {product.image && (
                <Img fluid={product.image.localFile.childImageSharp.fluid} />
              )}
            </Link>
            <h2>
              <Link key={product.sku} to={`/products${product.slug}`}>
                {product.name}
              </Link>
            </h2>
            <p>${parseFloat(product.primaryPrice).toFixed(0)}</p>
          </div>
        )
      })}
    </div>

    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query ProductsQuery {
    allPilonProduct {
      edges {
        node {
          id
          sku
          name
          slug
          primaryPrice
          image {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          additionalImages {
            image {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
