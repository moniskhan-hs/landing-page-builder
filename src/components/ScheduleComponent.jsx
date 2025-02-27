/* eslint-disable react/prop-types */
import React from 'react'
import { scheduleData } from '../utils/data'
import { Box, Stack, Typography } from '@mui/material'

const ScheduleComponent = ({ iconBackground, iconType, iconColor, paperColor ,data}) => {

    return (
        <Stack sx={{
            display: 'grid',
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "3rem",
            rowGap: "3rem",
        
        }}>
            {
                data?.map((ele, index) => {
                    // const Icon = ele.icon

                    return (<Stack direction={'row'} key={index} sx={{
                        width: "100%",
                        gap: "1rem",
                        padding:"1rem",
                        borderRadius:"12px",
                        // border:"1px solid",
                        
                        bgcolor: paperColor,
                    }}>
                        {/* -------------------- Icon will be added in future */}
                        {/* <Stack variant='center' sx={{
                            width: '30%',
                            // padding:"2rem"
                            backgroundColor: iconBackground || "#4caf50",
                            borderRadius: iconType=='circle'?'100px':iconType =='shape'?'12px':'0px'
                        }}>


                            <Icon sx={{
                                color: iconColor,
                                width: "2.5rem",
                                height: "2.5rem"
                            }} />
                        </Stack> */}
                        <Stack sx={{
                            flex: 1
                        }} >
                            <Typography variant='h6'>{ele.labelText} </Typography>
                            <Typography variant='h5'>{ele.infoText || "some value"} </Typography>

                        </Stack>


                    </Stack>)


                }

                )


            }
        </Stack>
    )
}

export default ScheduleComponent
