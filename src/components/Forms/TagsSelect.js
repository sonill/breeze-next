import React, { useState } from 'react'
import { render } from 'react-dom'
// import './style.css'
import { WithContext as ReactTags } from 'react-tag-input'

const KeyCodes = {
    comma: 188,
    enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

function TagsSelect({ options }) {
    const [tags, setTags] = useState([
        { id: 'Thailand', text: 'Thailand' },
        { id: 'India', text: 'India' },
        { id: 'Vietnam', text: 'Vietnam' },
        { id: 'Turkey', text: 'Turkey' },
    ])

    const allTags = ['apple', 'google']
    const suggestions = allTags.map(item => ({
        id: item,
        text: item,
    }))

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i))
    }

    const handleAddition = tag => {
        setTags([...tags, tag])
    }

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice()

        newTags.splice(currPos, 1)
        newTags.splice(newPos, 0, tag)

        // re-render
        setTags(newTags)
    }

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked')
    }

    return (
        <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
        />
    )
}

export default TagsSelect
