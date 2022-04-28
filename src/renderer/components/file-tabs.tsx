import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useFile } from 'renderer/context/file';

export default function FileSelector() {
  const { activeIndex, files, setActiveFile } = useFile();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveFile(newValue);
  };

  return (
    <Tabs
      sx={{ marginBottom: '8px' }}
      value={activeIndex}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
    >
      {files.map((f, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Tab sx={{ textTransform: 'none' }} key={i} value={i} label={f.name} />
      ))}
    </Tabs>
  );
}
