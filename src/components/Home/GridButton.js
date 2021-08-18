import styled from 'styled-components'

export default function GridButton ({ isPlayed = false, soundPlay }) {
  return <Wrapper isPlayed={isPlayed} onClick={soundPlay}/>

}

const Wrapper = styled.div`
  border-radius: 4px;
  background: rgba(213, 236, 194, 1);
  background: radial-gradient(
    circle, 
    rgba(213, 236, 194, 1) 0%,
    rgba(152, 221, 202, 1) 100%
  );
  position: relative;
  overflow: hidden;
  &::before{
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    background: radial-gradient(
      circle, 
      rgba(255, 170, 167, 1) ${(props) => (props.isPlayed ? "20%" : "0%")},
      rgba(255, 230, 213, 1) 100%
    );
    opacity: ${(props) => (props.isPLayed ? "1" : "0")};
    transition: linear 0.2s;
  }
  &:hover::before{
    opacity: 1;
  }
  &:active::before{
    opacity: 1;
    background: radial-gradient(
      circle, 
      rgba(255, 170, 167, 1) 20%,
      rgba(255, 230, 213, 1) 100%
    );
  }
`