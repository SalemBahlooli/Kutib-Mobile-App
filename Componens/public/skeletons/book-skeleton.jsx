import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

const MyLoader = (props) => (
  <ContentLoader 
    rtl
    speed={2}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="white"
    foregroundColor="#030303"
    {...props}
  >
    <Rect x="195" y="186" rx="0" ry="0" width="123" height="149" />
  </ContentLoader>
)

export default MyLoader

