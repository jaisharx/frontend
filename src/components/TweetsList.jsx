import { Tweet } from "react-static-tweets"
import { HiChevronDoubleDown } from "react-icons/hi"
import { useTweets } from "~/hooks/useTweets"
import Skeleton from "react-loading-skeleton"

const TweetsList = ({ city: location, resource }) => {
  const { data, error, size, setSize } = useTweets({ location, resource })

  if (error) return <div>failed to load</div>
  if (!data) return <Skeleton count={40} />

  const showMore = () => {
    setSize(size + 1)
  }

  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 20)

  if (!(location && resource)) {
    return (
      <div className="py-4 text-xl font-bold">
        Please select city and resource
      </div>
    )
  } else if (data.length > 0) {
    return (
      <>
        {
          // Tweets
          data.map((page) => {
            return page.map(({ _id: key, id: tweetId }) => (
              <div
                key={key}
                className="w-full flex flex-col items-center justify-center space-y-4 my-2 px-2"
              >
                <Tweet id={tweetId} />
              </div>
            ))
          })
        }
        {!isReachingEnd && (
          <button
            onClick={showMore}
            className="bg-indigo-200 text-indigo-700 flex items-center justify-center px-4 py-2 rounded-md gap-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={data[0].length % 20 !== 0}
          >
            Show more
            <HiChevronDoubleDown />
          </button>
        )}
      </>
    )
  } else {
    // Error
    return (
      <div className="text-center">
        No tweets found{" "}
        {location
          ? " for " + location + (resource ? " & " + resource : "")
          : ""}
        . This might be a bug, please DM on Twitter to let me know.
        <br />
        <a
          target="_blank"
          href="https://twitter.com/covid_army"
          className="text-blue-600"
        >
          @covid_army
        </a>
      </div>
    )
  }
}

export default TweetsList
