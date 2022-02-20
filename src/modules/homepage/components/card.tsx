import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export const AdvCard = ({ img, title, text }: AdvCardProps) => {
  return (
    <Card>
      <CardMedia component="img" height="240" image={img} alt="textbook" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};
