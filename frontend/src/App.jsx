import { useEffect, useState } from "react";
import { getItems, createItem, updateItem, deleteItem } from "./api";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [descr, setDescr] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const data = await getItems();
    setItems(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name,
      descr,
      price,
      creationDate: new Date().toISOString()
    };

    if (editId) {
      await updateItem(editId, payload);
      setEditId(null);
    } else {
      await createItem(payload);
    }

    setName("");
    setDescr("");
    setPrice("");
    loadItems();
  }

  function startEdit(item) {
    setEditId(item.id);
    setName(item.name);
    setDescr(item.descr);
    setPrice(item.price);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Productos</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Descripción" value={descr} onChange={e => setDescr(e.target.value)} />
        <input type="number" placeholder="Precio" value={price} onChange={e => setPrice(e.target.value)} />
        <button>{editId ? "Actualizar" : "Crear"}</button>
      </form>

      <hr />

      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong> – ${item.price}
            <br />
            {item.descr}
            <br />
            <small>{item.creationDate}</small>
            <br />
            <button onClick={() => startEdit(item)}>Editar</button>
            <button onClick={() => deleteItem(item.id).then(loadItems)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;