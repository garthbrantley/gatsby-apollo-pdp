import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import fetch from "isomorphic-fetch"

const getCustomerSessionId = async environmentId =>
  await fetch("https://api.pilon.io/customer-sessions", {
    method: "post",
    body: JSON.stringify({
      environment: `/environments/${environmentId}`,
    }),
    headers: {
      "Content-Type": `application/json`,
      Accept: `application/json`,
    },
  })
    .then(res => res.json())
    .then(json => json.id)

const httpLink = createHttpLink({
  uri: "https://api.pilon.io/graphql",
})

const authLink = setContext(async (_, { headers }) => {
  const customerSessionId = await getCustomerSessionId(
    "f0ae3074-0abc-11e9-ac24-75bf70175027"
  )
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: customerSessionId
        ? `CUSTOMER-SESSION-ID ${customerSessionId}`
        : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  fetch,
})

export default client
