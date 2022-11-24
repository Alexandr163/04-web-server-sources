document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "rename") {
    const oldTitle = event.target.closest("li").children[0].innerHTML;
    const newTitle = prompt("Enter new title for note", oldTitle);
    const id = event.target.dataset.id;

    if (newTitle) {
      rename({ id, title: newTitle }).then(() => {
        event.target.closest("li").children[0].innerHTML = newTitle;
      });
    }
  }
});

async function rename(item) {
  return await fetch("/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(item),
  });
}

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
