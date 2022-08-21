import React, { useState } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'

const TagsSelect = ({ selTags, setSelTags, suggestions, handleTagSearch }) => {
    const handleDelete = i => {
        setSelTags(selTags.filter((tag, index) => index !== i))
    }

    const handleAddition = tag => {
        const newText = tag.text.replaceAll(' ', '-')
        setSelTags([...selTags, { id: newText, text: newText }])
    }

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = selTags.slice()

        newTags.splice(currPos, 1)
        newTags.splice(newPos, 0, tag)

        // re-render
        setSelTags(newTags)
    }

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked')
    }

    return (
        <ReactTags
            tags={selTags}
            suggestions={suggestions}
            delimiters={[188, 13]}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            handleInputChange={val => handleTagSearch(val)}
            inputFieldPosition="bottom"
            autocomplete
        />
    )
}

export default TagsSelect
