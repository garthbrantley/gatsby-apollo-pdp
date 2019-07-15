import React from "react"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"

const Wrapper = styled.div`
  padding: 180px 0;

  .grid {
    display: grid;
    grid-column-gap: 1.5vw;
    grid-template-columns:
      [start] minmax(9%, 1fr) repeat(
        12,
        [col-start] minmax(0px, 70px) [col-end]
      )
      minmax(9%, 1fr) [end];
  }

  .image-column {
    grid-column: start / 6 col-end;
  }

  .info-column {
    grid-column: 8 col-start / 12 col-end;

    .info {
      border-bottom: 1px solid #000;

      header {
        margin: 36px 0 12px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;

        h1 {
          font-size: 24px;
          font-weight: 400;
          letter-spacing: 0.6px;
          margin: 0;
          text-transform: uppercase;
        }

        span {
          margin: 0;
          font-size: 24px;
          font-weight: 400;
          letter-spacing: 0.6px;
        }
      }

      p {
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.4px;
        line-height: 1.38;
      }
    }

    .buy {
      display: flex;
      justify-content: space-between;
      margin-top: 2em;

      .qty {
        width: 36%;
      }
      .add {
        width: 56%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 10px;
        font-weight: 900;
        letter-spacing: 0.3px;
        line-height: 1;
        text-transform: uppercase;
        text-decoration: none;
        background-color: #452946;
        color: #fff;
        :hover {
          border-color: #000;
          background-color: #000;
        }
      }
    }
  }
`

const ProductDetails = ({ data: { pilonProduct: product } }) => (
  <Layout>
    <Wrapper>
      <div className="grid">
        <div className="image-column">
          <Img fluid={product.image.localFile.childImageSharp.fluid} />
        </div>
        <div className="info-column">
          <div className="info">
            <header>
              <h1>{product.name}</h1>
              <span>${parseFloat(product.primaryPrice).toFixed(0)}</span>
            </header>
            <p>{product.shortDesc}</p>
          </div>
          <div className="buy">
            <input className="qty" value="1" />
            <a className="add" href="/">
              Add to Bag
            </a>
          </div>
        </div>
      </div>
    </Wrapper>
  </Layout>
)

export default ProductDetails

export const query = graphql`
  query($slug: String!) {
    pilonProduct(slug: { eq: $slug }) {
      slug
      sku
      shortDesc
      longDesc
      name
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
    }
  }
`
