import React, { FC, memo, ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'

const AllowListWrapper = styled.div`
`

const AllowListEntry = styled.div`
    height: 50px;
    border-radius: 10px;
    border: 2px solid #3F3F3F;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    margin-bottom: 8px;
`

const Host = styled.div`

`

const CrossWrapper = styled.div`
    padding: 15px;
    padding-right: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Cross: FC<ComponentPropsWithoutRef<'div'>> = (props) => {
    return (
        <CrossWrapper {...props}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.292891 0.292891C-0.0976276 0.683409 -0.097633 1.31658 0.292891 1.7071L4.53553 5.94975L0.292891 10.1924C-0.0976276 10.5829 -0.097633 11.2161 0.292891 11.6066C0.683415 11.9971 1.31659 11.9971 1.7071 11.6066L5.94975 7.36396L10.1924 11.6066C10.5829 11.9971 11.2161 11.9971 11.6066 11.6066C11.9971 11.2161 11.9971 10.5829 11.6066 10.1924L7.36396 5.94975L11.6066 1.7071C11.9971 1.31659 11.9971 0.683415 11.6066 0.292891C11.2161 -0.097633 10.5829 -0.0976276 10.1924 0.292891L5.94975 4.53553L1.7071 0.292891C1.31658 -0.097633 0.683409 -0.0976276 0.292891 0.292891Z" fill="#C4C4C4" />
            </svg>
        </CrossWrapper>
    )
}

interface AllowListProps {
    list: string[],
    onRemove: (host: string) => void
}

const AllowList: FC<AllowListProps> = ({ list, onRemove }) => {
    return (
        <AllowListWrapper>
            {list.map((host) => (
                <AllowListEntry key={host}>
                    <Host>{host}</Host>
                    <Cross onClick={() => onRemove(host)} />
                </AllowListEntry>
            ))}
        </AllowListWrapper>
    )
}

export default memo(AllowList)