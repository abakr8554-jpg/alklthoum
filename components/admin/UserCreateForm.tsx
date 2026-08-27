'use client'

import { ActionForm } from '@/components/admin/ActionForm'
import { saveUserAction } from '@/app/admin/actions'

export function UserCreateForm() {
  return (
    <ActionForm action={saveUserAction}>
      <div className="admin-form-grid">
        <div className="admin-field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required />
        </div>
        <div className="admin-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="admin-field">
          <label htmlFor="role">Role</label>
          <select id="role" name="role" defaultValue="editor">
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>
        <div className="admin-field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required minLength={8} />
        </div>
      </div>
      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary">
          Create user
        </button>
      </div>
    </ActionForm>
  )
}
