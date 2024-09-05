import React, { useState } from 'react';
import { Card, CardContent, Grid, TextField, Typography } from '@mui/material';

const SearchBox = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <Card sx={{ marginBottom: 2, height: '3rem' }}>
      <CardContent sx={{ padding: '8px' }}>

      <Grid container>
      <Grid xs={0.7}>
        <Typography variant="body2" sx={{mx:1 ,my:1}} >
          Search:
        </Typography>
    </Grid>
    <Grid xs={10}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            width: '30%',
            '& .MuiOutlinedInput-root': {
              height: '30px',
              padding: '0 8px',
            },
            '& .MuiInputBase-input': {
              padding: '8px',
            },
          }}
        />
        </Grid>
</Grid>
      </CardContent>
    </Card>
  );
};

export default SearchBox;