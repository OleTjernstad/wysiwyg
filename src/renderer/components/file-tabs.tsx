import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useFile } from 'renderer/context/file';

export default function FileSelector() {
  const { activeId, files, isEdited, setActiveFile, refreshIndex } = useFile();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveFile(newValue);
  };

  return (
    <Tabs
      sx={{ marginBottom: '8px' }}
      value={activeId}
      key={refreshIndex}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
    >
      {files.map((f) => (
        <Tab
          sx={{ textTransform: 'none' }}
          key={f.id}
          value={f.id}
          label={isEdited.get(f.id) ? `${f.name} *` : f.name}
        />
      ))}
    </Tabs>
  );
}
