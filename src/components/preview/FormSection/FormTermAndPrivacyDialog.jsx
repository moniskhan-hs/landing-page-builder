/* eslint-disable react/prop-types */
import { Close } from "@mui/icons-material"
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"

const FormTermAndPrivacyDialog = ({isOpen,setIsOpen,termsAndConditions}) => {
  return (
    <Dialog
      onClose={() => setIsOpen(false)}
      open={isOpen}
      PaperProps={{
        sx: {
          width: { xs: "90%", sm: "70%", md: "50%" },
          maxHeight: { xs: "80vh", sm: "80vh", md: "80vh" },
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Terms & Conditions
        <IconButton
          aria-label="close"
          onClick={() => setIsOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ overflowY: "auto" }}>
        <Typography variant="subtitle1">
       {termsAndConditions || ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac magna justo.Curabitur vel justo a nulla gravida dictum. Sed non purus vel justo consequat vehicula.Vivamus ut commodo erat. Integer ac elit in justo vestibulum accumsan.'}
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default FormTermAndPrivacyDialog
