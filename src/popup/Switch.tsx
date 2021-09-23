import React, { FC, ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'

const SwitchArm = styled.div<{ active: boolean }>`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: ${props => props.active ? '#E37151' : '#9D9D9D'};
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(${props => props.active ? '100%' : '0'}, -50%);
    transition: transform 300ms ease, background-color 200ms ease;
`

const SwitchBody = styled.div<{ active: boolean }>`
    width: 42px;
    height: 12px;
    border-radius: 6px;
    background-color:${props => props.active ? '#E3715144' : '#FFFFFF44'};
    position: relative;
    cursor: pointer;
    margin: 15px 0 15px 15px;
    transition: background-color 200ms ease;
`

interface SwitchProps {
    active: boolean,
    onClick: () => void
}

const Switch: FC<ComponentPropsWithoutRef<'div'> & SwitchProps> = ({ active, ...otherProps }) => {
    return (
        <SwitchBody active={active} {...otherProps}>
            <SwitchArm active={active} />
        </SwitchBody>
    )
}

export default Switch