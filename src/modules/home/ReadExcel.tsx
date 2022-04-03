import { Box, Button, FormControl, Grid, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react'
import { ExceljsService } from '../../services/utils/exceljs.service';
import { swalService } from '../../services/utils/swal.service';

const ReadExcel: React.FC = (props) => {

  const [filenameAttached, setFilenameAttached] = React.useState<string>("");
  const [columnItems, setColumnItems] = React.useState<GridColDef[]>([]);
  const [rowItems, setRowItems] = React.useState<any[]>([]);

  const brownFileRef = React.useRef<HTMLInputElement | null>(null);

  const handleClickImport = () => {
    if(!brownFileRef.current?.value) return;

    brownFileRef.current.value = "";
  }

  const handleChangeAttachFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {files, value} = event.target;
    if(!files || !value) return;
    
    try {
      const fileNames: string[] = [];
      for(let i = 0; i < files.length; i++) {
        if(files[i].type != ExceljsService.typeElsx) throw new Error("Some file is not .xlsx, Please type again");
        fileNames.push(files[i]?.name || "N/A");
      }
      setFilenameAttached(fileNames.join(", "));

      const worksheets: any[][][] = await ExceljsService.readExcelByFile(files) as any;
      const newResultDataGrids: any[][] = [];
      worksheets.forEach((worksheetValues, indexWorksheetValeus) => {
        newResultDataGrids.push([]);
        const getHeaderSheet = worksheetValues[1].splice(1);
        const getBodySheet = worksheetValues.splice(2).map(body => body.splice(1));
        
        setColumnItems(getHeaderSheet.map(header => ({
          field: ExceljsService.setTextToKey(header),
          headerName: header,
        })));
        setRowItems(getBodySheet.map((body, index) => ExceljsService.setRowByColumn(getHeaderSheet, body, index)))
      });
    }catch(e: any) {
      swalService.swalAlert({icon: 'error', title: "Failed Attached files", text: e.message});
    }
  }

  return <Box>
    <Grid container justifyContent={'end'} spacing={3}>
      <Grid item>
        <FormControl margin='normal'>
          <Button variant='contained' color='warning' component="label" onClick={handleClickImport}>
            Import .xlsx
            <input hidden data-testid="input-import-file" type="file" accept='.xlsx' ref={brownFileRef} onChange={handleChangeAttachFile} />
          </Button>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="File Attached"
          variant='outlined'
          fullWidth
          size='small'
          margin='normal'
          value={filenameAttached}
          disabled
        />
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
  </Box>;
}

export default ReadExcel;