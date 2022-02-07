export const MGSprintEnd = ({
  statistic,
}: {
  statistic: { wrong: Array<GameResult>; right: Array<GameResult> };
}) => {
  return (
    <>
      <h3>
        Вы ошиблись <span>{statistic.wrong.length}</span>
      </h3>
      {statistic.wrong.map((item) => {
        return (
          <p key={item.id}>
            {item.word} - {item.translate}
          </p>
        );
      })}
      <h3>
        Вы знаете <span>{statistic.right.length}</span>
      </h3>
      {statistic.right.map((item) => {
        return (
          <p key={item.id}>
            {item.word} - {item.translate}
          </p>
        );
      })}
    </>
  );
};
