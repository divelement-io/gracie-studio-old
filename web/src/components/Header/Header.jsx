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
export const headerHeightCollapsed = (attr = 'height') => util.responsiveStyles(attr, 80, 70, 66, 60)
const mobileBreak = 1010

const Dropdown = styled.nav`
  list-style: none;
  position: absolute;
  top: 100%;
  // min-width: 200px;
  border-radius: 0;
  background: ${ colors.bgColor };
  visibility: hidden;
  opacity: 0;
  transition: visibility ${ animations.mediumSpeed } ease-in-out,
    opacity ${ animations.mediumSpeed } ease-in-out,
    transform ${ animations.mediumSpeed } cubic-bezier(0.44, 0.24, 0.16, 1);
  background: ${ colors.lightGrey };
  padding: 10px 16px 11px;
  text-align: left;
  left: -16px;
  box-shadow: 0 4px 7px -2px ${ rgba(colors.textColor, 0.1) };
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  a {
    padding: 3px 0;
    color: ${ colors.lightTextColor };
    display: block;
    ${ typography.navStyle }
    line-height: 1em;
    padding: .5em 0;
    &:hover {
      color: ${ colors.textColor };
    }
  }
  li {
    width: 100%;
    white-space: nowrap;
  }
`

const NavLink = styled(Link)`
  display: block;
  ${ typography.navStyle }
  line-height: 1em;
  padding: 1em 0 .8em;
  > svg {
    vertical-align: middle;
    margin: -4px -3px -3px 2px;
    opacity: .4;
  }
  ${ ({ hasDropdown }) => hasDropdown ? `
    position: relative;
    > span, svg {
      position: relative;
      z-index: 2;
      transition: opacity ${ animations.mediumSpeed } ease-in-out, transform ${ animations.mediumSpeed } ease-in-out;
    }
    &:after {
      transition: background ${ animations.mediumSpeed } ease-in-out;
      content: '';
      display: block;
      position: absolute;
      background: transparent;
      left: -16px;
      right: -16px;
      top: 0px;
      bottom: 0;
      z-index: 1;
    }
  ` : '' }
  transition:   padding ${ animations.mediumSpeed } ease-in-out,
                margin ${ animations.mediumSpeed } ease-in-out,
                background ${ animations.mediumSpeed } ease-in-out,
                opacity ${ animations.mediumSpeed } ease-in-out,
                color ${ animations.mediumSpeed } ease-in-out;
  ${ ({ hasAtf, active }) => hasAtf ? `
      color: inherit;
    ` : `
      color: inherit;
      ${ !active && `&:hover { color: ${ colors.mainColor }; }` }
  ` }
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
    background: ${ colors.white };
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
  ${ util.responsiveStyles('width', 160, 130, 114, 114) }
  margin-top: -8%;
  height: auto;
  transition: color ${ animations.mediumSpeed } ease-in-out, margin ${ animations.mediumSpeed } ease-in-out;
  svg {
    overflow: visible;
  }
  .logo-e {
    color: ${ colors.mainColor };
    transition: transform ${ animations.mediumSpeed } ease-in-out;
  }
  &:hover {
    .logo-e {
      transform: translateY(-10%);
    }
  }
  ${ ({ scrolled, hasAtf, mobileMenuOpen }) => scrolled ? `
    margin-top: -3%;
    color: ${ colors.textColor };
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
  text-align: left;
  a {
    display: inline-block;
    vertical-align: top;
    transition: none;
    max-width: 100%;
  }
