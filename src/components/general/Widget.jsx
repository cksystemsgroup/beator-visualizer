import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

export default function Widget({ children, title, expanded, sx }) {
  return (
    <Accordion
      defaultExpanded={expanded}
      disableGutters
      sx={{
        width: "20vw",
        position: "fixed",
        overflow: "hidden",
        maxHeight: "40vh",
        borderRadius: 1,
        ...sx,
      }}>
      <AccordionSummary
        sx={{ borderBottom: 1, borderColor: "divider" }}
        expandIcon={<ExpandMoreIcon />}>
        {title}
      </AccordionSummary>
      <AccordionDetails sx={{ height: "35vh" }}>{children}</AccordionDetails>
    </Accordion>
  );
}
