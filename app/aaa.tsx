import * as React from "react";
import Container from "./components/Container";
import MainHeading from "./components/Mainheading";
import Instructions from "./components/Instructions";

export default function App() {
  const [task, setTask] = React.useState({
    id: 1,
    title: "Wash the car",
    category: "Home chores",
  });
  const [newTitle, setNewTitle] = React.useState("");
  const [newCategory, setNewCategory] = React.useState("");

  function handleUpdateTask(event) {
    event.preventDefault();

    const nextTask = { ...task };
    nextTask.title = newTitle;
    nextTask.category = newCategory;

    setTask(nextTask);
  }

  return (
    <Container>
      <MainHeading>Update the task</MainHeading>

      <div className="flex flex-col gap-6 my-8 mx-auto p-8 bg-stone-800 max-w-fit rounded">
        <div>
          <h4 className="text-stone-500 text-xs">Title</h4>
          <p className="text-2xl">{task.title}</p>
        </div>
        <div className="text-xs bg-stone-400 font-semibold max-w-fit rounded-full px-2 py-1 text-stone-900">
          {task.category}
        </div>
      </div>

      <form onSubmit={handleUpdateTask} className="mx-8">
        <div className="flex flex-col mb-4">
          <label htmlFor="titleInput" className="text-xs mb-2">
            Title
          </label>
          <input
            id="titleInput"
            type="text"
            className="border border-stone-100 rounded p-4"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="categoryInput" className="text-xs mb-2">
            Category
          </label>
          <input
            id="categoryInput"
            type="text"
            className="border border-stone-100 rounded p-4"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-cyan-700 rounded px-8 py-4 transition cursor-pointer hover:bg-stone-800"
          >
            Submit
          </button>
        </div>
      </form>

      <Instructions />
    </Container>
  );
}
