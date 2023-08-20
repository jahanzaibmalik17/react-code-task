import { useEffect, useState } from 'react';
import { useDebounce } from './hooks';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import './main.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Demo() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [records, setRecords] = useState<any[]>([]);
  const [searchBy, setSearchBy] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const searchByOptions = [
    { value: 'university', label: 'Search By University Name' },
    { value: 'country', label: 'Search By Country' },
  ]

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      if (debouncedSearch !== '' && debouncedSearch.length > 3) {
        setSuggestions(oldSuggestion => [...oldSuggestion, debouncedSearch]);
        await axios.post('/search-term', {
          name: debouncedSearch
        });
      }
      let termTextCountry = '';
      let termTextUniversity = '';
      if (searchBy === 'university') {
        termTextUniversity = debouncedSearch
      } else if (searchBy === 'country') {
        termTextCountry = debouncedSearch;
      }
      if (termTextCountry !== '' || termTextUniversity !== '') {
        const response: any = await axios.get(`http://universities.hipolabs.com/search?name=${termTextUniversity}&country=${termTextCountry}`);
        if (response.status === 200) {
          setRecords(response.data);
        }
      } else {
        setRecords([]);
      }
      setLoading(false);
    };
    load();
  }, [debouncedSearch, searchBy]);

  return (
    <div className='main' style={{ marginTop: "50px", marginLeft: "20px" }}>
        <header className="App-header">
          React Code Task
      </header>
      <Box sx={{ flexGrow: 1 }} >
        <Grid container spacing={3}>
          <Grid><title>React Debounce</title></Grid>
          <Grid item xs={4} md={4}>
            <Item>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { width: '100%' },
                }}
              >
                <FormControl >
                  <InputLabel id="searchBy">Search By</InputLabel>
                  <Select
                    labelId="searchBy"
                    id="searchBy"
                    value={searchBy}
                    label="searchBy"
                    placeholder='searchBy'
                    onChange={(e: any) => setSearchBy(e.target.value)}
                  >
                    <MenuItem value='' />
                    {searchByOptions.map(item => (
                      <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={4} md={4}>
            <Item>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={suggestions.map((option) => option)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onChange={(e: any) => setSearch(e.target.value)}
                      onSelect={(e: any) => setSearch(e.target.value)}
                      placeholder='Search Record'
                      label="Search"
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                    />
                  )}
                />
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>

      {loading && <div>Loading...</div>}
      {!loading &&
        records.length > 0 && records.map((rec) => {
          return <div className="search-records" key={rec.id}>{rec.name}</div>;
        })}
    </div>
  );
}
