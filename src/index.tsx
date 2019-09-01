import React from "react"
import { render } from "react-dom"
import styled from "styled-components"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 60px);
  grid-auto-rows: 60px;
`

const Item = styled.div`
  vertical-align: center;
  text-align: center;
`
const Aitem = styled(Item)`
  border-top: black solid 1px;
`
const Ritem = styled(Item)`
  /* border-top: black solid 1px; */
  border-left: black solid 1px;
  border-bottom: black solid 1px;
  border-top: black solid 1px;
  border-radius: 50% 0 0 50%;
`
const Litem = styled(Item)`
  /* border-top: black solid 1px; */
  border-right: black solid 1px;
  border-bottom: black solid 1px;
  border-top: black solid 1px;
  border-radius: 0 50% 50% 0;
`
const App = () => {
  return (
    <Grid>
      <Ritem>r</Ritem>
      <Aitem>a</Aitem>
      <Aitem>a</Aitem>
      <Aitem>a</Aitem>
      <Aitem>a</Aitem>
      <Litem>a</Litem>
    </Grid>
  )
}

render(<App />, document.querySelector("#container"))
