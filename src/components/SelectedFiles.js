import React from 'react'
import { Table, Button } from 'react-bootstrap'
import styled from '@xstyled/styled-components'

function SelectedFiles({ files, removeFile }) {
  return (
    <Table responsive>
      <tbody>
        {files.map(file => (
          <tr key={file.name + file.lastModified}>
            <td>
              <strong>{file.name}</strong>
            </td>
            <TableCell>
              <span style={{ paddingRight: '5px' }}>{file.size / 1000} MB </span>
              <Button variant="danger" size="sm" onClick={() => removeFile(file)}>
                X
              </Button>
            </TableCell>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const TableCell = styled.td`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export default SelectedFiles
