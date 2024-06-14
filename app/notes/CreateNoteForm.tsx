'use client'

import React, { ChangeEventHandler, useState } from 'react'
import * as api from './api';
import { useRouter } from 'next/navigation';

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

  const onSubmit = async (e) => {
    e.preventDefault();
    await api.createNote({
      title, content
    })

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
