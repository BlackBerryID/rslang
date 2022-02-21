import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { AudioPlayer } from '../../../utils/audio-player';

export const MGSprintStatTable = ({
  elements,
}: {
  elements: Array<GameResult>;
}) => {
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table sx={{ width: '100%' }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '16px' }}>Слово</TableCell>
            <TableCell sx={{ fontSize: '16px' }} align="right">
              Перевод
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {elements.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                component="td"
                scope="row"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <IconButton
                  aria-label="say word"
                  onClick={() => AudioPlayer.playEffect(item.audio)}
                >
                  <VolumeUpIcon />
                </IconButton>
                {item.word}
              </TableCell>
              <TableCell align="right">{item.translate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
