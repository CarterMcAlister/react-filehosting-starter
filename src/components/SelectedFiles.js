import React from 'react'
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow,
  Text, Box } from 'grommet'

function SelectedFiles({ files }) {

  return (
    <Table>
      <TableBody>
        {files.map(file => 
            <TableRow key={file.name+file.lastModified}>
                <TableCell scope="row">
                  <strong>{file.name}</strong>
                </TableCell>
                <TableCell scope="row" right={0} style={{alignItems: 'flex-end'}}>
                  {file.size/1000}MB
                </TableCell>
            </TableRow>
        )}
      </TableBody>
    </Table>
  )
}



export default SelectedFiles
