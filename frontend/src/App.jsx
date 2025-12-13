import { useEffect, useState } from "react";
import { getItems, createItem, updateItem, deleteItem } from "./api";
import "./App.css";

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
    <div className="container">
      <h1>Productos</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Descripción"
          value={descr}
          onChange={e => setDescr(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <button>{editId ? "Actualizar" : "Crear"}</button>
      </form>

      <div className="list">
        {items.map(item => (
          <div className="card" key={item.id}>
            <div className="card-info">
              <strong>{item.name}</strong>
              <p>{item.descr}</p>
              <p>${item.price}</p>
              <small>{item.creationDate}</small>
            </div>

            <div className="card-actions">
              <button onClick={() => startEdit(item)}>Editar</button>
              <button onClick={() => deleteItem(item.id).then(loadItems)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;