const base = '';
const api = {
  list: () => fetch(`${base}/employees`).then(r => r.json()),
  create: (data) => fetch(`${base}/employees`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  update: (id, data) => fetch(`${base}/employees/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  remove: (id) => fetch(`${base}/employees/${id}`, { method: 'DELETE' }),
}

function byId(id) { return document.getElementById(id); }

function renderRows(items) {
  const tbody = document.querySelector('#tbl tbody');
  tbody.innerHTML = '';
  for (const e of items) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${e.id ?? ''}</td>
      <td>${e.name ?? ''}</td>
      <td>${e.role ?? ''}</td>
      <td>
        <button data-id="${e.id}" class="btnDel">Delete</button>
        <button data-id="${e.id}" data-name="${e.name}" data-role="${e.role}" class="btnEdit">Edit</button>
      </td>
    `;
    tbody.appendChild(tr);
  }

  // wire buttons
  tbody.querySelectorAll('.btnDel').forEach(btn => btn.addEventListener('click', async (ev) => {
    const id = ev.target.getAttribute('data-id');
    if (!confirm(`Delete employee ${id}?`)) return;
    await api.remove(id);
    refresh();
  }));

  tbody.querySelectorAll('.btnEdit').forEach(btn => btn.addEventListener('click', (ev) => {
    const id = ev.target.getAttribute('data-id');
    const name = ev.target.getAttribute('data-name');
    const role = ev.target.getAttribute('data-role');
    const form = document.forms['formUpdate'];
    form.id.value = id;
    form.name.value = name;
    form.role.value = role;
    form.name.focus();
  }));
}

async function refresh() {
  byId('baseUrl').textContent = location.origin;
  const items = await api.list();
  renderRows(items);
}

// create
const formCreate = document.forms['formCreate'];
formCreate.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const payload = { name: formCreate.name.value.trim(), role: formCreate.role.value.trim() };
  if (!payload.name || !payload.role) return;
  byId('createMsg').textContent = 'Creating...';
  try {
    await api.create(payload);
    formCreate.reset();
    byId('createMsg').textContent = 'Created ✅';
    refresh();
  } catch (e) {
    byId('createMsg').textContent = 'Error creating';
  }
});

// update
const formUpdate = document.forms['formUpdate'];
formUpdate.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const id = formUpdate.id.value.trim();
  const payload = { name: formUpdate.name.value.trim(), role: formUpdate.role.value.trim() };
  if (!id || !payload.name || !payload.role) return;
  byId('updateMsg').textContent = 'Saving...';
  try {
    await api.update(id, payload);
    byId('updateMsg').textContent = 'Saved ✅';
    refresh();
  } catch (e) {
    byId('updateMsg').textContent = 'Error saving';
  }
});

// delete
const formDelete = document.forms['formDelete'];
formDelete.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const id = formDelete.id.value.trim();
  if (!id) return;
  byId('deleteMsg').textContent = 'Deleting...';
  try {
    await api.remove(id);
    byId('deleteMsg').textContent = 'Deleted ✅';
    refresh();
  } catch (e) {
    byId('deleteMsg').textContent = 'Error deleting';
  }
});

// initial
byId('btnRefresh').addEventListener('click', refresh);
refresh();
