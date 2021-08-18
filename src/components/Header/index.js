import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

export default function Header () {
  const location = useLocation()

  return (
    <Wrapper>
      <h1>My super music app</h1>
      <nav>
        <Link to="/">
          <MenuEl isCurrentPage={location.pathname === '/'}>Home</MenuEl>
        </Link>
        <Link to="/about">
          <MenuEl isCurrentPage={location.pathname === '/about'}>About</MenuEl>
        </Link>
      </nav>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0px 24px;
  align-items: center;
  & nav{
    display: flex;
  }
  & a{
      text-decoration: none;
      color: inherit;
  }
  & a:first-child{
      margin-right: 16px;
  }
`

const MenuEl = styled.p`
  font-size: 18px;
  padding-bottom: 2px;
  border-bottom: solid 2px ${(props) => props.isCurrentPage ? '' : 'transparent'};
  &:hover{
    border-bottom: solid 2px;
  }
`