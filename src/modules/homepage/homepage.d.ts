type AdvCardProps = {
  id?: string;
  img: string;
  title: string;
  text: string;
};

type AdvantagesProps = {
  title: string;
  data: Array<AdvCardProps>;
};

type GreetingsProps = {
  title: string;
  subtitle: string;
  button: string;
};

type TeamMateProps = {
  id?: string;
  name: string;
  badge: string;
  avatar: string;
  github: string;
  description: string;
};

type TeamProps = {
  title: string;
  data: Array<TeamMateProps>;
};
