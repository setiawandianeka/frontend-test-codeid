import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const DivShadowCard = styled.div(
  ({
    xShadow,
    yShadow
  }) => `
    box-shadow: ${xShadow}px ${yShadow}px 1px -1px rgba(0,0,0,1);
  `
);

function App() {
  const [count, setCount] = useState(0)
  const incrementCount = useCallback(() => {
    setCount(count + 1)
  },[count])
  
  return(
    <div className="p-5 bg-white text-black min-h-screen">
      <div className="text-xl font-extrabold">Contact space</div>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        <DivShadowCard xShadow={3} yShadow={4} className="bg-white rounded-lg p-6 text-black border-2 border-black">
          asad
        </DivShadowCard>
        <DivShadowCard xShadow={3} yShadow={4} className="bg-white rounded-lg p-6 text-black border-2 border-black">
          asad
        </DivShadowCard>
        <DivShadowCard xShadow={3} yShadow={4} className="bg-white rounded-lg p-6 text-black border-2 border-black">
          asad
        </DivShadowCard>
        <DivShadowCard xShadow={3} yShadow={4} className="bg-white rounded-lg p-6 text-black border-2 border-black">
          asad
        </DivShadowCard>
        <DivShadowCard xShadow={3} yShadow={4} className="bg-white rounded-lg p-6 text-black border-2 border-black">
          asad
        </DivShadowCard>
        <DivShadowCard xShadow={3} yShadow={4} className="bg-white rounded-lg p-6 text-black border-2 border-black">
          asad
        </DivShadowCard>
        <DivShadowCard xShadow={3} yShadow={4} className="bg-white rounded-lg p-6 text-black border-2 border-black w-fit cursor-pointer hover:bg-indigo-300">
          <div>+</div>
        </DivShadowCard>
      </div>
    </div>
  )
}

export default App
