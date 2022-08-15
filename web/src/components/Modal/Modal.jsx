import React, { useContext } from 'react'
import { rgba } from 'polished'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import ReactModal from 'react-modal'
import { AppContext } from 'src/state/AppState'
import { colors } from 'src/styles'
import Button from 'src/components/Button'

const timeout = 300

const Wrapper = styled(ReactModal)``

const modalStyles = isOpen => ({
	content: {
		top: null,
		left: null,
		right: null,
		bottom: null,
		border: null,
		overflow: null,
		WebkitOverflowScrolling: null,
		borderRadius: 0,
		background: colors.bgColor,
		position: 'relative',
		outline: 'none',
		// transition: `opacity ${timeout}ms ease-in-out`,
		margin: 'auto',
		// opacity: isOpen ? 1 : 0
	},
	overlay: {
		zIndex: 5,
		position: 'fixed',
		left: 0,
		top: 0,
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		pointerEvents: 'click',
		overflow: 'auto',
		background: rgba(colors.textColor, 0.2),
		transition: `opacity ${ timeout }ms ease-in-out`,
		opacity: isOpen ? 1 : 0,
		padding: '5vw 0'
	},
})

const Modal = ({ className, children, id, isOpen, ...rest }) => {
	const { modal, toggleModal } = useContext(AppContext)
	// return <div>Modal: {modal} ===> {id}</div>
	isOpen = isOpen || id === modal
	return (
		<Wrapper
			style={modalStyles(isOpen)}
			className={className}
			shouldCloseOnOverlayClick={true}
			onRequestClose={toggleModal}
			isOpen={isOpen}
			closeTimeoutMS={timeout}
			{...rest}
		>
			<Button
				icon='close'
				onClick={() => toggleModal(false)}
				setTheme='transparent'
				shape='square'
				size='small'
				className='close-button'
				css={css`
					position: absolute;
					top: 0;
					right: 0;
					z-index: 2;
				`}
			/>
			<div style={{ position: 'relative', zIndex: 1 }}>
				{children}
			</div>
		</Wrapper>
	)
}

export default Modal
