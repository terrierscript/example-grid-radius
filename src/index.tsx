import React from "react"
import { render } from "react-dom"
import styled, { ThemeProvider } from "styled-components"


const snaker = (num) => {
  const header = ["rad-0", "line-h", "line-h","."]
  const templateL = [
    ["rad", "cnt", "cnt","."],
    ["rad", "line","line", "__"]
  ]
  const templateR = templateL.map( t => t.concat().reverse())
  const base = Array(num).fill(null).map( (_,i) => {
    const template =  (i % 2 == 0)? templateL : templateR
    return template.map( (line) => line.map((cell,j) => {
      if(cell === ".") return "."
      if(cell === "__"){ 
        return (i === num-1)
          ? `.` 
          : `rad-${i+1}`
      }
      return `${cell}-${i}`
    }))
  }).flat()
  const b = 
    [header,...base]
    .map((l,i) => {
      const size = i % 2 == 0 ? "1px" : "1fr"
      return `"${l.join("\t")}" ${size}`
    }).join("\n")
  
  const footer = "/ 3em 1fr 3em"
  return [b, footer].join("\n")
}

const Area = styled.div`
  grid-area: ${({area}) => area};
`

const Line = styled(Area)`
  background: ${({theme}) => theme.line};
`
const Rad = styled(Area)`
  border-bottom: ${({theme}) => theme.line} solid 1px;
  border-top: ${({theme}) => theme.line} solid 1px;
  width: ${({theme}) => theme.radius};
`
const RadR = styled(Rad)`
  border-left: ${({theme}) => theme.line} solid 1px;
  border-radius: 100% 0 0 100%;
`
const RadL = styled(Rad)`
  border-right: ${({theme}) => theme.line} solid 1px;
  border-radius: 0 100% 100% 0;
`

const Content = styled(Area)`
  text-align:center;
  padding: 1em;
  font-size: 20px;
`

const Grid = styled.div`
  display: grid;
  grid-template: ${props => props.template};
`
const Snake = ({ children }) => {
  const cnt = React.Children.count(children)
  const area = snaker(cnt)
  const loop = Array.from({length:cnt}, (_,i) => i)
  return <Grid template={area}>
    <Line area="line-h"></Line>
    {loop.map((n) => {
      const area = `rad-${n}`
      return n % 2 
        ? <RadL key={area} area={area}/> 
        : <RadR key={area} area={area}/>
    }) }
    {loop.map((n) => (
      <Line key={n} area={`line-${n}`}/> 
    )) }
    {React.Children.map(children, (c,i) => (
      <Content key={i} area={`cnt-${i}`} >{c}</Content>
    ))}
  </Grid>
}

const theme = {
  line: "black",
  radius: "4em"
}
const App = () => {
  return (
    <ThemeProvider theme={theme}>

    <Snake>
      <div>fruit</div>
      <div>apple</div>
      <div>banana</div>
      <div>grape</div>
      <div>orange</div>
      <div>pinapple</div>
    </Snake>
    </ThemeProvider>
  )
}

render(<App />, document.querySelector("#container"))
