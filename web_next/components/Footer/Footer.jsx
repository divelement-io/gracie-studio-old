import { useContext } from 'react'
import { AppContext } from 'state/AppState'
import styled from '@emotion/styled'
import Link from 'components/Link'
import Grid, { Container } from 'components/Grid'
import { Logomark } from 'components/Logo'
import Section from 'components/Section'
import ThemeSelector from 'components/ThemeSelector'
import { mq, util, typography } from 'styles'
import { getSanityLink, isExternal } from 'utils/format'

const Wrapper = styled(ThemeSelector)`
	position: relative;
	z-index: 2;
`

const FooterLogo = styled(Logomark)`
	width: 30px;
	${ mq.mediumAndBelow } {
		width: 24px;
	}
`

const FooterBottom = styled(ThemeSelector)`
	position: relative;
	${ util.responsiveStyles('padding-top', 50, 40, 30, 26) }
	${ util.responsiveStyles('padding-bottom', 50, 40, 30, 26) }
`

const ListHeader = styled.p`
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

const LinkList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`

const Footer = () => {
	const {
		settings,
		footerNavigation
	} = useContext(AppContext)
	const siteTitle = settings?.title
	const navigation = footerNavigation?.items
	return (
		<Wrapper setTheme="textColor">
			<Section>
				<Container>
					<Grid
						small='[1]'
						medium='[4] [4] [4]'
						large='[4] [4] [4]'
						rowGap='7vw'
						colGap='var(--site-gutters)'
						vAlign='top'
					>
						{navigation && navigation.map(list => {
							return (
								<div key={list._key}>
									<ListHeader>{list?.link?.title}</ListHeader>
									<LinkList>
										{list?.sublinks?.map(linkItem => (
											<li key={linkItem._key}>
												<Link
													{...getSanityLink(linkItem)}
												>{linkItem.title}</Link>
											</li>
										))}
									</LinkList>
								</div>
							)
						})}
					</Grid>
				</Container>
			</Section>
			<FooterBottom setTheme="textColor">
				<Container>
					<Grid
						small="[7] [5]"
						medium="[8] [4]"
						large="[8] [4]"
						vAlign="center"
					>
						<Copyright>
							<FooterLogo />
							<p className="sm">© <span className="mobile-hide">{siteTitle}</span> {new Date().getFullYear()}</p>
						</Copyright>
						<SiteCredit><p className="sm"><Link to="https://gordilsandwillis.com/" target="_blank" external>Site Credit</Link></p></SiteCredit>
					</Grid>
				</Container>
			</FooterBottom>
		</Wrapper>
	)
}

export default Footer
