import React, { useEffect, Component, useState } from 'react'

import MailchimpSubscribe from 'react-mailchimp-subscribe'

import styled from '@emotion/styled'
import { css } from '@emotion/react'

import Button from 'src/components/Button'
import Input from 'src/components/Input'
import Checkbox from 'src/components/Checkbox'
import Grid from 'src/components/Grid'

import { typography } from 'src/styles'
import { validateEmail } from 'utils/validations'

const formId = '7795a5cb-5124-4f58-8c4e-33001c08fb3a'
const portalId = '5120899'
const McUrl = 'https://ascendschools.us12.list-manage.com/subscribe/post?u=e58422524713555287efec3a5&amp;id=229a9414a2'
const hubSpotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

const subscribeHubspot = async (formData) => {

	const hubspotFieldMap = {
		EMAIL: 'email',
		LNAME: 'lastname',
		FNAME: 'firstname',
		INTEREST: 'message'
	}

	const fields = Object.keys(formData).map((key) => {
		return { name: hubspotFieldMap[key], value: formData[key] }
	})

	const req = {
		method: 'POST',
		body: JSON.stringify({ fields }),
		headers: {
			'Content-Type' : 'application/json'
		}
	}

	const res = await fetch(hubSpotUrl, req)
	const json = await res.json()

	return json.status === 'error' ? json : { status: 'success', message: json.inlineMessage }
}

const FormWrapper = styled(Grid)`
	width: 100%;
`

const StyledInput = styled(Input)`
	input.input {
		padding-right: 0;
	}
`

const ThemedCheckbox = styled(Checkbox)`
	.checkbox {
		border: 1px solid var(--hr-color);
	}
	&:hover:not(.checked) {
		.checkbox {
			border: 1px solid var(--light-text-color);
		}	
	}
`

// a basic form
const CustomForm = ({
	status,
	message,
	className,
	placeholder,
	label,
	size,
	subscribeMailchimp
}) => {
	const [formData, setFormData] = useState({ INTEREST: ['general'] })
	const [formType, setFormType] = useState({ general: true, careers: false, enrollment: false })

	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState()

	const [formTypeList, setFormTypeList] = useState(['general'])

	const submit = async (e) => {
		e.preventDefault()
		setLoading(true)

		if (formType.enrollment) {
			// Hubspot Response
			const { status, message } = await subscribeHubspot(formData)
			if (status === 'error') {
				setError(message)
				setSuccess(null)
			}

			if (status === 'success') {
				setSuccess(message)
				setError(null)
			}
		}

		if (formType.general || formType.careers) {
			subscribeMailchimp(formData)
		}

		setLoading(false)
	}

	const renderIcon = buttonStatus => {
		let icon = 'arrow_forward'
		if (buttonStatus === 'sending' || loading) {
			// icon = <Loader />
			icon = 'more_horiz'
		} else if (buttonStatus === 'success') {
			icon = 'check'
		} else if (buttonStatus === 'error' || error) {
			icon = 'close'
		} else {
			icon = ''
		}
		return icon
	}

	const handleChange = event => {
		const { name, value } = event.target
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}))
	}

	const handleFormType = event => {
		const { value } = event.target
		if (!formTypeList.includes(value)) {
			setFormTypeList([...formTypeList, value])
		} else {
			const newListArray = formTypeList.filter(item => item !== value)
			setFormTypeList(newListArray)
		}
		setFormType({
			...formType,
			[value]: !formType[value]
		})
	}

	useEffect(() => {
		setFormData({
			...formData,
			INTEREST: formTypeList.join(', ')
		})
	}, [formTypeList])

	// Mailchimp Response
	useEffect(() => {
		if (status && message) {
			if (status === 'success') {
				setSuccess(message)
				setError(null)
			}
			if (status === 'error') {
				setSuccess(null)
				setError(message)
			}
		}
	}, [status, message])

	return (
		<FormWrapper className={className} small='[1]' rowGap='14px' as='form'>
			<div>
				<p css={css`
					${ typography.bodySmall }
					font-weight: ${ typography.medium };
					color: var(--light-text-color);
					margin: 0 0 .5em 0;
				`}>Update me about:</p>
				<ThemedCheckbox checked={formType.general} value='general' onChange={handleFormType}>General</ThemedCheckbox>
				<ThemedCheckbox checked={formType.careers} value='careers' onChange={handleFormType}>Careers</ThemedCheckbox>
				<ThemedCheckbox checked={formType.enrollment} value='enrollment' onChange={handleFormType}>Enrollment</ThemedCheckbox>
			</div>
			<div>
				<StyledInput
					size={size}
					type="email"
					placeholder='Email address'
					label={label}
					name="EMAIL"
					setTheme='light'
					onChange={handleChange}
				/>
			</div>
			<div>
				<Grid small='[1]' medium='[1] [1]' rowGap='14px' colGap='14px'>
					<StyledInput
						size={size}
						type="text"
						placeholder='First name'
						label={label}
						name="FNAME"
						setTheme='light'
						onChange={handleChange}
					/>
					<StyledInput
						size={size}
						type="text"
						placeholder='Last name'
						label={label}
						name="LNAME"
						setTheme='light'
						onChange={handleChange}
					/>
				</Grid>
			</div>
			<div style={{ paddingTop: '6px' }}>
				<Button
					type='submit'
					onClick={submit}
					shape='block'
					setTheme='mainColor'
					icon={renderIcon(status)}
					iconPosition='right'
					disabled={!validateEmail(formData?.EMAIL) || !formData?.FNAME || !formData?.LNAME || success || loading}
				>
					Submit
				</Button>
			</div>
			<div>{error}</div>
			<div>{success}</div>
		</FormWrapper>
	)
}

class MailchimpSignup extends Component {
	render () {
		return (
			<MailchimpSubscribe
				url={McUrl}
				render={({ subscribe, status, message }) => (
					<CustomForm
						status={status}
						message={message}
						subscribeMailchimp={subscribe}
						subscribeHubspot
						className={this.props.className}
						placeholder={this.props.placeholder}
						label={this.props.label}
						size={this.props.size || 'small'}
					/>
				)}
			/>
		)
	}
}

export default MailchimpSignup
