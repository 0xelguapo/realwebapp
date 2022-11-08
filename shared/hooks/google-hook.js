export default function useGoogleAuth() {
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  const form = document.createElement('form');
  form.setAttribute('target', '_blank')
  form.setAttribute('method', 'GET')
  form.setAttribute('action', oauth2Endpoint);

  //scope add later : https://mail.google.com/ 
  const params = {
    'client_id': process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    'ux_mode': 'popup',
    'redirect_uri': 'http://localhost:3000/dashboard/clients',
    'response_type': 'token',
    'scope': 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/contacts.readonly',
    'include_granted_scopes': 'true',
    'state': 'pass-through value'
  }

  for(const p in params) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  document.body.appendChild(form);

  const handleGoogleSubmit = () => {
    form.submit()
  }
  
  return [handleGoogleSubmit]
}