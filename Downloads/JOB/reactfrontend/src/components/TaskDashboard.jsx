import { useEffect, useState } from "react";
import TaskService from "../api/TaskService";
import "./Form.css";
import "./TaskTable.css";

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]); // filtered list
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "",
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await TaskService.getAllTasks();
      const data = res.data || [];
      setTasks(data);
      setFilteredTasks(data); // initialize filtered list
    } catch (err) {
      console.error("Error loading applicants:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🧠 Validation: end date must not be before start date
    if (form.startDate && form.endDate) {
      const start = new Date(form.startDate);
      const end = new Date(form.endDate);
      if (end < start) {
        setError("❌ End date cannot be before start date.");
        return;
      }
    }

    try {
      if (editingTask) {
        await TaskService.updateTask(editingTask.id, form);
        setEditingTask(null);
        setSuccess("✅ Applicant updated successfully!");
      } else {
        await TaskService.createTask(form);
        setSuccess("✅ Applicant added successfully!");
      }

      // Reset form and reload data
      setForm({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        priority: "",
      });
      loadTasks();
    } catch (err) {
      console.error("Error saving task:", err);
      setError("❌ Something went wrong while saving the applicant.");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setForm(task);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      await TaskService.deleteTask(id);
      loadTasks();
      setSuccess("🗑️ Applicant deleted successfully!");
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setForm({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      priority: "",
    });
    setError("");
    setSuccess("");
  };

  // 🔍 Handle Search Filter
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = tasks.filter((task) =>
      Object.values(task)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );

    setFilteredTasks(filtered);
  };

  return (
    <div className="container">
      <h2>{editingTask ? "✏️ Edit Task" : "➕ Add Applicant"}</h2>

      {/* === FORM === */}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="title">Name:</label>
          <input
            id="title"
            name="title"
            placeholder="Enter name"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            name="description"
            placeholder="Enter description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            id="startDate"
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            id="endDate"
            type="date"
            name="endDate"
            value={form.endDate}
            min={form.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Role:</label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            required
          >
            <option value="">--- Select ---</option>
            <option value="EXECUTIVE">Executive</option>
            <option value="MANAGEMENT">Management</option>
            <option value="OPERATIONAL">Operational</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit">
            {editingTask ? "Update Task" : "Add Task"}
          </button>
          {editingTask && (
            <button
              type="button"
              onClick={cancelEdit}
              style={{ backgroundColor: "#6c757d" }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* 🔴/🟢 Feedback Messages */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

      {/* === SEARCH BAR === */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search by any field (id, name, description, role, status)"
          value={search}
          onChange={handleSearchChange}
        />
        <button onClick={() => setSearch("")}>Clear</button>
      </div>

      {/* === TABLE === */}
      <h2 style={{ marginTop: "30px" }}>📋 All Applicants</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Start</th>
            <th>End</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>{t.startDate}</td>
                <td>{t.endDate}</td>
                <td>{t.priority}</td>
                <td>{t.status}</td>
                <td>
                  <button onClick={() => handleEdit(t)}>Edit</button>&nbsp;&nbsp;
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No matching applicants found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
