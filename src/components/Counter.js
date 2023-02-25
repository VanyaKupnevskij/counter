import { useState, useRef } from 'react';

import styled from 'styled-components';
import { keyframes, css } from 'styled-components';

export default function Counter({ max = 100, min = 0 }) {
  const [value, setValue] = useState(0);
  const [animState, setAnimState] = useState('none');
  const labelRef = useRef(null);

  function incremment(step = 1) {
    value < max && handleValueChange(value + Math.abs(step));
  }

  function dicremment(step = 1) {
    value > min && handleValueChange(value - Math.abs(step));
  }

  function handleValueChange(newValue) {
    newValue = parseInt(newValue, 10);
    if (newValue === null || newValue === undefined) {
      newValue = '';
      return;
    }
    if (newValue > max) newValue = max;
    if (newValue < min) newValue = min;

    // select type animation up or down
    setAnimState(newValue > value ? 'up' : newValue < value ? 'down' : 'none');
    // restart animation
    labelRef.current.style.animationName = 'none';
    requestAnimationFrame(() => {
      labelRef.current.style.animationName = '';
    });
    // delay for cool animation effect
    setTimeout(() => setValue(newValue), 200);
  }

  return (
    <Panel>
      <DicrementButton
        title="-1"
        onClick={() => {
          dicremment(1);
        }}>
        -
      </DicrementButton>
      <ValueBlock>
        <ValueLabel
          animState={animState}
          ref={labelRef}
          type="text"
          value={value}
          onChange={(e) => handleValueChange(e.target.value)}
        />
      </ValueBlock>
      <IncrementButton
        title="+1"
        onClick={() => {
          incremment(1);
        }}>
        +
      </IncrementButton>
    </Panel>
  );
}

const Panel = styled.div`
  margin: 100px 20px;
  padding: 5px;
  background: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
`;

const Button = styled.button`
  border-radius: 6px;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 13px;
  line-height: 12px;
  transition: all 0.2s ease-in-out;
`;

const DicrementButton = styled(Button)`
  background: #fde7e7;
  color: #863533;
  &:hover {
    background: #fde7e7a0;
  }
`;

const IncrementButton = styled(Button)`
  background: #dfebf9;
  color: #144f9e;
  &:hover {
    background: #dfebf9a0;
  }
`;

// value input
const growUpAnim = keyframes`
0% {
    opacity: 1;
    transform: translateY(0);
}
50% {
    opacity: 0;
    transform: translateY(-100%);
}
51% {
    transform: translateY(100%);
}
100% {
    opacity: 1;
    transform: translateY(0);
}
`;

const growDownAnim = keyframes`
0% {
    opacity: 1;
    transform: translateY(0);
}
50% {
    opacity: 0;
    transform: translateY(100%);
}
51% {
    transform: translateY(-100%);
}
100% {
    opacity: 1;
    transform: translateY(0);
}
`;

const activeAnimUp = () => css`
  animation-name: ${growUpAnim};
`;

const activeAnimDown = () => css`
  animation-name: ${growDownAnim};
`;

const ValueBlock = styled.div`
  overflow: hidden;
  width: 40px;
  height: 100%;
  margin: 0px 5px;
  display: flex;
`;

const ValueLabel = styled.input`
  background: none;
  border: none;
  outline: none;
  width: 100%;
  text-align: center;
  font-weight: 600;
  overflow: hidden;

  ${(props) =>
    props.animState === 'up' ? activeAnimUp : props.animState === 'down' ? activeAnimDown : ''};
  animation-duration: 0.4s;
  animation-direction: alternate;
  animation-iteration-count: 1;
`;
