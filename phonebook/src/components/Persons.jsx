import Button from "./Button";

const Persons = ({ persons, showAll, filteredList, handleDelete }) => {
  return (
    <>
      {showAll
        ? persons.map((person) => (
            <div key={person.id}>
              <p>
                {person.name} {person.number}{" "}
                <Button
                  onClick={() => handleDelete(person)}
                  buttonName="Delete"
                />
              </p>
            </div>
          ))
        : filteredList.map((person) => (
            <div key={person.id}>
              <p>
                {person.name} {person.number}{" "}
                <Button
                  onClick={() => handleDelete(person)}
                  buttonName="Delete"
                />
              </p>
            </div>
          ))}
    </>
  );
};

export default Persons;
