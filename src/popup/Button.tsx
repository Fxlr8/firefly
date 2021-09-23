import styled from 'styled-components'

const BlockButton = styled.button`
	background-color: transparent;
	border-radius: 0;
	border: none;
	outline: none;
	color: inherit;
	padding: 0;
	font-weight: inherit;
	cursor: pointer;
	&::-moz-focus-inner {
		border: 0;
	}
`
export default BlockButton
