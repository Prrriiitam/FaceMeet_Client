// For blog issues and replies
// src/utils/api.js

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const api = {
  getIssues: (jwt, skip = 0, limit = 20) =>
    fetch(`${REACT_APP_API_URL}/api/issues?skip=${skip}&limit=${limit}`, {
      headers: jwt ? { Authorization: `Bearer ${jwt}` } : {}
    }).then(r => r.json()),
  getIssue:  id => fetch(`${REACT_APP_API_URL}/api/issues/${id}`).then(r => r.json()),
  postIssue: (jwt, data) =>
    fetch(`${REACT_APP_API_URL}/api/issues`, { method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
      body: JSON.stringify(data)
    }).then(r => r.json()),
  postReply: (jwt, id, data) =>
    fetch(`${REACT_APP_API_URL}/api/issues/${id}/replies`, { method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
      body: JSON.stringify(data)
    }).then(r => r.json()),
};

