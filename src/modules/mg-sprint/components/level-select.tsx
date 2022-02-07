export const LangLevelSelector = ({
  action,
}: {
  action: (value: number) => void;
}) => {
  const buttons = new Array(6).fill(0);
  return (
    <div className="language-selectors">
      <h3 className="language-selectors__header">Выберите уровень языка:</h3>
      {buttons.map((item, index) => {
        return (
          <button
            key={index}
            className="language-selectors__selector"
            onClick={() => action(index)}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};
