import * as React from "react"
import LocationFilter from "./LocationFilter"
import ResourceFilter from "./ResourceFilter"
import TweetsList from "./TweetsList"

export const Dashboard = ({ data: { resources, cities, resource, city } }) => {
  return (
    <div className="flex flex-col justify-center pt-16 px-2 lg:px-4 lg:overflow-hidden lg:flex-row lg:mt-6">
      <div className="rounded-md flex flex-col py-2 space-y-2 lg:w-6/12 z-20 sticky top-0">
        <LocationFilter data={cities} city={city} resource={resource} />
        <ResourceFilter data={resources} city={city} resource={resource} />
      </div>
      <TweetsList city={city} resource={resource} />
    </div>
  )
}
