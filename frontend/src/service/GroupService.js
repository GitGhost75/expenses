const API_URL = process.env.REACT_APP_API_URL_GROUPS;

export async function fetch() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function fetch(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export async function delete(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

export async function add(name) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(name)
  });
return response;
}