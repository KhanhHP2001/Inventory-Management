import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, MenuItem, Checkbox, Menu } from '@mui/material';
// component
import Iconify from '../../../../components/iconify';
import { useEffect, useState } from 'react';
import { getCategoriesSearch } from '~/data/mutation/categories/categories-mutation';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

CategoryToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function CategoryToolbar({ numSelected, onFilterName, onDataSearch }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({ filter1: false, filter2: false, filter3: false, filter4: false, filter5: false,  filter6: false });
  const [filterName, setFilterName] = useState('');

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilters({ ...selectedFilters, [filter]: !selectedFilters[filter] });
  };

  const handleSearch = async (keyword) => {
    try {
      const result = await getCategoriesSearch(keyword);
      console.log('Search result:', result);

      onDataSearch(result.data);
    } catch (error) {
      console.error('Error searching subcategories:', error);
    }
  };

  useEffect(() => {
    if (filterName) {
      handleSearch(filterName);
    }
  }, [filterName]);


    return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <StyledSearch
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="Tìm kiếm..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            }
          />
        </>
      )}
    </StyledRoot>
  );
}