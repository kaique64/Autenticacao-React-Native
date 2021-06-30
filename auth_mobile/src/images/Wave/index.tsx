import React from 'react';
import { SvgXml } from 'react-native-svg';

const Wave = () => {
    const waveSvg = '<svg width="414" height="189" viewBox="0 0 414 189" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0V189C42.3714 189 151.231 175.1 247.697 119.5C344.163 63.9 398.76 142.667 414 189V0H0Z" fill="#4558FF"/></svg>';
    
    const WaveSvg = () => <SvgXml xml={waveSvg}  />

    return <WaveSvg />;
};

export default Wave;