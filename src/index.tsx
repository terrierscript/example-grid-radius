import React, { useContext, FC, ReactChild } from "react"
import { render } from "react-dom"
import styled, { ThemeProvider, ThemeContext } from "styled-components"
import * as ReactIs from "react-is"

const snaker = (num, weight) => {
  const header = ["rad-0", "line-h", "line-h", "line-h"]
  const templateL = [
    ["rad", "cnt-a", "cnt-b", "."],
    ["rad", "line", "line", "__"]
  ]
  const templateR = templateL.map((t) => t.concat().reverse())
  const base = Array(num)
    .fill(null)
    .map((_, i) => {
      const template = i % 2 == 0 ? templateL : templateR
      return template.map((line) =>
        line.map((cell) => {
          if (cell === ".") return "."
          if (cell === "__") {
            return i === num - 1 ? `line-e` : `rad-${i + 1}`
          }
          return `${cell}-${i}`
        })
      )
    })
    .flat()
  const b = [header, ...base]
    .map((l, i) => {
      const size = i % 2 == 0 ? weight : "1fr"
      return `"${l.join("\t")}" ${size}`
    })
    .join("\n")

  const footer = "/ 3em 1fr 1fr 3em"
  return [b, footer].join("\n")
}

const Area = styled.div`
  grid-area: ${({ area }) => area};
`

const Line = styled(Area)`
  background: ${({ theme }) => theme.line};
`
const Rad = styled(Area)`
  border-bottom: ${({ theme }) => `${theme.line} solid ${theme.weight}`};
  border-top: ${({ theme }) => `${theme.line} solid ${theme.weight}`};
  /* width: ${({ theme }) => theme.radius}; */
`
const RadR = styled(Rad)`
  border-left: ${({ theme }) => `${theme.line} solid ${theme.weight}`};
  border-radius: 100% 0 0 100%;
`
const RadL = styled(Rad)`
  border-right: ${({ theme }) => `${theme.line} solid ${theme.weight}`};
  border-radius: 0 100% 100% 0;
`

const Content = styled(Area)`
  text-align: center;
  padding: 1em;
  font-size: 20px;
`

const Grid = styled.div`
  display: grid;
  grid-template: ${(props) => props.template};
  box-sizing: border-box;
`

const isReactElement = (item: SnakeItemElement): item is ReactChild => {
  return (
    ReactIs.isElement(item) ||
    typeof item === "string" ||
    typeof item === "number"
  )
}

const SnakeItem: FC<{ item: SnakeItemElement; num: number }> = ({
  item,
  num
}) => {
  if (isReactElement(item)) {
    return (
      <>
        <Content area={`cnt-b-${num}`}>{item}</Content>
      </>
    )
  }
  const { avater, main } = item
  return (
    <>
      <Content area={`cnt-a-${num}`}>{avater}</Content>
      <Content area={`cnt-b-${num}`}>{main}</Content>
    </>
  )
}

const SnakeChildrenContents = ({ items }) => {
  return items.map((c, i) => {
    return <SnakeItem key={i} num={i} item={c} />
  })
}

const SnakeLines: FC<{ n: number }> = ({ n }) =>
  // @ts-ignore
  Array.from({ length: n }, (_, i) => i).map((n) => (
    <Line key={n} area={`line-${n}`} />
  ))

const SnakeRadius: FC<{ n: number }> = ({ n }) =>
  // @ts-ignore
  Array.from({ length: n }, (_, i) => i).map((n) => {
    const area = `rad-${n}`
    return n % 2 ? (
      <RadL key={area} area={area}></RadL>
    ) : (
      <RadR key={area} area={area}></RadR>
    )
  })

const Snake: FC<{ items: SnakeItemElement[] }> = ({ items }) => {
  const cnt = items.length
  const theme = useContext<any>(ThemeContext)
  const area = snaker(cnt, theme.weight)
  return (
    <Grid template={area}>
      <Line area="line-h"></Line>
      <Line area="line-e"></Line>
      <SnakeRadius n={cnt} />
      <SnakeLines n={cnt} />
      <SnakeChildrenContents items={items} />
    </Grid>
  )
}

const theme = {
  line: "gray",
  radius: "4em",
  weight: "1px"
}

type SnakeItemElement =
  | {
      avater: ReactChild
      main: ReactChild
    }
  | ReactChild

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Snake
        items={[
          {
            avater: "🍎",
            main: <>apple</>
          },
          <div>banana</div>,
          <div>grape</div>,
          "orange",
          <div>pinapple</div>
        ]}
      />
    </ThemeProvider>
  )
}

render(<App />, document.querySelector("#container"))
