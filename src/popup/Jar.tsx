import React, { FC, memo } from 'react'
import styled from 'styled-components'
import _Fireflies from './Fireflies'

interface JarProps {
    count: number
}

const JarContainer = styled.div`
    position: relative;
`

const Svg = styled.svg`
    z-index: 2;
    position: relative;
`

const Firefly = styled(_Fireflies)`
    z-index: 1;
    display: block;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Jar: FC<JarProps> = ({ count, ...otherProps }) => {
    return (
        <JarContainer {...otherProps}>
            <Firefly count={count} />
            <Svg width="174" height="275" viewBox="0 0 174 275" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M86.6 41.5C118.7 41.5 145 36.8 145 31.1C145 25.4 118.8 20.7 86.6 20.7C54.4 20.7 28.2 25.4 28.2 31.1C28.2 36.9 54.5 41.5 86.6 41.5ZM145 36.9V33.9C142.6 39.3 117.4 43.6 86.7 43.6C54.4 43.6 28.2 38.9 28.2 33.1V37.7C28.2 39.3356 30.2836 40.8838 34 42.2637V44.1H33.8V55.1C33.8 59.1867 29.5754 63.2557 24.686 67.965C17.9701 74.4335 10 82.11 10 92.7V241.5C10 273.2 163.2 271.8 163.2 241.5V92.7C163.2 82.0869 155.195 74.4 148.47 67.9422C143.599 63.265 139.4 59.2325 139.4 55.2V44.2V42.2637C143.116 40.8838 145.2 39.3356 145.2 37.7C145.2 37.5 145.1 37.2 145 36.9ZM135.2 43.5729C124.684 46.3649 106.883 48.2 86.7 48.2C66.5169 48.2 48.7155 46.3649 38.2 43.5729V55.2C38.2 61.6954 33.0145 66.9869 27.6335 72.4782C21.8305 78.3999 15.8 84.5539 15.8 92.7V232.1C15.8 238.4 31.1 243.1 35.6 244.3C51.5 248.6 70.3 249.8 86.8 249.7C103.3 249.6 121.9 248.2 137.9 243.9C142 242.7 157.6 238 157.6 232.1V92.7C157.6 84.5539 151.57 78.3999 145.767 72.4782C140.385 66.9869 135.2 61.6954 135.2 55.2V43.5729ZM151.4 223.2C151.4 239.6 107.2 249.1 65.2 243.4C95.6 244.9 134.7 237.3 134.7 223.1V97C134.7 86.41 126.73 78.767 120.014 72.3268C115.125 67.638 110.9 63.5867 110.9 59.5V53.3C117.1 52.8 122.7 52.2 127.6 51.4V59.5C127.6 63.5325 131.799 67.565 136.67 72.2422C143.395 78.7 151.4 86.3869 151.4 97V223.2Z" fill="url(#paint0_linear)" shapeRendering="crispEdges" />
                </g>
                <path fillRule="evenodd" clipRule="evenodd" d="M143.3 27.8C143.2 33.5 117.9 38.2 86.6 38.2C55.3 38.2 29.9 33.5 29.9 27.8V17.4H86.6H143.3V27.8Z" fill="#C75A3C" />
                <path fillRule="evenodd" clipRule="evenodd" d="M127.6 35C122.9 35.9 117.2 36.7 110.9 37.2V17.4H127.6V35Z" fill="white" fillOpacity="0.2" />
                <path fillRule="evenodd" clipRule="evenodd" d="M145 16.5C144.9 22.2 118.9 26.9 86.5999 26.9C54.3999 26.9 28.2 22.2 28.2 16.5V7.89999H86.5999H145V16.5Z" fill="#E37151" />
                <path fillRule="evenodd" clipRule="evenodd" d="M127.6 23.9C122.8 24.7 117.2 25.4 110.9 26V9.3H127.6V23.9Z" fill="white" fillOpacity="0.3" />
                <path fillRule="evenodd" clipRule="evenodd" d="M86.5999 15.8C118.7 15.8 145 12.3 145 7.9C145 3.5 118.7 0 86.5999 0C54.5 0 28.2 3.5 28.2 7.9C28.2 12.3 54.5 15.8 86.5999 15.8Z" fill="#FF8F70" />
                <path fillRule="evenodd" clipRule="evenodd" d="M86.6 13.2C116 13.2 139.9 10.8 139.9 7.79999C139.9 4.79999 115.9 2.39999 86.6 2.39999C57.3 2.39999 33.3 4.89999 33.3 7.89999C33.3 10.8 57.2 13.2 86.6 13.2Z" fill="#FFB19B" />
                <path fillRule="evenodd" clipRule="evenodd" d="M86.6 2.5C116.1 2.5 139.9 4.9 139.9 7.9C139.9 8.2 139.7 8.5 139.2 8.7C135.2 6.1 113.1 4.2 86.5 4.2C59.9 4.2 37.8 6.2 33.8 8.7C33.4 8.4 33.1 8.1 33.1 7.9C33.3 4.9 57.1 2.5 86.6 2.5Z" fill="#C75A3C" />
                <defs>
                    <filter id="filter0_d" x="0" y="10.7" width="173.2" height="264.053" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.980392 0 0 0 0 1 0 0 0 0 0 0 0 0 0.08 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                    </filter>
                    <linearGradient id="paint0_linear" x1="86.6" y1="20.7" x2="86.6" y2="264.753" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFFBDA" stopOpacity="0.1" />
                        <stop offset="1" stopColor="white" stopOpacity="0.2" />
                    </linearGradient>
                </defs>
            </Svg>

        </JarContainer>
    )
}

export default memo(Jar)
