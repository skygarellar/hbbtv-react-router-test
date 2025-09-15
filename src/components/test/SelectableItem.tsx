type SelectableItemProps = {
  id: string;
  value: string;
};

const SelectableItem = ({ id, value }: SelectableItemProps) => {
  return (
    <div
      id={id}
      key={id}
      style={{
        border: "1px solid gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {value}
    </div>
  );
};

export default SelectableItem;
