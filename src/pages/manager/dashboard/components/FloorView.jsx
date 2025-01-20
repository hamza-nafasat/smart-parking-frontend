import React from 'react'
import floorViewImg from '../../../../assets/images/dashboard/floor-view-img-2.png'

const FloorView = () => {
  return (
    <div className='h-full'>
        <img src={floorViewImg} alt="image" className='w-full h-[400px] object-contain' />
    </div>
  )
}

export default FloorView