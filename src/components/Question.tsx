import React from 'react'

interface Props {
  number: number;
}

const Question: React.FC<Props> = (({children, number}) => {
  return (
    <div className="block">
      <li>
        <div className="box" style={{backgroundColor: number%2==0 ? "azure" : "white"}}>
          {children}
        </div>
      </li>
    </div>
  )
})

export default Question
