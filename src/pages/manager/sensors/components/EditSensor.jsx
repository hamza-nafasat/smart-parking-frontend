import { useState } from 'react'
import Button from '../../../../components/shared/small/Button'
import Input from '../../../../components/shared/small/Input'
import toast from 'react-hot-toast'

const EditSensor = ({onClose}) => {

    const formSubmitHandler = (e) => {
        console.log('button clicked')
        e.preventDefault()
    }

  return (
    <form className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5" onSubmit={formSubmitHandler}>
        <div className="lg:col-span-6">
            <Input name="sensorName" placeholder="Sensor name" label="Sensor name" />
        </div>
        <div className="lg:col-span-6">
            <Input name="sensorId" placeholder="23920393" label="Sensor ID" />
        </div>
        <div className="lg:col-span-12 flex justify-end">
        <div className="flex items-center gap-4">
          <Button
            text="Cancel"
            width="w-20 sm:w-[110px]"
            bg="bg-transparent hover:bg-primary hover:text-white"
            color="text-primary"
            onClick={onClose}
          />
          <Button width="w-[120px]" type="submit" text="Add" />
        </div>
      </div>
    </form>
  )
}

export default EditSensor