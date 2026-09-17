import { useEffect, useState } from 'react';
import {
  deleteRow,
  listRows,
  saveOrder,
  saveRow,
} from '../api/content';
import Button from '../components/UIElements/Button/Button';
import s from './Admin.module.scss';
import Field from './Field';
import { confirmDelete, notifyError, notifySaved } from './notify';

// Tags are edited as comma-separated text and stored as arrays.
const toForm = (fields, row) =>
  Object.fromEntries(
    fields.map(({ name, type, defaultValue = '' }) => {
      const value = row?.[name];
      if (type === 'tags') return [name, (value ?? []).join(', ')];
      return [name, value ?? defaultValue];
    }),
  );

const fromForm = (fields, form) =>
  Object.fromEntries(
    fields.map(({ name, type }) => {
      const value = form[name];
      if (type === 'tags') {
        return [
          name,
          value
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean),
        ];
      }
      return [name, value === '' ? null : value];
    }),
  );

const CrudAdmin = ({ table, itemLabel, fields, summarize }) => {
  const [rows, setRows] = useState(null);
  const [editing, setEditing] = useState(null); // { id?, form }
  const [busy, setBusy] = useState(false);

  const load = () =>
    listRows(table).then(setRows).catch(notifyError);

  useEffect(() => {
    load();
  }, [table]);

  const startEdit = (row) =>
    setEditing({ id: row?.id, form: toForm(fields, row) });

  const setValue = (name, value) =>
    setEditing((prev) => ({
      ...prev,
      form: { ...prev.form, [name]: value },
    }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const values = fromForm(fields, editing.form);
      await saveRow(
        table,
        editing.id
          ? { id: editing.id, ...values }
          : { ...values, sort_order: rows.length },
      );
      setEditing(null);
      await load();
      notifySaved();
    } catch (error) {
      notifyError(error);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (row) => {
    if (!(await confirmDelete(summarize(row).title))) return;
    try {
      await deleteRow(table, row.id);
      await load();
    } catch (error) {
      notifyError(error);
    }
  };

  const move = async (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    [next[index], next[target]] = [next[target], next[index]];
    try {
      await saveOrder(table, next);
      setRows(next.map((row, i) => ({ ...row, sort_order: i })));
    } catch (error) {
      notifyError(error);
    }
  };

  if (editing) {
    return (
      <form className={`${s.card} ${s.form}`} onSubmit={submit}>
        <h2 className={s.title}>
          {editing.id ? 'Edit' : 'New'} {itemLabel}
        </h2>
        {fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            value={editing.form[field.name]}
            onChange={(value) => setValue(field.name, value)}
          />
        ))}
        <div className={s.actions}>
          <Button type="submit" className="primary" disabled={busy}>
            {busy ? 'Saving…' : 'Save'}
          </Button>
          <Button onClick={() => setEditing(null)} className="primary">
            Cancel
          </Button>
        </div>
      </form>
    );
  }

  return (
    <>
      <div className={s.header}>
        <span className={s.muted}>
          {rows ? `${rows.length} item(s)` : 'Loading…'}
        </span>
        <Button onClick={() => startEdit(null)} className="primary">
          + Add {itemLabel}
        </Button>
      </div>

      {rows?.map((row, index) => {
        const { title, subtitle, thumb } = summarize(row);
        return (
          <div key={row.id} className={`${s.card} ${s.row}`}>
            {thumb}
            <div className={s.rowMain}>
              <h3>{title}</h3>
              {subtitle && <p className={s.muted}>{subtitle}</p>}
            </div>
            <div className={s.actions}>
              <Button
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="primary"
                label="Move up"
              >
                ↑
              </Button>
              <Button
                onClick={() => move(index, 1)}
                disabled={index === rows.length - 1}
                className="primary"
                label="Move down"
              >
                ↓
              </Button>
              <Button onClick={() => startEdit(row)} className="primary">
                Edit
              </Button>
              <Button
                onClick={() => remove(row)}
                className="primary"
                addClass={s.danger}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CrudAdmin;
