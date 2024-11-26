'use client'
import React from 'react'
import { FormProviderCreateGarage, FormTypeCreateGarage, useFormCreateGarage } from '../forms/createGarages'
import { useMutation } from '@apollo/client'
import { CreateGarageDocument, namedOperations } from '../../../../libs/Network/src/gql/generated'
import { Label } from '../../../../web/src/components/ui/label'
import { Input } from '../../../../web/src/components/ui/input'
import { Textarea } from '../../../../web/src/components/ui/textarea'
import { Button } from '../../../../web/src/components/ui/button'
import { ImagePreview } from '../molicules/ImagePrivew'
import { Controller, useFormContext } from 'react-hook-form'
import { useCloudinaryUpload } from '../hook/claudinary'
import { Map } from '../../../../web/src/components/SubComponents/map/Map'
import { SearchPlaceBox } from '../../../../web/src/components/SubComponents/map/SearchPlaceBox'
import { Panel } from '../../../../web/src/components/SubComponents/map/Panel'
import { CenterOfMap, DefaultZoomControls } from '../../../../web/src/components/SubComponents/map/ZoomControls'
import { initialView } from '../../../../web/src/libs/constants'
import { ViewState } from '../../../../web/src/libs/utils'
import { GarageComponent } from '../molicules/GarageComponent'
const CreateGarageContent = () => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: { errors },
        resetField,
        watch,
    } = useFormContext<FormTypeCreateGarage>()

    const { images } = watch()

    const { uploading, upload } = useCloudinaryUpload()

    const [CreateGarage, { data, error, loading }] = useMutation(CreateGarageDocument, {
        refetchQueries: [namedOperations.Query.Garages]
    },)

    return (
        <div className='grid md:grid-cols-2 mt-2'>
            <div>

                <form>
                    <Label title='Garage Name'>
                        <Input {...register("displayName")} placeholder='Garage name' />
                    </Label>
                    <Label title='Description'>
                        <Textarea {...register("description")} placeholder='Garage Describe....' />
                    </Label>
                    <Label title='Address'>
                        <Textarea {...register("location.address")} placeholder='place,streatname,75211..' />
                    </Label>
                    <ImagePreview
                        srcs={images}
                        clearImage={() => resetField('images')}>
                        <Controller
                            control={control}
                            name={`images`}
                            render={({ field }) => (
                                <Input
                                    type='file'
                                    accept='image/*'
                                    multiple={true}
                                    onChange={(e) => field.onChange(e?.target?.files)}
                                    className='border-0'
                                />
                            )}

                        />
                    </ImagePreview>
                    <Button type='submit'>{loading || uploading ? 'Creating..' : "Great Garage"}</Button>
                </form>
            </div>
            <Map
                onLoad={(e) => {
                    const { lat, lng } = e.target.getCenter()
                    setValue('location.lat', lat)
                    setValue('location.lng', lng)
                }}
                initialViewState={initialView}>
                    <GarageComponent/>
                <Panel position='left-top'>
                    <SearchPlaceBox
                        onLocationChange={(location: ViewState) => {
                            setValue('location.lat', location.latitude)
                            setValue('location.lng', location.longitude)
                        }}
                    />
                    <DefaultZoomControls>
                        <CenterOfMap onClick={(latLng) => {
                            const lat = parseFloat(latLng.lat.toFixed(7))
                            const lng = parseFloat(latLng.lng.toFixed(7))

                            setValue('location.lat', lat, {
                                shouldValidate: true,
                            })
                            setValue('location.lng', lng, {
                                shouldValidate: true,
                            })
                        }} />
                    </DefaultZoomControls>
                </Panel>
            </Map>
        </div>
    )
}





export const CreateGarage = () => {
    return (
        <FormProviderCreateGarage>
            <CreateGarageContent />
        </FormProviderCreateGarage>
    )
}


