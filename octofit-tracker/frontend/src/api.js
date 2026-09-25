const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return payload ? [payload] : []
}

export async function fetchEndpoint(endpoint) {
  const response = await fetch(endpoint)
  if (!response.ok) {
    throw new Error(`Unable to load ${endpoint} (${response.status})`)
  }
  return normalizeCollection(await response.json())
}

export function fetchCollection(component) {
  return fetchEndpoint(`${API_BASE_URL}/api/${component}/`)
}