`

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
    &:hover {
      ${ Dropdown } {
        visibility: visible;
        opacity: 1;
      }
      ${ NavLink } {
        svg {
          opacity: 1;
          transform: rotate(-180deg);
        }
        &:after {
          background: ${ colors.lightGrey };
        }
      }
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
                sublinks {
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

  const siteTitle = allSanitySiteSettings?.edges[0]?.node?.title
  const [bannerVisible, toggleBanner] = useState(true)

  const { mobileMenu, toggleMobileMenu } = useContext(AppContext)

  const pathname = location
  const pageHasAtf = hasAtf

  const renderHeaderButtons = scrolled => {
    return (
      <div css={css`display: flex;`}>
        <Button
          to='https://careers.ascendlearning.org/'
          external
          size='small'
          setTheme={hasAtf && !scrolled ? 'white' : 'mainColor'}
          css={css`
            ${ util.responsiveStyles('margin-right', 20, 16, 14, 10) }
            ${ mq.mediumAndBelow } {
              padding-left: 12px;
              padding-right: 12px;
              min-width: 0;
            }
          `}
        >
          <ResponsiveComponent
            custom={{
              breakpoint: 475,
              content: 'View careers'
            }}
            small='Careers'
          />
        </Button>
        <Button
          to='/enroll'
          size='small'
          setTheme={hasAtf && !scrolled ? 'mainColor' : 'textColor'}
          css={css`
            ${ mq.mediumAndBelow } {
              padding-left: 12px;
              padding-right: 12px;
              min-width: 0;
            }
          `}
        >
          <ResponsiveComponent
            custom={{
              breakpoint: 475,
              content: 'Enroll your child'
            }}
            small='Enroll'
          />
        </Button>
      </div>
    )
  }

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
                  medium="m [4] [8] m"
                  // large="1 [8] [8] [8] 1"
                  vAlign="center"
                  hasAtf={pageHasAtf}
                  navVisible={!scrolledUp && !scrolledToTop && showHide}
                >
                  <LogoCol>
                    <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                      <Link to="/" title={siteTitle}>
                        <HeaderLogo
                          scrolled={scrolled}
                          hasAtf={pageHasAtf}
                          mobileMenuOpen={mobileMenu}
                        />
                      </Link>
                    </div>
                  </LogoCol>
                  <div>
                    <NavLinks alignment="right">
                      <ResponsiveComponent
                        small={
                          <>
                          <li>
                          {renderHeaderButtons(scrolled)}</li>
                          <MenuIcon id="mobile-menu-icon">
                            <button onClick={() => toggleMobileMenu(!mobileMenu)} aria-label='Toggle Navigation'>
                              <AnimatedIcon
                                icon={mobileMenu ? 'close' : 'menu'}
                              />
                            </button>
                          </MenuIcon>
                          </>
                        }
                        custom={{
                          breakpoint: mobileBreak,
                          content: <>
                            {navigation && navigation.map((item, index) => {
                              const { itemLink } = item
                              const linkSlug = itemLink?.link?.content?.main?.slug?.current
                              const hasDropdown = item?.sublinks?.length > 0
                              if (!itemLink.title) {
                                return false
                              }
                              return (
                                <li key={'header-link-' + item._key} css={css`&:hover { color: ${ colors.mainColor }; }`}>
                                  <NavLink
                                    target={itemLink.newTab && '_blank'}
                                    external={itemLink.type === 'externalLink'}
                                    scrolled={scrolled}
                                    hasAtf={pageHasAtf}
                                    to={getSanityLink(itemLink)}
                                    active={pathname === linkSlug}
                                    key={itemLink._key}
                                    hasDropdown={hasDropdown}
                                  >
                                    <span>{itemLink.title}</span>{hasDropdown && (<MdKeyboardArrowDown size={18}/>)}
                                  </NavLink>
                                  {item.sublinks && item?.sublinks?.length > 0 && (
                                    <Dropdown>
                                      {item.sublinks.map((dropdownLink, index) => (
                                        <li key={dropdownLink._key}>
                                          <Link
                                            target={dropdownLink.newTab && '_blank'}
                                            external={dropdownLink.type === 'externalLink' || dropdownLink.type === 'fileLink'}
                                            scrolled={scrolled}
                                            hasAtf={pageHasAtf}
                                            to={getSanityLink(dropdownLink)}
                                            active={pathname === linkSlug}
                                            key={dropdownLink._key}
                                          >
                                            {dropdownLink.title}
                                          </Link>
                                        </li>
                                      ))}
                                    </Dropdown>
                                  )}
                                </li>
                              )
                            })}
                            <li>
                              {renderHeaderButtons(scrolled)}
                            </li>
                          </>
                        }}
                      />
                    </NavLinks>
                  </div>
                </HeaderContent>
              </HeaderWrapper>
            </Wrapper>
          )
        }}
      </ScrollListener.Consumer>

      <ResponsiveComponent
        small={
          <MobileMenu
            open={mobileMenu}
            toggleMobileMenu={toggleMobileMenu}
            navLinks={navigation}
            pathname={pathname}
          // footerColumn1={footerColumn1}
          // footerColumn2={footerColumn2}
          />
        }
        custom={{
          breakpoint: mobileBreak,
          content: <span />
        }}
      />

    </Fragment>
  )
}

export default Header
