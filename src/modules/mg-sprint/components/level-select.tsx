import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import {
  deepOrange,
  indigo,
  lightBlue,
  lime,
  purple,
  yellow,
} from '@mui/material/colors';
import { CEFR } from '../../../app/constants';

export const LangLevelSelector = ({
  action,
}: {
  action: (value: number) => void;
}) => {
  const colors = [
    yellow['600'],
    lightBlue['400'],
    lime['A400'],
    deepOrange['400'],
    indigo['500'],
    purple['500'],
  ];
  return (
    <FormControl>
      <FormLabel>Выберите уровень языка:</FormLabel>
      <RadioGroup row defaultValue={CEFR.a1}>
        {Object.values(CEFR).map((item, index) => (
          <FormControlLabel
            key={item}
            value={index}
            label={item}
            labelPlacement="bottom"
            sx={{ color: colors[index] }}
            control={
              <Radio
                onChange={() => action(index)}
                sx={{
                  color: colors[index],
                  '&.Mui-checked': { color: colors[index] },
                }}
              />
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
