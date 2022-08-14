import { useState, useContext } from 'react'
import { AppContext } from 'state/AppState'
import client, { navQuery } from 'client'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Link from 'components/Link'
import Grid from 'components/Grid'
import ThemeSelector from 'components/ThemeSelector'
import ScrollEntrance from 'components/ScrollEntrance'
import { colors, typography, util, animations } from 'styles'
import { Transition } from 'react-transition-group'
import { getSanityLink } from 'utils/format'
import AnimateHeight from 'react-animate-height'
import { MdKeyboardArrowDown } from 'react-icons/md'

const timeout = 300
const timingFunction = 'cubic-bezier(0.44, 0.24, 0.16, 1.00)'

const Wrapper = styled(ThemeSelector)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 3;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	overflow: auto;
	-webkit-overflow-scrolling: touch;
	background: ${ colors.lightGrey };
	${ util.responsiveStyles('padding-top', 113, 105, 90, 50) }
	transition: opacity ${ timeout }ms ${ timingFunction }, transform ${ timeout }ms ${ timingFunction };
	// transform: translate3d(110%, 0, 0);
	opacity: 0;
	${ ({ transitionStatus }) => transitionStatus === 'exited' && `
		// transform: translate3d(110%, 0, 0);
		opacity: 0;
	` }
	${ ({ transitionStatus }) => transitionStatus === 'entered' && `
		// transform: none;
		opacity: 1;
	` }
	ul {
		list-style: none;
		padding: 0;
	}
`

const MobileNavLink = styled(Link)`
	${ ({ size }) => size ? `${ typography[size] }` : typography.h2 }
	${ ({ size }) => size === 'smallCaps' && `
		margin-top: 20px;
	` }
	display: flex;
	align-items: center;
	padding: 2px 0;
	color: ${ colors.textColor };
	span {
		display: inline-block;
	}
`

const MainSection = styled.div`
	flex-grow: 1;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	padding: 5vw 0 0;
`

const Sublinks = styled.nav`
	ul {
		list-style: none;
	}
`

const SublinkIcon = styled.div`
	padding: 4px;
	transition: transform ${ animations.mediumSpeed } ease-in-out;
	${ ({ expanded }) => expanded ? `
		transform: rotate(-180deg);
	` : '' }
	svg {
		display: block;
	}
`

const MobileMenu = ({ pathname }) => {
	const {
		mobileMenu,
		toggleMobileMenu,
		settings,
		navigation
	} = useContext(AppContext)
	const [expandedSection, setExpandedSection] = useState(false)
	const navLinks = navigation?.items

	const toggleExpandedSection = id => {
		if (id !== expandedSection) {
			setExpandedSection(id)
		} else {
			setExpandedSection(false)
		}
	}

	return (
		<Transition
			in={mobileMenu}
			timeout={{
				enter: 1,
				exit: timeout
			}}
			unmountOnExit
			mountOnEnter
		>
			{transitionStatus => (
				<Wrapper transitionStatus={transitionStatus}>
					<MainSection>
						<Grid small="container">
							<ScrollEntrance as='ul'>
								{navLinks && navLinks.map((item, index) => {
									const itemLink = item.link
									const externalLink = itemLink.externalLink
									const hasSublinks = item.sublinks && item?.sublinks?.length > 0
									if (!itemLink.title) {
										return false
									}
									return (
										<li key={'header-link-' + item._key}>
											<MobileNavLink
												{...getSanityLink(itemLink)}
												active={'/' + pathname === link}
												hasDropdown={hasSublinks}
											>
												<a>
													<span
														onClick={() => '/' + pathname === link ? toggleMobileMenu(false) : setTimeout(() => toggleMobileMenu(false), 500)}>
														{itemLink.title}
													</span>
													{hasSublinks && (
														<SublinkIcon
															expanded={expandedSection === item._key}
															onClick={() => toggleExpandedSection(item._key)}>
															<MdKeyboardArrowDown />
														</SublinkIcon>
													)}
												</a>
											</MobileNavLink>
											{/*hasSublinks && (
												<AnimateHeight
													duration={300}
													delay={0}
													animateOpacity={false}
													height={expandedSection === item._key ? 'auto' : 0}
												>
													<Sublinks>
														<ul>
															{item.sublinks.map((dropdownLink, index) => (
																<li key={dropdownLink._key}>
																	<Link
																		target={dropdownLink.newTab ? '_blank' : ''}
																		external={dropdownLink.externalLink}
																		to={dropdownLink.externalLink || getSanityLink(dropdownLink?.link)}
																	>
																		{dropdownLink.title}
																	</Link>
																</li>
															))}
														</ul>
													</Sublinks>
												</AnimateHeight>
											)*/}
										</li>
									)
								})}
							</ScrollEntrance>
						</Grid>
					</MainSection>
				</Wrapper>
			)}
		</Transition>
	)
}

MobileMenu.propTypes = {
	/** Is the menu open or closed? */
	navLinks: PropTypes.array
}

export default MobileMenu
