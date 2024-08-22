import { Box, Typography, Stack, Chip, Divider } from "@mui/material";
import { IFilter } from '@/models/IFilter';
import { useAppContext } from '@/context/context';

export default function Filter() {
  const { filter, setFilter } = useAppContext();
  const filters = Object.entries(IFilter)

  const getVariant = (variant: string) => filter == variant ? 'filled' : 'outlined';

  return (
    <Box sx={{ py: 0, px: 2, minWidth: '200px' }}>
      <Typography variant="overline">Filtering by {filter}</Typography>     
      <Divider sx={{ my: 1 }} /> 
      <Stack spacing={1}>
        { filters.map(([key, value]) => {
          return (
            <Chip 
              key={key}
              label={value}
              size="small" 
              variant={getVariant(key)} 
              color="primary" 
              onClick={() => setFilter(key)} />
          )
        })}
      </Stack>
    </Box>
  );
}