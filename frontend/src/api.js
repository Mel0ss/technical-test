const API_URL = "http://localhost:3001/products";

export async function getItems() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createItem(item) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  });
  return res.json();
}

export async function updateItem(id, item) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  });
  return res.json();
}

export async function deleteItem(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}