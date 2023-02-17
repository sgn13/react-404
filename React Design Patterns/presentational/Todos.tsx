// logic + presentational code should be seperate.
function Todos({ todos, onAddTodo }) {
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      <button onClick={() => onAddTodo({ id: Date.now(), text: "New Todo" })}>Add Todo</button>
    </>
  );
}
export default Todos;
