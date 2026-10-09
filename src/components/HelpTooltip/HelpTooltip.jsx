/*
  A label followed by a help icon that opens its tooltip on click instead of hover
*/

import HelpOutlineIcon from '@mui/icons-material/HelpOutlineOutlined';
import { ClickAwayListener } from '@mui/material';
import { useState } from 'react';
import { PSATooltip } from 'shared-react-components/src';

const HelpTooltip = ({ label, description, details }) => {
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <span>
        <PSATooltip
          open={open}
          onClose={() => setOpen(false)}
          disableHoverListener
          disableFocusListener
          disableTouchListener
          placement="right-end"
          title={
            <>
              {description}
              {details && (
                <>
                  <br />
                  {details}
                </>
              )}
            </>
          }
          tooltipContent={
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
            >
              {label}
              <HelpOutlineIcon style={{ cursor: 'pointer', transform: 'scale(0.7)' }} />
            </button>
          }
        />
      </span>
    </ClickAwayListener>
  );
};

export default HelpTooltip;
