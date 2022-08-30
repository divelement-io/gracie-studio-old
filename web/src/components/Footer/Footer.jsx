import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Link from 'src/components/Link'
import TextLink from 'src/components/TextLink'
import Grid, { Container } from 'src/components/Grid'
import { Logomark } from 'src/components/Logo'
import Section from 'src/components/Section'
import ThemeSelector from 'src/components/ThemeSelector'
import { mq, util, typography, colors, animations } from 'src/styles'
import { getSanityLink } from 'src/utils/format'
import { AppContext } from 'src/state/AppState'

import Newsletter from 'src/components/Newsletter'


const Wrapper = styled(ThemeSelector)`
	position: relative;
	z-index: 2;
`

const LogoLink = styled(Link)`
	display: inline-block;
	vertical-align: top;
	&:hover {
    .logo-e {
      transform: translateY(-10%);
    }
  }
`

const FooterLogo = styled(Logomark)`
	${ util.responsiveStyles('width', 160, 130, 114, 114) }
	svg {
    overflow: visible;
  }
	.logo-e {
    color: ${ colors.mainColor };
    transition: transform ${ animations.mediumSpeed } ease-in-out;
  }
`

const FooterBottom = styled(ThemeSelector)`
	position: relative;
	${ util.responsiveStyles('padding-top', 50, 40, 30, 26) }
	${ util.responsiveStyles('padding-bottom', 50, 40, 30, 26) }
`

const ListHeader = styled.div`
	display: block;
	${ typography.h6 }
	margin: 0 0 .5em;
`

const Copyright = styled.div`
	display: flex;
	align-items: center;
	p {
		margin: 0;
		max-width: none;
		.mobile-hide {
			${ mq.mediumAndBelow } {
				display: none;
			}
		}
	}
`

const LinkList = styled.ul`
	padding: 0;
	list-style: none;
	${ ({ spaced }) => spaced ? `
		li:not(:first-of-type) {
			margin-top: 1em;
		}
	` : '' }
	${ typography.bodyMedium }
	${ mq.mediumAndUp } {
		${ typography.body }
	}
	color: var(--light-text-color);
	p {
		${ typography.bodyMedium }
		${ mq.mediumAndUp } {
			${ typography.body }
		}
	}
	a {
		color: inherit;
		&:hover {
			color: var(--text-color);
		}
	}
`

const SiteCredit = styled.div`
	p {
		margin: 0;
		max-width: none;
		a {
			opacity: 0.6;
			&:hover {
				opacity: 1;
			}
		}
	}
`

const Footer = () => {
	const { footerMenus: footerMenu, sanitySiteSettings } = useStaticQuery(
		graphql`
			query {
				sanitySiteSettings {
					title
				}
				footerMenus: sanityMenus(slug: {current: {eq: "footer-navigation"}}) {
					_id
					_key
					title
					items {
						_key
						itemLink {
							...Link
						}
					}
				}
			}
		`
	)
	const { toggleModal } = useContext(AppContext)
	const { title, contactInfo } = { ...sanitySiteSettings }

	return (
		<Wrapper setTheme="lightGrey">
			<Section>
				<Container>

						<Grid
							small='[12]'
							medium='[8] [4]'
							large='[5] 3 [4]'
							rowGap='7vw'
							vAlign='top'
						>


							<div>
								<ListHeader>{footerMenu.title}</ListHeader>
								<LinkList spaced>
									{ footerMenu?.items?.map((item, index) => {
										const { itemLink } = item
										return itemLink.title && (
											<li key={item._key}>
													<Link
														target={itemLink.newTab && '_blank'}
														external={itemLink.type === 'externalLink' || itemLink.type === 'fileLink'}
														to={getSanityLink(item)}
														key={itemLink._key}
													>
														{itemLink.title}
													</Link>
											</li>
										)})
									}
								</LinkList>

							</div>

							<div>
								<ListHeader>Stay Updated</ListHeader>
								<LinkList spaced>
									<Newsletter />
								</LinkList>
								<ListHeader>Find Us On</ListHeader>
								<LinkList spaced>
									<li>
										<Link>
											Instagram
										</Link>
									</li>
								</LinkList>
							</div>
						</Grid>

				</Container>
			</Section>

			<FooterBottom setTheme="lightGrey">
				<Container>
					<Grid
						small="[7] [5]"
						medium="[8] [4]"
						large="[5] 3 [4]"
						vAlign="center"
					>
						<Copyright>
							<p className="tiny" style={{ color: 'var(--light-text-color)' }}>© <span className="mobile-hide">{title}</span> {new Date().getFullYear()}</p>
						</Copyright>
						<SiteCredit><p className="tiny"><Link to="https://gordilsandwillis.com/" target="_blank" external>Site Credit</Link></p></SiteCredit>
					</Grid>
				</Container>
			</FooterBottom>

			<FooterBottom>
				<Container>
					<LogoLink to='/'>
						<FooterLogo />
					</LogoLink>
				</Container>
			</FooterBottom>
		</Wrapper>
	)
}

export default Footer
