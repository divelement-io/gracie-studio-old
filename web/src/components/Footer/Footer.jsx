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
	${ typography.h3 }
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
	text-align: right;
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
	const { footerMenus, sanitySiteSettings } = useStaticQuery(
		graphql`
			query {
				sanitySiteSettings {
					title
				}
				footerMenus: sanityMenus(slug: {current: {eq: "footer-columns"}}) {
					_id
					_key
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
		<Wrapper setTheme="navy">
			<Section>
				<Container>
					<Grid small='[1]' medium='[1]' extraLarge='[2] [6]' rowGap={['7vw', '75px']} vAlign='top'>
						<div>
							<LogoLink to='/'>
								<FooterLogo />
							</LogoLink>
						</div>
						<Grid
							small='[1]'
							medium='[1] [1]'
							large='[1] [1] [1] [1]'
							rowGap='7vw'
							vAlign='top'
						>
							<div>
								<ListHeader>Contact</ListHeader>
								<LinkList spaced>
									{contactInfo?.email && (
										<li><Link to={contactInfo?.email} external title='Email us'>{contactInfo?.email}</Link></li>
									)}
									<li>
										<Link
											as={contactInfo?.address?.mapLink ? Link : 'p'}
											title='directions'
											to={contactInfo?.address?.mapLink}
											external
											target='_blank'
										>
											{contactInfo?.address?.streetAddress}<br/>
											{contactInfo?.address?.city},
											{contactInfo?.address?.state},
											{contactInfo?.address?.zip}
										</Link>
									</li>
									{contactInfo?.phone && (
										<li>Tel. <Link to={'tel:' + contactInfo?.phone} external title='Call us'>{contactInfo?.phone}</Link></li>
									)}
								</LinkList>
							</div>
							{footerMenus?.items?.length > 0 && footerMenus.items.map((item, index) => {
								const { itemLink } = item
								if (!itemLink.title) {
									return false
								}
								return (
									<div key={item._key}>
										<ListHeader
											target={itemLink.newTab && '_blank'}
											external={itemLink.type === 'externalLink'}
											to={getSanityLink(itemLink)}
											key={itemLink._key}
											as={Link}
										>
											{itemLink.title}
										</ListHeader>
										{item.sublinks && item?.sublinks?.length > 0 && (
											<LinkList>
												{item.sublinks.map((dropdownLink, index) => (
													<li key={dropdownLink._key}>
														<Link
															target={dropdownLink.newTab && '_blank'}
															external={dropdownLink.type === 'externalLink' || dropdownLink.type === 'fileLink'}
															to={getSanityLink(dropdownLink)}
															key={dropdownLink._key}
														>
															{dropdownLink.title}
														</Link>
													</li>
												))}
											</LinkList>
										)}
										{index + 1 === footerMenus?.items?.length && (
											<TextLink
												onClick={() => toggleModal('newsletterSignup')}
												setTheme='mainColor'
												as='button'
												css={css`
													margin-top: 1.5em;
													${ typography.bodyMedium }
													${ mq.mediumAndUp } {
														${ typography.body }
													}
													&:before {
														background: ${ colors.mainColor };
														opacity: 1;
													}
												`}
											>
												Sign up for updates
											</TextLink>
										)}
									</div>
								)
							})}
						</Grid>
					</Grid>
				</Container>
			</Section>
			<FooterBottom setTheme="navy">
				<Container>
					<Grid
						small="[7] [5]"
						medium="[8] [4]"
						large="[8] [4]"
						vAlign="center"
					>
						<Copyright>
							<p className="tiny" style={{ color: 'var(--light-text-color)' }}>© <span className="mobile-hide">{title}</span> {new Date().getFullYear()}</p>
						</Copyright>
						<SiteCredit><p className="tiny"><Link to="https://gordilsandwillis.com/" target="_blank" external>Site Credit</Link></p></SiteCredit>
					</Grid>
				</Container>
			</FooterBottom>
		</Wrapper>
	)
}

export default Footer
