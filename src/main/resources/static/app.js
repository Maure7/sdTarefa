// Auto-detect API base: if opened via file:// fallback to http://localhost:8081
const base = (location.origin.startsWith('http')) ? '' : 'http://localhost:8081';
const api = {
  list: () => fetch(`${base}/carros`).then(r => r.json()),
  create: (data) => fetch(`${base}/carros`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  update: (id, data) => fetch(`${base}/carros/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  remove: (id) => fetch(`${base}/carros/${id}`, { method: 'DELETE' }),
}

function byId(id) { return document.getElementById(id); }

function renderRows(items) {
  const tbody = document.querySelector('#tbl tbody');
  tbody.innerHTML = '';
  for (const e of items) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${e.id ?? ''}</td>
      <td>${e.marca ?? ''}</td>
      <td>${e.modelo ?? ''}</td>
      <td>
        <button data-id="${e.id}" class="btnDel">Deletar</button>
        <button data-id="${e.id}" data-marca="${e.marca}" data-modelo="${e.modelo}" class="btnEdit">Editar</button>
      </td>
    `;
    tbody.appendChild(tr);
  }

  tbody.querySelectorAll('.btnDel').forEach(btn => btn.addEventListener('click', async (ev) => {
    const id = ev.target.getAttribute('data-id');
    if (!confirm(`Delete carro ${id}?`)) return;
    await api.remove(id);
    refresh();
  }));

  tbody.querySelectorAll('.btnEdit').forEach(btn => btn.addEventListener('click', (ev) => {
    const id = ev.target.getAttribute('data-id');
    const marca = ev.target.getAttribute('data-marca');
    const modelo = ev.target.getAttribute('data-modelo');
    const form = document.forms['formUpdate'];
    form.id.value = id;
    form.marca.value = marca;
    form.modelo.value = modelo;
    form.marca.focus();
  }));
}

async function refresh() {
  const baseEl = byId('baseUrl');
  if (baseEl) baseEl.textContent = (base || location.origin);
  try {
    const items = await api.list();
    console.debug('API /carros returned', items);
    renderRows(items);
  } catch (e) {
    console.error('Error fetching list', e);
    const tbody = document.querySelector('#tbl tbody');
    tbody.innerHTML = `<tr><td colspan="4" class="danger">Erro ao carregar lista. Verifique se a API está rodando em ${base || location.origin}.</td></tr>`;
  }
}


const formCreate = document.forms['formCreate'];
formCreate.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const payload = { marca: formCreate.marca.value.trim(), modelo: formCreate.modelo.value.trim() };
  if (!payload.marca || !payload.modelo) return;
  byId('createMsg').textContent = 'Creando...';
  try {
    await api.create(payload);
    formCreate.reset();
    byId('createMsg').textContent = 'Creado ✅';
    refresh();
  } catch (e) {
    byId('createMsg').textContent = 'Error ao criar';
  }
});


const formUpdate = document.forms['formUpdate'];
formUpdate.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const id = formUpdate.id.value.trim();
  const payload = { marca: formUpdate.marca.value.trim(), modelo: formUpdate.modelo.value.trim() };
  if (!id || !payload.marca || !payload.modelo) return;
  byId('updateMsg').textContent = 'Guardando...';
  try {
    await api.update(id, payload);
    byId('updateMsg').textContent = 'Guardado ✅';
    refresh();
  } catch (e) {
    byId('updateMsg').textContent = 'Error ao guardar';
  }
});


const formDelete = document.forms['formDelete'];
formDelete.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const id = formDelete.id.value.trim();
  if (!id) return;
  byId('deleteMsg').textContent = 'Eliminando...';
  try {
    await api.remove(id);
    byId('deleteMsg').textContent = 'Eliminado ✅';
    refresh();
  } catch (e) {
    byId('deleteMsg').textContent = 'Error ao eliminar';
  }
});


byId('btnRefresh').addEventListener('click', refresh);
refresh();
