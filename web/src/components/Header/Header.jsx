import React, { Fragment, useState, useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { rgba } from 'polished'
import { MdKeyboardArrowDown } from 'react-icons/md'
import Link from 'src/components/Link'
import Logo from 'src/components/Logo'
import Button from 'src/components/Button'
import Grid from 'src/components/Grid'
import ScrollListener from 'src/components/ScrollListener'
import NotificationBanner from 'src/components/NotificationBanner'
import ResponsiveComponent from 'src/components/ResponsiveComponent'
import AnimatedIcon from 'src/components/AnimatedIcon'
import MobileMenu from 'src/components/MobileMenu'
import { AppContext } from 'src/state/AppState'
import { getSanityLink } from 'src/utils/format'
import { colors, typography, animations, mq, util } from 'src/styles'

const showHide = false // show and hide header on scroll
export const headerHeight = (attr = 'height', multiplier = 1) => util.responsiveStyles(attr, (250 * multiplier), (200 * multiplier), (110 * multiplier), (75 * multiplier))
export const headerHeightCollapsed = (attr = 'height') => util.responsiveStyles(attr, 80, 70, 70, 60)
const mobileBreak = 1010

const NavLink = styled(Link)`
  display: block;
  ${ typography.navStyle }
  line-height: 1em;
  padding: 1em 0 .8em;
  color: inherit;
  display: block;

  transition:   padding ${ animations.mediumSpeed } ease-in-out,
                margin ${ animations.mediumSpeed } ease-in-out,
                background ${ animations.mediumSpeed } ease-in-out,
                opacity ${ animations.mediumSpeed } ease-in-out,
                color ${ animations.mediumSpeed } ease-in-out;
  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: red;
    opacity: 0;
    transform: translate3d(0, 0.5rem, 0);
    transition: color ${ animations.mediumSpeed } ease-in-out,
                opacity ${ animations.mediumSpeed } ease-in-out,
                transform ${ animations.mediumSpeed } ease-in-out;
  }

  &:hover,
  &.active {
    color: inherit;
    &:after {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

`

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 4;
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  transition: height ${ animations.mediumSpeed } ease-in-out,
              background ${ animations.mediumSpeed } ease-in-out,
              transform ${ animations.mediumSpeed } ease-in-out,
              box-shadow ${ animations.mediumSpeed } ease-in-out;
  ${ ({ scrolled, hasAtf, mobileMenuOpen }) => scrolled ? `
    ${ headerHeightCollapsed() }
    background: ${ colors.offWhite };
    color: ${ colors.textColor };
    box-shadow: 0 1px 0 ${ rgba(colors.textColor, 0.1) };
  ` : `
    ${ headerHeight() }
    background: transparent;
    ${ hasAtf ? `
      color: ${ colors.bgColor };
    ` : `
      color: ${ colors.textColor };
    ` }
  ` }
  ${ ({ navVisible }) => navVisible && `
    transform: translate3d(0, -101%, 0);
  ` }

  ${ mq.maxWidth(mobileBreak) } {
    ${ ({ mobileMenuOpen }) => mobileMenuOpen ? `
      background: transparent;
      box-shadow: none;
      color: ${ colors.textColor };
      ${ headerHeight() }
    ` : '' }
  }
`

const HeaderContent = styled(Grid)``

const HeaderLogo = styled(Logo)`
  ${ util.responsiveStyles('width', 180, 176, 176, 114) }
  height: auto;
  transition: color ${ animations.mediumSpeed } ease-in-out, transform ${ animations.mediumSpeed } ease-in-out, width ${ animations.mediumSpeed } ease-in-out, , height ${ animations.mediumSpeed } ease-in-out;
  overflow: visible;

  ${ ({ scrolled, hasAtf, mobileMenuOpen }) => scrolled ? `
    color: ${ colors.textColor };
    overflow: hidden;
    transform: translateY(4px);
    height: 20px;
    ${ util.responsiveStyles('width', 160, 130, 114, 114) }
  ` : `
    ${ !hasAtf ? `
      color: ${ colors.textColor };
    ` : `
      color: ${ colors.bgColor };
    ` }
  ` }

  ${ mq.maxWidth(mobileBreak) } {
    ${ ({ mobileMenuOpen }) => mobileMenuOpen ? `
      color: ${ colors.textColor };
      ${ util.responsiveStyles('width', 160, 130, 114, 114) }
    ` : '' }
  }
`

const LogoCol = styled.div`
  text-align: center  ;
  a {
    display: inline-block;
    vertical-align: top;
    transition: none;
    max-width: 100%;
  }
`

const NavCol = styled.div``

const NavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
  display: flex;
  width: 100%;
  justify-content: ${ ({ alignment }) => alignment === 'right' ? 'flex-end' : 'flex-start' };
  li {
    position: relative;
    flex-shrink: 0;
    .button {
      ${ typography.navStyle }
      line-height: 1em;
    }

    &:not(:last-of-type) {

      ${ util.responsiveStyles('margin-right', 40, 30, 24, 20) }
    }
  }
`

const MenuIcon = styled.li`
  display: none;
  margin-left: -10px;
  margin-right: -10px;
  cursor: pointer;
  display: block;
  vertical-align: top;
  transition: color ${ animations.mediumSpeed } ease-in-out;
  button {
    padding: 5px 10px;
    display: block;
    outline: none;
    border: none;
    background: transparent;
    appearance: none;
    color: inherit;
    cursor: pointer;
  }
  span {
    display: block;
  }
`

const HeaderNotificationBanner = styled(NotificationBanner)`
  position: relative;
  z-index: 5;
  ${ ({ hidden }) => hidden && `
    opacity: 0;
  ` }
`

const Header = ({
  location,
  hasAtf = false,
  bannerText,
  collapsed,
  bannerColor,
  // navigation
}) => {
  const { allSanitySiteSettings, allSanityMenus } = useStaticQuery(
    graphql`
      query {
        allSanitySiteSettings {
          edges {
            node {
              title
            }
          }
        }
        allSanityMenus {
          edges {
            node {
              _id
              _key
              slug {
                current
              }
              items {
                _key
                itemLink {
                  ...Link
                }
              }
            }
          }
        }
      }
    `
  )

  const menus = allSanityMenus?.edges

  const navigation = menus.filter(menu => menu?.node?.slug?.current === 'main-navigation')[0]?.node?.items

  const leftNavigation = menus.filter(menu => menu?.node?.slug?.current === 'left-navigation')[0]?.node?.items
  const rightNavigation = menus.filter(menu => menu?.node?.slug?.current === 'right-navigation')[0]?.node?.items

  const siteTitle = allSanitySiteSettings?.edges[0]?.node?.title
  const [bannerVisible, toggleBanner] = useState(true)

  const { mobileMenu, toggleMobileMenu } = useContext(AppContext)

  const pathname = location
  const pageHasAtf = hasAtf

  return (
    <Fragment>
      {bannerText && (<div>
        <HeaderNotificationBanner
          closeBanner={() => toggleBanner(false)}
          collapsed={!bannerVisible}
          text={bannerText}
        />
      </div>)}
      <ScrollListener.Consumer>
        {({
          scrolledToTop,
          scrolledToBottom,
          scrollY,
          scrolledUp,
          hasScrolled,
          pageHeight
        }) => {
          let scrolled = false
          if (collapsed) {
            scrolled = true
          } else {
            scrolled = !scrolledToTop && hasScrolled
          }
          return (
            <Wrapper hasAtf={pageHasAtf} navVisible={!scrolledUp && !scrolledToTop && showHide}>
              {bannerText && (<div>
                <HeaderNotificationBanner
                  closeBanner={() => toggleBanner(false)}
                  collapsed={!bannerVisible}
                  text={bannerText}
                  setTheme={bannerColor}
                />
              </div>)}
              <HeaderWrapper
                navVisible={!scrolledUp && !scrolledToTop && showHide}
                hasAtf={pageHasAtf}
                scrolled={scrolled}
                mobileMenuOpen={mobileMenu}
              >
                <HeaderContent
                  small="m [4] [8] m"
                  medium="m [4] [3] [4] m"
                  vAlign="center"
                  hasAtf={pageHasAtf}
                  navVisible={!scrolledUp && !scrolledToTop && showHide}
                >
                  <NavCol>
                    <NavLinks alignment="left">
                      {leftNavigation && leftNavigation.map((item, index) => {
                          const { itemLink } = item
                          const linkSlug = itemLink?.link?.content?.main?.slug?.current
                          return itemLink.title && (
                            <li key={'header-link-' + item._key} >
                              <NavLink
                                target={itemLink.newTab && '_blank'}
                                external={itemLink.type === 'externalLink'}
                                scrolled={scrolled}
                                hasAtf={pageHasAtf}
                                to={getSanityLink(itemLink)}
                                active={pathname === linkSlug}
                                key={itemLink._key}
                              >
                                {itemLink.title}
                              </NavLink>
                            </li>
                          )
                      })}

                    </NavLinks>
                  </NavCol>
                  <LogoCol>

                    <div style={{ display: 'inline-block'}}>
                      <Link to="/" title={siteTitle}>
                        <HeaderLogo
                          scrolled={scrolled}
                          hasAtf={pageHasAtf}
                          mobileMenuOpen={mobileMenu}
                        />
                      </Link>
                    </div>
                  </LogoCol>
                  <NavCol>
                    <NavLinks alignment="right">
                     {rightNavigation && rightNavigation.map((item, index) => {
                              const { itemLink } = item
                              const linkSlug = itemLink?.link?.content?.main?.slug?.current
                              return itemLink.title && (
                                <li key={'header-link-' + item._key} >
                                  <NavLink
                                    target={itemLink.newTab && '_blank'}
                                    external={itemLink.type === 'externalLink'}
                                    scrolled={scrolled}
                                    hasAtf={pageHasAtf}
                                    to={getSanityLink(itemLink)}
                                    active={pathname === linkSlug}
                                    key={itemLink._key}
                                  >
                                    {itemLink.title}
                                  </NavLink>
                                </li>
                              )
                            })}
                    </NavLinks>
                    <MobileMenu
                      open={mobileMenu}
                      toggleMobileMenu={toggleMobileMenu}
                      navLinks={navigation}
                      pathname={pathname}
                    />
                  </NavCol>
                </HeaderContent>
              </HeaderWrapper>
            </Wrapper>
          )
        }}
      </ScrollListener.Consumer>
    </Fragment>
  )
}

export default Header


// <MenuIcon id="mobile-menu-icon">
//   <button onClick={() => toggleMobileMenu(!mobileMenu)} aria-label='Toggle Navigation'>
//     <AnimatedIcon
//       icon={mobileMenu ? 'close' : 'menu'}
//     />
//   </button>
// </MenuIcon>
