import React, { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'

import { GatsbyImage, getImage  } from 'gatsby-plugin-image'


// https://codepen.io/tdextrous/pen/ROBvyz

function sideScroll(element, direction, speed, distance, step) {
	let scrollAmount = 0;
	var slideTimer = setInterval(() => {
			if(direction == 'left'){
				element.scrollLeft -= step;
			} else {
				element.scrollLeft += step;
			}
			scrollAmount += step;
			if(scrollAmount >= distance){
				window.clearInterval(slideTimer);
			}
	}, speed);
}

const PanelsContainer = styled.div`
	margin-top: 80px;
	background: blue;
	position: relative;

`

const Scroll = styled.div`
  width: 30px;
  height: 100%;
  line-height: 235px;
  position: absolute;
  flex-basis: 0;
  z-index: 5;
  top:0;
  background: rgba(225,100,205,0.8);
  transition: 2s;

  ${({position}) => `${position}: 0;`}

`

const ScrollContainer = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  background-color: black;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`

const PanelContainer = styled.div`
  border-right: 1px solid #bbb;
  width: 280px;
  background-color: white;
  position: relative;
  display: inline-block;
`


const PanelImage = styled(GatsbyImage)`

	transition: transform 100ms ease-in-out, border 100ms ease-in-out;

`

const PanelContent = styled.div`
 position: absolute;
 width: 100%;
 height: 100%;
 padding: 1rem;
 top: 0;
 z-index: 5;
 transform: scale(0.95);
 opacity: 0;
 transition:  transform 100ms ease-in-out, opacity 100ms ease-in-out;
`

const PanelItem = styled.div`
background: tan;
	cursor: pointer;
	position: relative;
	&:hover {
		${PanelImage} {
			transform: scale(0.98);
			border: 4px solid inset;
		}
		${PanelContent} {
			opacity: 1;
			transform: scale(1);
		}
	}

`



const Panel = ({
	index,
	id,
	image,
	altText
}) => {

	console.log(image)

	return (
		<PanelItem>
		      <PanelImage image={getImage(image.asset)} alt={id} />
		      <PanelContent>
						Panel {index}
		      </PanelContent>
		</PanelItem>)
}

const Panels = ({
	panels
}) => {

	const initialState = {
		disableScroll: false,
		scrollWidth: 0,
		scrollPos: 1,
		clonesWidth: 0,
	}

	const [state, setState] = useState(initialState)

	const scrollContainerRef = useRef(null)
	const clonesRef = useRef([]);

	const getClonesWidth = () => {
    const clones = clonesRef.current
    let clonesWidth = 0
    for (let i = 0; i < clones.length; i++) {
      clonesWidth = clonesWidth + clones[i].clientWidth
    }
    return clonesWidth
	}

	const reCalc = (event) => {
		const { scrollPos, } = state
    let scrollWidth = scrollContainerRef.current.clientWidth
    let clonesWidth = getClonesWidth()

    if (scrollPos <= 0) {
      scrollPos = 1
    }
    setState({
      scrollPos: scrollPos,
      scrollWidth: scrollWidth,
      clonesWidth: clonesWidth,
    })

	}

	const handleScroll = (event) => {
		const container = event.currentTarget
    const scrollWidth = container.scrollWidth
    const clonesWidth = getClonesWidth()

    let scrollPos = container.scrollLeft
    let scrollPosAdd

    container.clientWidth > clonesWidth ? scrollPosAdd = container.clientWidth : scrollPosAdd = clonesWidth

    const smoother = 100
    // console.log(Math.floor(scrollPosAdd/smoother))
    const smoothedScrollPosAdd = 6 // Math.floor(scrollPosAdd/smoother)
    console.log('smoothedScrollPosAdd', smoothedScrollPosAdd)

    if (!state.disableScroll) {
      if (scrollPos + scrollPosAdd >= scrollWidth) {
        setScroll(container, 1 + smoothedScrollPosAdd);
        setState({ disableScroll: true })
      } else if (scrollPos <= 0) {
        setScroll(container, scrollWidth - clonesWidth - smoothedScrollPosAdd)
        setState({disableScroll: true})
      }
    }
	}

	const scrollNext = (event) => {
    const container = event.currentTarget.previousSibling
    sideScroll(container,'right', 10, 250, 10)
	}

	const scrollPrev = (event) => {
    const container = event.currentTarget.nextSibling
    sideScroll(container, 'left', 10, 250, 10)
	}

	const setScroll = (element, pos) => {
    element.scrollLeft = pos
    setState({
      scrollPos: element.scrollLeft,
    });
	}

	useEffect(() => {
		const { disableScroll } = state
		if (disableScroll) {
			window.setTimeout( function() {
        setState({ disableScroll: false })
      }, 40)
		}
	}, [state])

	return (
		<PanelsContainer>
			<Scroll
				position="left"
				onClick={scrollPrev}
			/>
			<ScrollContainer
				ref={scrollContainerRef}
				onScroll={handleScroll}
			>
				{panels.map((panel, index) => (
					<PanelContainer>
						<Panel {...panel} index={index} />
					</PanelContainer>
				))}
				{panels.map((panel, index) => (
					<PanelContainer ref={el => clonesRef.current[index] = el} >
						<Panel {...panel} index={index} />
					</PanelContainer>
				))}
			</ScrollContainer>
			<Scroll
				position="right"
				onClick={scrollNext}
			/>
		</PanelsContainer>
	)
}

export default Panels
