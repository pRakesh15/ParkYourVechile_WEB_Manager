import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormTypeCreateGarage } from '../forms/createGarages'
import { MapMarker } from '../../../../web/src/components/SubComponents/map/MapMarker'
import { CircleParking } from 'lucide-react'


export const GarageComponent = () => {
    const { location } = useWatch<FormTypeCreateGarage>()
    const { setValue } = useFormContext<FormTypeCreateGarage>()


    return (
        <MapMarker
            pitchAlignment="auto"
            longitude={location?.lng || 0}
            latitude={location?.lat || 0}
            draggable
            onDragEnd={({lngLat}) => {
                const { lat, lng } = lngLat
                setValue('location.lat', lat || 0)
                setValue('location.lng', lng || 0)
            }}
        >
            <CircleParking className="bg-red-600 h-4 w-4 rounded-2xl" />

        </MapMarker>
    )
}