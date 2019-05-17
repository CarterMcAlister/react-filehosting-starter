import React from 'react'
import { Table } from 'react-bootstrap'

function SelectedFiles({ files }) {
  return (
    <Table responsive>
      <tbody>
        {files.map(file => (
          <tr key={file.name + file.lastModified}>
            <td>
              <strong>{file.name}</strong>
            </td>
            <td style={{ alignItems: 'flex-end' }}>{file.size / 1000}MB</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default SelectedFiles
