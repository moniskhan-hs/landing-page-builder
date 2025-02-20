import { Add } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addMultiple } from '../redux/reducers/addMultiComponenet'

const Sidebar = () => {
    const theme = useTheme()
    const menuItemsState = useSelector((state) => state.sidebarMenuReducer)
    const dispatch = useDispatch()


    return (
        <section style={{
            padding: "1.5rem 2rem",
            display: 'flex',
            flexDirection: "column",
            gap: "1rem",
            height: "100vh"
        }}>
            {/* ----------------------------------logo---------------------- */}
            <Box>
                <img src='/logo.png' alt='logo' style={{
                    width: "100%",

                }} />

            </Box>

            {/* ------------------------------- menu---------------------------- */}

            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                gap: 1,
                mt: 3
            }}>
                {
                    menuItemsState.map((ele, index) =>
                        <Stack direction={'row'} key={index} sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: '5px',
                            paddingLeft: 1,
                            backgroundColor: ele.isSelected ? theme.palette.secondary.light : '#ffffff'
                        }}>
                            <Box sx={{
                                marginRight: "auto"
                            }}>
                                <Typography variant='subtitle2' sx={{
                                    color: ele.isSelected ? theme.palette.primary.main : '#000000'
                                }}>{ele.title}</Typography>
                            </Box>


                            <IconButton
                                onClick={() => dispatch(addMultiple({
                                    id: Date.now(),
                                    label: "",
                                    title: ele.title,
                                    isSelected:true

                                }))}
                            >
                               <Add sx={{
                                    color: theme.palette.primary.main
                                }}></Add>

                            </IconButton>

                        </Stack>

                    )
                }

            </Box>

        </section>
    )
}

export default Sidebar
