import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

// specify the type for tabProps object
interface CustomizedTabsProps {
  tabProps: { [key: string]: React.ReactNode };
}

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  width: "100%",
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: "100%",
    width: "100%",
    backgroundColor: "#fb788e",
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  width: "50%",
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(0),
  // color: 'rgba(255, 255, 255, 0.7)',
  color: "gray",
  "&.Mui-selected": {
    // color: '#fff',
    color: "black",
  },
  // '&.Mui-focusVisible': {
  //   backgroundColor: 'rgba(100, 95, 228, 0.32)',
  // },
}));

export default function CustomizedTabs(props: CustomizedTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { tabProps } = props;

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Box sx={{ bgcolor: '#2e1534' }}> */}
      <Box sx={{ bgcolor: "white" }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          {/* <StyledTab label="Workflows" />
          <StyledTab label="Datasets" /> */}
          {Object.keys(tabProps).map((key, index) => (
            <StyledTab key={index} label={key} />
          ))}
        </StyledTabs>
        <Box>{Object.values(tabProps)[value]}</Box>
      </Box>
    </Box>
  );
}
