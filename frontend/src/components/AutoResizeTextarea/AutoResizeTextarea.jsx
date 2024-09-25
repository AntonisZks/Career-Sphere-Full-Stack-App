import React, { useState, useRef, useEffect } from 'react'


export default function AutoResizeTextarea(props) {

  const [content, setContent] = useState('');
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    setContent(event.target.value);
  }

  // Adjust the height of the text area based on its scroll height
  useEffect(() => {

    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

  }, [content]);

  return (
    <textarea 
      className={props.className}
      ref={textareaRef}
      value={content}
      onChange={handleChange}
      rows={3}
      placeholder={props.placeholder}
    />
  )

}
