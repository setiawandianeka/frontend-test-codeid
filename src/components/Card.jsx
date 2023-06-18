
import styled from 'styled-components';

const DivShadowCard = styled.div(
  ({
    xshadow,
    yshadow
  }) => `
    box-shadow: ${xshadow}px ${yshadow}px 1px -1px rgba(0,0,0,1);
  `
);

const Card = ({
  children,
  className,
  xShadow = 3,
  yShadow = 6,
  onClick,
  ...rest
}) => {

  return (
    <DivShadowCard xshadow={xShadow} yshadow={yShadow} className={className} onClick={onClick}>
      {children}
    </DivShadowCard>
  )
}

export default Card;
