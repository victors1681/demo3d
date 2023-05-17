import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LanguageIcon from '@mui/icons-material/Language'; 
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MapIcon from '@mui/icons-material/Map';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import DescriptionIcon from '@mui/icons-material/Description';
export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <LanguageIcon />
      </ListItemIcon>
      <ListItemText primary="View" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <MapIcon />
      </ListItemIcon>
      <ListItemText primary="Map" />
    </ListItemButton>

  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <CenterFocusWeakIcon />
      </ListItemIcon>
      <ListItemText primary="Center" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FolderCopyIcon />
      </ListItemIcon>
      <ListItemText primary="Files" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DescriptionIcon />
      </ListItemIcon>
      <ListItemText primary="Documents" />
    </ListItemButton>
  </React.Fragment>
);