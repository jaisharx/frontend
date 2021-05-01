import { gql } from "./utils"

const endpoint = process.env.UPSTASH_GRAPHQL_ENDPOINT
const token = process.env.UPSTASH_ADMIN_TOKEN

const buildFetchConfig = ({
  query = undefined,
  mutation = undefined,
  variables = undefined,
}) => {
  if (typeof mutation === "undefined" && typeof query === "undefined") {
    throw new Error("Both query and mutation cannot be undefined.")
  }

  const body = {}

  if (typeof query !== "undefined") {
    body.query = query
  }

  if (typeof mutation !== "undefined") {
    body.mutation = mutation
  }

  if (typeof variables !== "undefined") body.variables = variables

  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  }
}

const queries = {
  getTweetKeys: gql`
    query GetTweetKeys {
      redisKeys(pattern: "tweet_*")
    }
  `,
  getTweets: gql`
    query GetTweets($keys: [String!]!) {
      redisMGet(keys: $keys)
    }
  `,
}

const mutations = {
  addTweet: gql`
    mutation AddTweet($key: String!, $value: String!) {
      redisSetNX(key: $key, value: $value)
    }
  `,
}

const getTweetKeys = async () => {
  return await fetch(
    endpoint,
    buildFetchConfig({ query: queries.getTweetKeys })
  )
}

export const getTweets = async () => {
  const keys = await getTweetKeys()
  return await fetch(
    endpoint,
    buildFetchConfig({ query: queries.getTweets, variables: { keys } })
  )
}

export const cleanTweets = () => {}

export const addTweets = async (tweets) => {
  const promises = []
  for (const tweet of tweets) {
    promises.push(
      fetch(
        endpoint,
        buildFetchConfig({
          mutation: mutations.addTweet,
          variables: {
            key: `tweet_${tweet.id}`,
            value: JSON.stringify(tweet),
          },
        })
      )
    )
  }
}
