import React, { FC, useEffect, useState } from 'react'
import Button from './Button'
import styled from 'styled-components'
import useTrackerCount from './useTrackerCount'
import useAllowList from './useAllowList'
import useTabInfo from './useTabInfo'
import Switch from './Switch'
import AllowList from './AllowList'
import Eyes from './Eyes'
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
    position: relative;
    z-index: 2;
`

const Container = styled.div`
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
    width: 100%;
`

const ContainerBottom = styled.div`
    margin: 0 25px 25px;
    display: flex;
    justify-content: stretch;
    align-items: center;
`

const ContainerBottomLeft = styled.div<{ hide: boolean }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    opacity: ${props => props.hide ? 0 : 1};
    transition: opacity 300ms ease;
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

const Darkness = styled.div<{ show: boolean }>`
    z-index: 1;
    position: absolute;
    width: 380px;
    height: 576px;
    left: 0px;
    top: 0px;
    opacity: ${props => props.show ? 1 : 0};
    background: radial-gradient(71.63% 71.63% at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.58) 100%);
    transition: opacity 600ms ease;
`

const EyesOne = styled(Eyes)`
    top: 100px;
    left: 140px;
    z-index: 0;
`
const EyesTwo = styled(Eyes)`
    top: 270px;
    left: 260px;
    z-index: 0;
`
const EyesThree = styled(Eyes)`
    top: 340px;
    left: 45px;
    z-index: 0;
`

const TheySeeYou = styled.div`
    font-size: 20px;
    font-weight: medium;
`

const App: FC = () => {
    const [manageOpen, setManageOpen] = useState(false)

    const [allowList, allowDomain, unallowDomain] = useAllowList()

    const [hostname, tabId] = useTabInfo()

    const trackerCount = useTrackerCount(tabId)

    const enabled = !allowList.includes(hostname!)

    const buttonText = manageOpen ? 'Back' : 'Unprotected websites'

    return (
        <>
            <Darkness show={!enabled && !manageOpen} />
            {!enabled && !manageOpen &&
                <>
                    <EyesOne />
                    <EyesTwo />
                    <EyesThree />
                </>
            }
            <Wrapper>
                <Header>
                    <Brand>firefly</Brand>tracker catcher
                </Header>
                {manageOpen ?
                    <Container>
                        <AllowList list={allowList} onRemove={unallowDomain} />
                    </Container>
                    :
                    <Container>
                        <ContainerMiddle>
                            {enabled && <Jar count={trackerCount} />}
                            {!enabled && <TheySeeYou>Now they see you...</TheySeeYou>}
                        </ContainerMiddle>
                        <ContainerBottom>
                            {hostname ?
                                <>
                                    <ContainerBottomLeft hide={!enabled && trackerCount === 0}>
                                        <Counter>{trackerCount}</Counter>
                                        <CounterText>trackers {!enabled ? 'are' : 'were'} following you</CounterText>
                                    </ContainerBottomLeft>
                                    <ContainerBottomRight>
                                        <div>Protection</div>
                                        <Switch active={enabled} onClick={enabled ? () => allowDomain(hostname) : () => unallowDomain(hostname)} />
                                    </ContainerBottomRight>
                                </>
                                : <CenterText>This doesn't look like a website</CenterText>
                            }
                        </ContainerBottom>
                    </Container>
                }
                <ManageButton onClick={() => setManageOpen(open => !open)}>{buttonText}</ManageButton>
                <PoweredBy target='_blank' href={'https://github.com/duckduckgo/tracker-radar'}>Powered by DuckDuckGo tracker radar</PoweredBy>
            </Wrapper>
        </>
    )
}

export default App