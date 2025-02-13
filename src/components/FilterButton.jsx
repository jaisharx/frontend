import clsx from "clsx"
import Link from "next/link"
import * as React from "react"

/**
 * @typedef {Object} Props
 * @property {boolean} active
 * @property {Object | string} [href]
 * @property {() => unknown} [onClick]
 * @property {string} [className]
 * @property {React.ReactNode} children
 */

/**
 * @type {React.ForwardRefExoticComponent<Props>}
 */
const FilterButton = React.forwardRef(
  ({ active, href, onClick, children, className = "" }, ref) => {
    return (
      <Link href={href}>
        <a
          ref={ref}
          onClick={onClick}
          className={clsx([
            "hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-0.5 px-1 text-sm lg:text-base lg:py-2 m-1 lg:px-4 border-transparent hover:border-gray-500 rounded select-none cursor-pointer",
            active ? "bg-gray-500 text-white" : "bg-gray-200",
          ])}
        >
          {children}
        </a>
      </Link>
    )
  }
)

export default FilterButton
