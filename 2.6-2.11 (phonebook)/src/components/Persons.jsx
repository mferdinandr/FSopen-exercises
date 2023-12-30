export const Persons = ({ personFilter, persons }) => {
  return personFilter.length > 0
    ? personFilter.map((person) => {
        return (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        );
      })
    : persons.map((person) => {
        return (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        );
      });
};
