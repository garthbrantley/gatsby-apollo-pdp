import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import styled from 'styled-components'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const Wrapper = styled.div`
  .product-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 5vw;
    @media (min-width: 768px) {
      margin: 0 40px;
    }
    margin: 0 0;
  }

  .product-block {
    margin: 0 0 60px;

    @media (min-width: 768px) {
      grid-column: span 6 / auto;
    }
    @media (min-width: 1024px) {
      grid-column: span 4 / auto;
    }
    grid-column: span 12 / auto;
    text-align: center;

    h2 {
      margin: 36px 0 12px 0;
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 0.3px;
      text-transform: uppercase;
    }

    p {
      font-size: 16px;
      font-weight: 400;
      line-height: 1.38;
      color: #929292;
    }

    a,
    a:link,
    a:visited {
      font-size: 12px;
      line-height: 1.4;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      color: #000;
      text-decoration: none;

      svg {
        margin-left: 12px;
        stroke: #000;
        width: 60px;
      }
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    <Wrapper>
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
    </Wrapper>
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
