import { Greetings } from './blocks/greeting';
import { Advantages } from './blocks/advantages';
import { Team } from './blocks/team';

import data from './content/sections.json';

export const Homepage = () => {
  return (
    <>
      <Greetings
        title={data.sections.greetings.title}
        subtitle={data.sections.greetings.subtitle}
        button={data.sections.greetings.button}
      />
      <Advantages
        title={data.sections.advantages.title}
        data={data.sections.advantages.data}
      />
      <Team title={data.sections.team.title} data={data.sections.team.data} />
    </>
  );
};
