import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
import React, { useCallback, useRef } from "react"


const Test = () => {
    const tagifyRef = useRef()
    // on tag add/edit/remove
    const onChange = useCallback((e) => {
      console.log("CHANGED:"
        , e.detail.tagify.value // Array where each tag includes tagify's (needed) extra properties
        , e.detail.tagify.getCleanValue() // Same as above, without the extra properties
        , e.detail.value // a string representing the tags
      )
    }, [])

    return (
    <Tags
      tagifyRef={tagifyRef} // optional Ref object for the Tagify instance itself, to get access to  inner-methods
      defaultValue="a,b,c"
      onChange={onChange}
    />
  )
}

export default Test