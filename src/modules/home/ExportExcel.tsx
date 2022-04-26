import { Box, Button, FormControl, Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react'
import { ExceljsService } from '../../services/utils/exceljs.service';

const ExportExcel: React.FC = (props) => {
  const mockColumnTotal = 15;
  const mockRowTotal = 100;

  const [columnItems, setColumnItems] = React.useState<GridColDef[]>([]);
  const [rowItems, setRowItems] = React.useState<any[]>([]);

  const handleClickExport = () => {
    const headers = columnItems.map(column => ({header: column.headerName, key: column.field}));
    ExceljsService.exportExcel({re_columns: headers, rows: rowItems, filename: "Test Export-Excel"});
  }

  React.useEffect(() => {
    // mock data for export excel
    const getColumns = new Array(mockColumnTotal).fill("MockColumn").map((column, index) => `${column}-${index + 1}`);
    setColumnItems(getColumns.map(column => ({
      field: ExceljsService.setTextToKey(column),
      headerName: column
    })));

    const setMockArray = new Array(mockRowTotal).fill("Something");
    const getBodies = setMockArray.map((body, index) => ExceljsService.setRowByColumn(getColumns, body, index));
    setRowItems(getBodies)

  }, []);
  return <Box>
    <Grid container justifyContent={'end'} spacing={3}>
      <Grid item>
        <FormControl margin='normal'>
          <Button variant='contained' color='primary' onClick={handleClickExport}>Export .xlsx</Button>
        </FormControl>
      </Grid>
    </Grid>

    <Box sx={{height: 800, width: '100%'}}>
      <DataGrid
        rows={rowItems}
        columns={columnItems}
        pageSize={20}
        rowsPerPageOptions={[5]}
      />
    </Box>
  </Box>
}

export default ExportExcel;