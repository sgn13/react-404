import { ArrowDropDown } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

function Index({ header = 'header', children = 'sample data' }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDropDown />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {header}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

export default Index;
