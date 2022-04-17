import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../Styles/Card.css'

const Card = ({title, number, caseType, color, cases, setCaseType }) => {
    
  return (
    <div className='col-12 col-sm-6 col-md-3 mb-2' onClick={() => setCaseType(cases)}>
        <div className='container single-card' style={{backgroundColor:color}}>
            <div className="row">
                <div className='col-12 text-secondary'>
                    {title}
                </div>
                <div className='col-12'>
                    <h3>{number}</h3>
                </div>                
            </div>
        </div>
    </div>
  )
}

export default Card