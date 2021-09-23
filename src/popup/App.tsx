import React, { FC, useEffect, useState } from 'react'
import Button from './Button'
import styled from 'styled-components'
import useTrackerCount from './useTrackerCount'
import useAllowList from './useAllowList'
import useTabInfo from './useTabInfo'
import Switch from './Switch'
import AllowList from './AllowList'
import Jar from './Jar'

const Header = styled.div`
    text-align: center;
    margin-top: 25px;
    margin-bottom: 30px;
`

const Brand = styled.span`
    font-weight: bold;
    font-size: 24px;
    margin-right: 10px;
`

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    height: 576px;
    justify-content: space-between;
`

const Cointainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
`

const ContainerMiddle = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ContainerBottom = styled.div`
    margin: 0 25px 25px;
    display: flex;
    justify-content: stretch;
    align-items: center;
`

const ContainerBottomLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`

const ContainerBottomRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`

const Counter = styled.div`
    font-weight: medium;
    font-size: 45px;
    margin-right: 15px;
`

const CounterText = styled.div`
    line-height: 22px;
`

const PoweredBy = styled.a`
    font-size: 13px;
    color: #7E7E7E;
    text-align: center;
    margin: 20px 0 25px;
    text-decoration: none;
    font-weight: normal;
`

const ManageButton = styled(Button)`
    background: #3C3C3C;
    border: 2px solid #535353;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    height: 50px;
    margin: 0 25px;
`

const CenterText = styled.div`
    text-align: center;
    width: 100%;
`

const App: FC = () => {
    const [manageOpen, setManageOpen] = useState(false)

    const [allowList, allowDomain, unallowDomain] = useAllowList()

    const [hostname, tabId] = useTabInfo()

    const trackerCount = useTrackerCount(tabId)

    const enabled = !allowList.includes(hostname!)

    const buttonText = manageOpen ? 'Back' : 'Manage exceptions'

    return (
        <Wrapper>
            <Header>
                <Brand>firefly</Brand>tracker catcher
            </Header>
            <Cointainer>
                {/* <AllowList list={allowList} onRemove={unallowDomain} /> */}
                <ContainerMiddle>
                    {enabled && <Jar count={trackerCount} />}
                </ContainerMiddle>
                <ContainerBottom>
                    {hostname ?
                        <>
                            <ContainerBottomLeft>
                                <Counter>{trackerCount}</Counter>
                                <CounterText>trackers {enabled ? 'were' : 'are'} following you</CounterText>
                            </ContainerBottomLeft>
                            <ContainerBottomRight>
                                <div>Protection</div>
                                <Switch active={enabled} onClick={enabled ? () => allowDomain(hostname) : () => unallowDomain(hostname)} />
                            </ContainerBottomRight>
                        </>
                        : <CenterText>This doesn't look like a website</CenterText>
                    }
                </ContainerBottom>
            </Cointainer>
            <ManageButton onClick={() => setManageOpen(open => !open)}>{buttonText}</ManageButton>
            <PoweredBy href={'https://github.com/duckduckgo/tracker-radar'}>Powered by DuckDuckGo tracker radar</PoweredBy>
        </Wrapper>
    )
}

export default App