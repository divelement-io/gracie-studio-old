import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { typography } from 'src/styles'
import AnimateHeight from 'react-animate-height'

const CollapseWrapper = styled.div`
  width: 100%;
  text-align: left;
`

const UnstyledButton = styled.button`
	display: block;
	appearance: none;
	line-height: unset;
  outline: none;
  width: 100%;
  border: none;
  background: inherit;
  font-size: inherit;
  text-decoration: inherit;
  font-weight: inherit;
  padding: 0;
  margin: 0;
  border-radius: unset;
  box-shadow: unset;
  background: unset;
  color: inherit;
  height: unset;
  cursor: pointer;
  transition: none;
`

const CollapseHeader = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
`

const DisplayName = styled.div`
  ${ typography.h6 }
`

const CollapsedContent = styled(AnimateHeight)`
	overflow: hidden;
`

const DetailsContainer = styled.div``

const Collapse = ({ collapsed, children, title, className }) => {
  const [open, toggleOpen] = useState(!collapsed)
	if (children) {
		return (
			<CollapseWrapper className={className}>
				{title && (
					<UnstyledButton onClick={() => toggleOpen(!open)} open={open} className={open ? 'title open' : 'title'}>
						<CollapseHeader>
							<DisplayName hasChildren={true}>
								<div>{title}</div>
							</DisplayName>
						</CollapseHeader>
					</UnstyledButton>
				)}
				<CollapsedContent
					className={open ? 'content open' : 'content'}
					duration={300}
					delay={0}
					animateOpacity={false}
					height={!open ? 0 : 'auto'}
				>
					<DetailsContainer>
						{children}
					</DetailsContainer>
				</CollapsedContent>
			</CollapseWrapper>
		)
	} else {
		return (
			<CollapseWrapper className={className}>
				<CollapseHeader>
					<DisplayName>
						<div>{title}</div>
					</DisplayName>
				</CollapseHeader>
			</CollapseWrapper>
		)
	}
}

Collapse.defaultProps = {
	collapsed: true
}

Collapse.propTypes = {
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	children: PropTypes.node,
	collapsed: PropTypes.bool
}

export default Collapse
