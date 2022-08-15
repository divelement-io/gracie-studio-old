import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { AppContext } from 'src/state/AppState'
import { Transition } from 'react-transition-group'
import ThemeSelector from 'src/components/ThemeSelector'
import Button from 'src/components/Button'
import MailchimpSignup from './MailchimpSignup'

import { colors, mq, typography, animations } from 'src/styles'

const timeout = 300

const Wrapper = styled.div`
	position: fixed;
	z-index: 10;
	bottom: 0;
	right: 0;
	padding: 20px;
`

const Card = styled(ThemeSelector)`
	transition: transform ${ timeout }ms ease-in-out;
	border: 1px solid rgba(255, 255, 255, .15);
	box-shadow: 0 10px 20px rgba(0, 0, 0, .3);
	padding: 20px;
	${ ({ transitionStatus }) => transitionStatus === 'entered' ? `
		transform: none;
	` : `
		transform: translate3d(0, calc(100% + 20px), 0);
	` }
`

const CardHeader = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	margin-top: -3px;
	margin-bottom: 20px;
	p.h3 {
		margin: 0;
	}
`

const CloseButton = styled(Button)`
	color: currentcolor;
	opacity: .6;
	margin-right: -12px;
	margin-top: -12px;
	margin-left: 16px;
	${ mq.largerAndUp } {
		margin-right: -16px;
		margin-top: -14px;
	}
	&:hover {
		color: currentcolor;
		opacity: 1;
	}
`

const NewsletterPopup = () => {
	const { toggleModal, modal } = useContext(AppContext)

	return (
		<Transition
			in={modal === 'newsletterSignup'}
			// in={true}
			key='NewsletterPopup'
			unmountOnExit={true}
			timeout={{
        enter: 0,
        exit: timeout
      }}
		>
			{status => (
				<Wrapper>
					<Card transitionStatus={status} setTheme='navy'>
						<CardHeader>
							<p className='h3'>Sign up for updates</p>
							<CloseButton
								size='small'
								setTheme='transparent'
								shape='circle'
								icon='close'
								title='Close newsletter form'
								onClick={toggleModal}
							/>
						</CardHeader>
						<MailchimpSignup />
					</Card>
				</Wrapper>
			)}
		</Transition>
	)
}

export default NewsletterPopup
