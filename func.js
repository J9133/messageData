export async function update(url, token, datajson) {
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${token}`
    }
  });
  const data = await response.json();
  const sha = data.sha;
  
  const currentContent = JSON.parse(atob(data.content.replace(/\n/g, '')));
  
  const updatedContent = { ...currentContent, ...datajson };
  const newContentEncoded = btoa(JSON.stringify(updatedContent, null, 2));
  
  const updateResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'new',
      content: newContentEncoded,
      branch: 'main',
      sha: sha
    })
  });
  
  return updateResponse;
}

export function hide(message) {
  try {
    const item = document.createElement('h2');
    const usr = document.getElementById('username')
    item.id = 'message';
    item.textContent = message;
    document.getElementById('chatBox').appendChild(item);
  } catch (error) {
    console.error(error);
  }
}

export async function get(url, token) {
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${token}`
    }
  });

  const data = await response.json();
  if (!response.ok) {
    console.log("GitHub API Error:", data);
    return null;
  }
  return data;
  console.log(data)
}


export async function restart(url, token, datajson) {
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${token}`
    }
  });
  const data = await response.json();
  const sha = data.sha;
  
  const newContentEncoded = btoa(JSON.stringify(datajson, null, 2));
  
  const updateResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'new',
      content: newContentEncoded,
      branch: 'main',
      sha: sha
    })
  });
  
  return updateResponse;
}