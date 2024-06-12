import Input from "./Input";

const PersonForm = ({ addPerson, handlers, newContactInfo }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <Input
          title={"name: "}
          value={newContactInfo.newName}
          onChange={handlers.handleNewName}
        />
      </div>
      <div>
        <Input
          title={"number: "}
          value={newContactInfo.newNumber}
          onChange={handlers.handleNewNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
