import { useSessionStorage, useLocalStorage } from "./useStorage";

export default function Storage() {
  const [name, setName, removeName] = useSessionStorage<string>(
    "name",
    "Firoj"
  );
  const [age, setAge, removeAge] = useLocalStorage<number>("age", 26);

  return (
    <div>
      <div>
        {name} - {age}
      </div>
      <button onClick={() => setName("Sahu")}>Set Name</button>
      <button onClick={() => setAge(40)}>Set Age</button>
      <button onClick={removeName}>Remove Name</button>
      <button onClick={removeAge}>Remove Age</button>
    </div>
  );
}
