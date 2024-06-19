'use client'

import React, { ChangeEventHandler, useState } from 'react'
import { useRouter } from 'next/navigation';
import { requests } from './requests';

function CreateNoteForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('');
  const router = useRouter()

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const clear = () => {
    setTitle('')
    setContent('')
  }
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await requests.notes({ method:'POST', body: JSON.stringify({title, content}), headers: {'Content-Type': 'application/json'} })
    clear();
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col border border-gray-400 p-2 m-2">
      <label>New note</label>
      <input value={title} onChange={onTitleChange} placeholder='Title'></input>
      <textarea value={content} onChange={onContentChange as ChangeEventHandler} placeholder='Content'></textarea>
      <button type='submit'>
        Save
      </button>
    </form>
  )
}

CreateNoteForm.propTypes = {}

export default CreateNoteForm
